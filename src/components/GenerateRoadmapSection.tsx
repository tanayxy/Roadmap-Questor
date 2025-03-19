
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GenerateRoadmapSection = () => {
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState('');
  const [experience, setExperience] = useState('beginner');
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!career.trim()) {
      toast({
        title: "Please enter a career path",
        description: "Enter the tech career you're interested in to generate a roadmap.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Coming Soon!",
        description: "This feature will be available soon! API integration pending.",
      });
    }, 2000);
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
