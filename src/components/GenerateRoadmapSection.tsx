
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const GenerateRoadmapSection = () => {
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState('');
  const [experience, setExperience] = useState('beginner');
  const [showApiForm, setShowApiForm] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('ai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleGenerate = () => {
    if (!career.trim()) {
      toast({
        title: "Please enter a career path",
        description: "Enter the tech career you're interested in to generate a roadmap.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey) {
      setShowApiForm(true);
      toast({
        title: "API Key Required",
        description: "Please enter your AI API key to generate a roadmap.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Roadmap Generated!",
        description: "Your personalized career roadmap is ready to view.",
      });
      navigate('/roadmaps');
    }, 2000);
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key.",
        variant: "destructive"
      });
      return;
    }

    // Store API key in localStorage
    localStorage.setItem('ai_api_key', apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved securely.",
    });
    
    setShowApiForm(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto glass-card rounded-xl p-8 neon-border animate-pulse-glow">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Generate Your Career Roadmap</h2>
            <p className="text-foreground/80">
              Let AI create a personalized career roadmap based on your interests and experience level.
            </p>
          </div>
          
          {showApiForm ? (
            <Card className="mb-6 border-brand-purple/30">
              <CardHeader>
                <CardTitle>Enter Your AI API Key</CardTitle>
                <CardDescription>
                  We use Gemini/OpenAI API to generate personalized roadmaps. Your key is stored locally in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    type="password" 
                    placeholder="Enter your API key" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button onClick={saveApiKey}>Save Key</Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="career">Career Path</Label>
              <Input
                id="career"
                placeholder="e.g. Frontend Developer, Data Scientist, DevOps Engineer"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full h-12 bg-brand-purple hover:bg-brand-purple/90 text-white"
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Roadmap
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerateRoadmapSection;
