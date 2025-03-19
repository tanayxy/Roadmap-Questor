import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  isCompleted?: boolean;
}

interface RoadmapNode {
  id: string;
  title: string;
  topics?: Topic[];
  children?: RoadmapNode[];
}

const FRONTEND_ROADMAP: RoadmapNode[] = [
  {
    id: 'internet',
    title: 'Internet',
    topics: [
      { id: 'http', title: 'What is HTTP?' },
      { id: 'domain', title: 'What is Domain Name?' },
      { id: 'hosting', title: 'What is hosting?' },
      { id: 'dns', title: 'DNS and how it works?' },
      { id: 'browsers', title: 'Browsers and how they work?' }
    ]
  },
  {
    id: 'html',
    title: 'HTML',
    topics: [
      { id: 'html-basics', title: 'Learn the basics' },
      { id: 'semantic-html', title: 'Writing Semantic HTML' },
      { id: 'forms-validation', title: 'Forms and Validations' },
      { id: 'accessibility', title: 'Accessibility' },
      { id: 'seo', title: 'SEO Basics' }
    ]
  },
  {
    id: 'css',
    title: 'CSS',
    topics: [
      { id: 'css-basics', title: 'Learn the basics' },
      { id: 'layouts', title: 'Making Layouts' },
      { id: 'responsive', title: 'Responsive Design' }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    topics: [
      { id: 'js-basics', title: 'Learn the Basics' },
      { id: 'dom', title: 'Learn DOM Manipulation' }
    ]
  },
  {
    id: 'version-control',
    title: 'Version Control Systems',
    children: [
      {
        id: 'vcs-hosting',
        title: 'VCS Hosting',
        topics: [
          { id: 'github', title: 'GitHub' },
          { id: 'gitlab', title: 'GitLab' },
          { id: 'bitbucket', title: 'Bitbucket' }
        ]
      }
    ]
  }
];

const FrontendRoadmap = () => {
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (topicId: string) => {
    setCompletedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const getProgress = () => {
    const totalTopics = FRONTEND_ROADMAP.reduce((acc, node) => {
      const topicsCount = node.topics?.length || 0;
      const childrenTopicsCount = node.children?.reduce(
        (sum, child) => sum + (child.topics?.length || 0),
        0
      ) || 0;
      return acc + topicsCount + childrenTopicsCount;
    }, 0);
    
    const completedCount = Object.values(completedTopics).filter(Boolean).length;
    return Math.round((completedCount / totalTopics) * 100);
  };

  const renderTopic = (topic: Topic) => (
    <div
      key={topic.id}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all
        bg-[#1a1a1a] border border-[#333] hover:border-brand-purple/50
        ${hoveredTopic === topic.id ? 'scale-105' : ''}
        ${completedTopics[topic.id] ? 'border-brand-purple/50' : ''}`}
      onClick={() => toggleTopic(topic.id)}
      onMouseEnter={() => setHoveredTopic(topic.id)}
      onMouseLeave={() => setHoveredTopic(null)}
    >
      <div className={`w-5 h-5 rounded-full flex items-center justify-center
        ${completedTopics[topic.id]
          ? 'bg-brand-purple text-white'
          : 'border-2 border-[#444]'
        }`}
      >
        {completedTopics[topic.id] && <CheckCircle2 className="w-4 h-4" />}
      </div>
      <span className={`text-sm font-medium ${completedTopics[topic.id] ? 'text-brand-purple' : 'text-[#888]'}`}>
        {topic.title}
      </span>
    </div>
  );

  const renderMainNode = (node: RoadmapNode) => (
    <div className="relative">
      {/* Main node title */}
      <div className="bg-[#1a1a1a] px-6 py-3 rounded-lg border border-[#333] inline-block">
        <h2 className="text-lg font-bold text-[#4299E1]">{node.title}</h2>
      </div>

      {/* Topics list with connecting lines */}
      {(node.topics || node.children) && (
        <div className="mt-4 ml-8 relative">
          {/* Vertical line from title to topics */}
          <div className="absolute left-0 top-0 w-px h-full bg-[#333]" />

          <div className="space-y-3">
            {node.topics?.map((topic, index) => (
              <div key={topic.id} className="relative flex items-center">
                {/* Horizontal line to topic */}
                <div className="absolute left-0 top-1/2 w-6 h-px bg-[#333] -translate-x-6" />
                {renderTopic(topic)}
              </div>
            ))}
            
            {node.children?.map((child) => (
              <div key={child.id} className="relative mt-6">
                <div className="text-sm font-semibold text-[#666] mb-2 relative flex items-center">
                  {/* Horizontal line to child title */}
                  <div className="absolute left-0 top-1/2 w-6 h-px bg-[#333] -translate-x-6" />
                  {child.title}
                </div>
                <div className="ml-4 space-y-3">
                  {child.topics?.map((topic) => (
                    <div key={topic.id} className="relative flex items-center">
                      {/* Horizontal line to child topic */}
                      <div className="absolute left-0 top-1/2 w-6 h-px bg-[#333] -translate-x-6" />
                      {renderTopic(topic)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4299E1] to-[#9F7AEA] bg-clip-text text-transparent mb-2">
                Frontend Developer Roadmap
              </h1>
              <p className="text-[#888]">Track your progress and master frontend development</p>
            </div>
            
            <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/roadmaps')}
                className="text-[#888] hover:text-white"
              >
                Back to Roadmaps
              </Button>
              <div className="text-right">
                <p className="text-sm text-[#888]">Overall Progress</p>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-[#333]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-brand-purple transition-all duration-300"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="url(#gradient)"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${2.64 * getProgress()} 264`}
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4299E1" />
                        <stop offset="100%" stopColor="#9F7AEA" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{getProgress()}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-brand-blue/5 pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-16">
              {FRONTEND_ROADMAP.map((node) => (
                <div key={node.id} className="relative">
                  {renderMainNode(node)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FrontendRoadmap; 