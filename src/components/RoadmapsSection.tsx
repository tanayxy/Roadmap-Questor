
import React from 'react';
import { Button } from '@/components/ui/button';
import RoadmapCard from './RoadmapCard';

const ROADMAPS = [
  {
    title: "Frontend Web Developer",
    description: "Master HTML, CSS, JavaScript and modern frameworks like React to build exceptional user interfaces.",
    level: "Beginner",
    timeframe: "6-9 months",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    title: "Backend Developer",
    description: "Learn server-side programming, databases, and API development to power web applications.",
    level: "Intermediate",
    timeframe: "6-12 months",
    skills: ["Node.js", "Python", "Databases", "APIs"]
  },
  {
    title: "Full Stack Engineer",
    description: "Combine frontend and backend expertise to build complete web applications from scratch.",
    level: "Advanced",
    timeframe: "12-18 months",
    skills: ["Frontend", "Backend", "DevOps", "Architecture"]
  }
] as const;

const RoadmapsSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Popular Career Roadmaps</h2>
            <p className="text-foreground/80 max-w-2xl">
              Explore curated learning paths designed to take you from beginner to professional.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-brand-purple/50 hover:bg-brand-purple/10">
            View All Roadmaps
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROADMAPS.map((roadmap, index) => (
            <RoadmapCard
              key={index}
              title={roadmap.title}
              description={roadmap.description}
              level={roadmap.level}
              timeframe={roadmap.timeframe}
              skills={roadmap.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapsSection;
