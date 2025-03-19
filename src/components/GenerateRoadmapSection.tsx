import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const GenerateRoadmapSection = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    
    try {
      console.log('Sending request to generate roadmap...');
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Empty object as we don't need any data for now
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.roadmap) {
        throw new Error('No roadmap data received');
      }
      
      // Store the roadmap data in localStorage
      localStorage.setItem('generated_roadmap', data.roadmap);
      
      toast({
        title: "Roadmap Generated!",
        description: "Your personalized career roadmap is ready to view.",
      });
      
      navigate('/roadmaps');
    } catch (error) {
      console.error('Error in handleGenerate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate roadmap. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto glass-card rounded-xl p-8 neon-border animate-pulse-glow">
          <div className="text-center">
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="h-12 bg-brand-purple hover:bg-brand-purple/90 text-white"
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
