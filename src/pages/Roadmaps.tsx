
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoadmapCard from '@/components/RoadmapCard';

const ROADMAPS = [
  {
    title: "Frontend Web Developer",
    description: "Master HTML, CSS, JavaScript and modern frameworks like React to build exceptional user interfaces.",
    level: "Beginner" as const,
    timeframe: "6-9 months",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    title: "Backend Developer",
    description: "Learn server-side programming, databases, and API development to power web applications.",
    level: "Intermediate" as const,
    timeframe: "6-12 months",
    skills: ["Node.js", "Python", "Databases", "APIs"]
  },
  {
    title: "Full Stack Engineer",
    description: "Combine frontend and backend expertise to build complete web applications from scratch.",
    level: "Advanced" as const,
    timeframe: "12-18 months",
    skills: ["Frontend", "Backend", "DevOps", "Architecture"]
  },
  {
    title: "DevOps Engineer",
    description: "Master CI/CD pipelines, cloud infrastructure, and automation to streamline development workflows.",
    level: "Intermediate" as const,
    timeframe: "8-12 months",
    skills: ["Docker", "Kubernetes", "CI/CD", "Cloud"]
  },
  {
    title: "Mobile Developer",
    description: "Learn to build native and cross-platform mobile applications for iOS and Android.",
    level: "Intermediate" as const,
    timeframe: "6-12 months",
    skills: ["React Native", "Swift", "Kotlin", "Flutter"]
  },
  {
    title: "Data Scientist",
    description: "Master data analysis, machine learning, and AI techniques to extract insights from complex datasets.",
    level: "Advanced" as const,
    timeframe: "12-18 months",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"]
  }
];

const Roadmaps = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Career Roadmaps</h1>
          <p className="text-foreground/80 max-w-3xl">
            Explore our collection of AI-powered career roadmaps designed to help you navigate your tech career journey. Select a roadmap to see detailed steps, milestones, and resources.
          </p>
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
      </main>
      <Footer />
    </div>
  );
};

export default Roadmaps;
