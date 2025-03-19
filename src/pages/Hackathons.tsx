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
  const [hackathonIdea, setHackathonIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('');
  const { toast } = useToast();

  const handleGenerateIdea = async () => {
    if (!theme.trim()) {
      toast({
        title: "Theme Required",
        description: "Please enter a theme or topic for your hackathon project.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Replace with your actual backend endpoint
      const response = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme })
      });

      if (!response.ok) {
        throw new Error('Failed to generate idea');
      }

      const data = await response.json();
      setHackathonIdea(data.idea);
      
      toast({
        title: "Idea Generated!",
        description: "We've created a unique hackathon project idea for you.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate project idea. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

        {/* Hackathon Idea Generator */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Generate Hackathon Project Idea</CardTitle>
            <CardDescription>
              Let our AI generate a unique project idea tailored for hackathons based on your interests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="theme" className="text-sm font-medium">Project Theme or Topic</label>
              <Input
                id="theme"
                placeholder="e.g., sustainability, healthcare, education, AI, blockchain"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Enter a theme or topic you're interested in exploring for your hackathon project
              </p>
            </div>

            {hackathonIdea && (
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Your Generated Project Idea:</h3>
                <div className="p-4 bg-brand-purple/10 rounded-lg border border-brand-purple/30">
                  <p className="whitespace-pre-wrap">{hackathonIdea}</p>
                </div>
              </div>
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
