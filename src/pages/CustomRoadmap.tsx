import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X, ArrowRight, Sparkles } from 'lucide-react';

const TECHNOLOGIES = {
  'Programming Languages': [
    'JavaScript', 'Python', 'Java', 'C#', 'TypeScript', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin'
  ],
  'Frontend': [
    'React', 'Vue', 'Angular', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Material UI', 'Redux', 'GraphQL'
  ],
  'Backend': [
    'Node.js', 'Django', 'Spring Boot', 'Express.js', 'FastAPI', 'Laravel', 'PostgreSQL', 'MongoDB', 'Redis', 'REST APIs'
  ],
  'DevOps & Cloud': [
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Linux', 'Nginx', 'Jenkins', 'Terraform'
  ],
  'Mobile': [
    'React Native', 'Flutter', 'iOS', 'Android', 'Xamarin', 'SwiftUI', 'Kotlin Multiplatform', 'Ionic'
  ],
  'Data & AI': [
    'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'SQL', 'Big Data', 'Data Visualization', 'NLP'
  ]
};

const CustomRoadmap = () => {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTechToggle = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const filteredTechnologies = searchQuery
    ? Object.entries(TECHNOLOGIES).reduce((acc, [category, techs]) => {
        const filtered = techs.filter(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        return acc;
      }, {} as typeof TECHNOLOGIES)
    : TECHNOLOGIES;

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/roadmaps')}
            className="text-[#888] hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Roadmaps
          </Button>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4299E1] to-[#9F7AEA] bg-clip-text text-transparent">
                Select Your Technologies
              </h1>
              <Sparkles className="w-8 h-8 text-brand-purple" />
            </div>
            <p className="text-[#888] max-w-2xl mx-auto">
              Choose the technologies you want to learn. We'll create a personalized roadmap with resources and milestones to help you master them.
            </p>
          </div>

          <div className="mb-8">
            <Input
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1a1a1a] border-[#333] focus:border-brand-purple/50"
            />
          </div>

          <div className="glass-card p-6 rounded-xl mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Selected Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {selectedTech.length === 0 ? (
                  <p className="text-[#666] text-sm">Choose technologies to create your roadmap</p>
                ) : (
                  selectedTech.map(tech => (
                    <Badge
                      key={tech}
                      className="bg-brand-purple/20 text-brand-purple flex items-center gap-1 px-3 py-1"
                    >
                      {tech}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-white"
                        onClick={() => handleTechToggle(tech)}
                      />
                    </Badge>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(filteredTechnologies).map(([category, technologies]) => (
              <div key={category} className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {technologies.map(tech => (
                    <div
                      key={tech}
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all
                        ${selectedTech.includes(tech)
                          ? 'bg-brand-purple/20 border border-brand-purple/50'
                          : 'bg-[#1a1a1a] border border-[#333] hover:border-brand-purple/30'
                        }`}
                      onClick={() => handleTechToggle(tech)}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${selectedTech.includes(tech)
                          ? 'border-brand-purple bg-brand-purple/20'
                          : 'border-[#444]'
                        }`}
                      >
                        {selectedTech.includes(tech) && (
                          <div className="w-2 h-2 rounded-full bg-brand-purple" />
                        )}
                      </div>
                      <span className={selectedTech.includes(tech) ? 'text-brand-purple' : 'text-[#888]'}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 px-8"
              onClick={() => navigate('/roadmaps/custom/preview')}
              disabled={selectedTech.length === 0}
            >
              <span>Generate Roadmap</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomRoadmap; 