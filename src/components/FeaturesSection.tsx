
import React from 'react';
import FeatureCard from './FeatureCard';
import { BookOpen, Award, MessageSquare, Code, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/95">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Supercharge Your Tech Career</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Our AI-powered platform provides tailored guidance to help you build the skills,
            experience, and connections you need to thrive in tech.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            title="AI Career Roadmaps" 
            description="Get a personalized career roadmap based on your interests, skills, and goals, updated dynamically as you progress."
            icon={BookOpen}
            linkTo="/roadmaps"
          />
          <FeatureCard 
            title="Hackathon Guide" 
            description="Find the perfect hackathon for your skills and get AI-powered guidance to help you build winning projects."
            icon={Award}
            linkTo="/hackathons"
          />
          <FeatureCard 
            title="AI Coach" 
            description="Get personalized feedback and advice from an AI coach that understands your strengths and growth areas."
            icon={MessageSquare}
            linkTo="/coach"
          />
          <FeatureCard 
            title="Skill Challenges" 
            description="Practice with real-world coding challenges and projects designed to build the skills employers want."
            icon={Code}
            linkTo="/challenges"
          />
          <FeatureCard 
            title="Progress Tracking" 
            description="Track your progress with metrics and insights that show your growth over time and suggest next steps."
            icon={TrendingUp}
            linkTo="/progress"
          />
          <FeatureCard 
            title="Achievement System" 
            description="Earn badges, level up, and track your progress as you complete challenges and build your portfolio."
            icon={Award}
            linkTo="/achievements"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
