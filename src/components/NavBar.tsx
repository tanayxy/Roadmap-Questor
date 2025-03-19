
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Cpu, Award, User } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
            <Cpu className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">DevPathAI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/roadmap" className="text-foreground/80 hover:text-foreground transition">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>Career Roadmap</span>
            </div>
          </Link>
          <Link to="/hackathons" className="text-foreground/80 hover:text-foreground transition">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>Hackathons</span>
            </div>
          </Link>
          <Link to="/challenges" className="text-foreground/80 hover:text-foreground transition">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>Challenges</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/90 text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
