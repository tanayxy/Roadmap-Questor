import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block rounded-full px-3 py-1 text-sm bg-brand-purple/20 text-brand-purple mb-4 animate-fade-in">
            Career Guidance Powered by AI
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-fade-in">
            Navigate Your <span className="text-gradient">Tech Career</span> With Confidence
          </h1>
          
          <p className="max-w-[700px] text-foreground/80 md:text-xl animate-fade-in">
            Personalized career roadmaps, hackathon mentoring, and skill-building challenges 
            to accelerate your journey in tech.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in">
            <Link to="/journey">
              <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white h-12 px-8 rounded-lg group">
                <span>Start Your Journey</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/roadmaps">
              <Button variant="outline" className="border-brand-purple/50 text-foreground h-12 px-8 rounded-lg hover:bg-brand-purple/10">
                Explore Career Paths
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
