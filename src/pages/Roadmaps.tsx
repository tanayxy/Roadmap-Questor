import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoadmapCard from '@/components/RoadmapCard';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        {/* Custom Roadmap Banner */}
        <div className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-2xl" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative glass-card p-8 rounded-2xl border-2 border-brand-purple/20 hover:border-brand-purple/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4299E1] to-[#9F7AEA] bg-clip-text text-transparent">
                Create Your Own Learning Path
              </h2>
              <Sparkles className="w-6 h-6 text-brand-purple animate-pulse" />
            </div>
            <p className="text-[#888] max-w-3xl mb-6">
              Design a personalized roadmap tailored to your goals. Choose from a variety of technologies and skills to create your unique learning journey.
            </p>
            <Button
              className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 text-white px-8"
              onClick={() => navigate('/roadmaps/custom')}
            >
              Build Custom Roadmap
            </Button>
          </div>
        </div>

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
