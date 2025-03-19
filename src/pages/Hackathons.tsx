
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Users, Sparkles, LoaderCircle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HACKATHONS = [
  {
    title: "TechCrunch Disrupt Hackathon",
    description: "Build innovative solutions addressing today's biggest tech challenges.",
    date: "June 15-17, 2023",
    location: "San Francisco, CA",
    participants: "1,200+",
    prizes: "$50,000",
    url: "#"
  },
  {
    title: "HackMIT",
    description: "MIT's annual hackathon focused on solving real-world problems with technology.",
    date: "September 18-20, 2023",
    location: "Cambridge, MA",
    participants: "1,000+",
    prizes: "$20,000",
    url: "#"
  },
  {
    title: "Google DevFest",
    description: "A global series of community-led developer events hosted by Google Developer Groups.",
    date: "October 5-7, 2023",
    location: "Multiple Locations",
    participants: "5,000+",
    prizes: "Various",
    url: "#"
  }
];

const Hackathons = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [hackathonIdea, setHackathonIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateIdea = () => {
    if (!apiKey) {
      setShowApiInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your AI API key to generate hackathon ideas.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setHackathonIdea("A sustainability-focused app that uses computer vision to identify recyclable items and provides guidance on proper disposal methods. Incorporate gamification elements to encourage sustainable practices and connect with local recycling centers.");
      toast({
        title: "Idea Generated!",
        description: "We've created a unique hackathon project idea for you.",
      });
    }, 2000);
  };

  const saveApiKey = () => {
    if (!apiKey) {
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
    
    setShowApiInput(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Hackathon Guide</h1>
          <p className="text-foreground/80 max-w-3xl">
            Discover upcoming hackathons, get AI-powered project ideas, and learn strategies to build winning submissions.
          </p>
        </div>

        {/* API Key Input Section */}
        {showApiInput && (
          <Card className="mb-8 border-brand-purple/30">
            <CardHeader>
              <CardTitle>Enter Your AI API Key</CardTitle>
              <CardDescription>
                We use Gemini/OpenAI API to generate hackathon ideas and provide guidance. Your key is stored locally in your browser.
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
        )}

        {/* Hackathon Idea Generator */}
        <Card className="mb-10 glass-card border-none animate-fade-in">
          <CardHeader>
            <CardTitle>Generate Hackathon Project Idea</CardTitle>
            <CardDescription>
              Let our AI generate a unique project idea tailored for hackathons
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hackathonIdea ? (
              <div className="p-4 bg-brand-purple/10 rounded-lg border border-brand-purple/30">
                <h3 className="font-semibold mb-2">Your Project Idea:</h3>
                <p>{hackathonIdea}</p>
              </div>
            ) : (
              <p className="text-foreground/80">
                Click the button below to generate a unique hackathon project idea using AI.
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleGenerateIdea} 
              className="bg-brand-purple hover:bg-brand-purple/90"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Project Idea
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <h2 className="text-2xl font-bold mb-6">Upcoming Hackathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHONS.map((hackathon, index) => (
            <Card key={index} className="glass-card border-none hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle>{hackathon.title}</CardTitle>
                <CardDescription>{hackathon.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-purple" />
                  <span>{hackathon.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-brand-purple" />
                  <span>{hackathon.participants} Participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-brand-purple" />
                  <span>Prizes: {hackathon.prizes}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full group" variant="outline">
                  <span>View Details</span>
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hackathons;
