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

const BACKEND_ROADMAP: RoadmapNode[] = [
  {
    id: 'internet',
    title: 'Internet',
    topics: [
      { id: 'http', title: 'How does the internet work?' },
      { id: 'browsers', title: 'What is HTTP/HTTPS?' },
      { id: 'dns', title: 'DNS and how it works?' },
      { id: 'hosting', title: 'What is Domain Name?' },
      { id: 'hosting-types', title: 'What is hosting?' }
    ]
  },
  {
    id: 'basic-frontend',
    title: 'Basic Frontend Knowledge',
    topics: [
      { id: 'html', title: 'HTML Fundamentals' },
      { id: 'css', title: 'CSS Fundamentals' },
      { id: 'javascript', title: 'JavaScript Basics' }
    ]
  },
  {
    id: 'os',
    title: 'Operating System',
    topics: [
      { id: 'terminal', title: 'Terminal Usage' },
      { id: 'os-operation', title: 'How OS works' },
      { id: 'process-management', title: 'Process Management' },
      { id: 'threads', title: 'Threads and Concurrency' },
      { id: 'memory-management', title: 'Memory Management' }
    ]
  },
  {
    id: 'programming-language',
    title: 'Programming Language',
    children: [
      {
        id: 'languages',
        title: 'Pick a Language',
        topics: [
          { id: 'python', title: 'Python' },
          { id: 'javascript', title: 'JavaScript' },
          { id: 'java', title: 'Java' },
          { id: 'csharp', title: 'C#' },
          { id: 'php', title: 'PHP' }
        ]
      }
    ]
  },
  {
    id: 'version-control',
    title: 'Version Control',
    topics: [
      { id: 'git-basics', title: 'Basic Git Usage' },
      { id: 'repo-hosting', title: 'Repo Hosting Services' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    children: [
      {
        id: 'relational',
        title: 'Relational Databases',
        topics: [
          { id: 'postgresql', title: 'PostgreSQL' },
          { id: 'mysql', title: 'MySQL' },
          { id: 'mariadb', title: 'MariaDB' },
          { id: 'mssql', title: 'MS SQL' }
        ]
      },
      {
        id: 'nosql',
        title: 'NoSQL Databases',
        topics: [
          { id: 'mongodb', title: 'MongoDB' },
          { id: 'redis', title: 'Redis' },
          { id: 'cassandra', title: 'Cassandra' },
          { id: 'elasticsearch', title: 'Elasticsearch' }
        ]
      }
    ]
  },
  {
    id: 'apis',
    title: 'APIs',
    topics: [
      { id: 'rest', title: 'REST' },
      { id: 'json', title: 'JSON APIs' },
      { id: 'soap', title: 'SOAP' },
      { id: 'grpc', title: 'gRPC' },
      { id: 'graphql', title: 'GraphQL' }
    ]
  },
  {
    id: 'caching',
    title: 'Caching',
    topics: [
      { id: 'cdn', title: 'CDN' },
      { id: 'server-side', title: 'Server Side' },
      { id: 'client-side', title: 'Client Side' },
      { id: 'redis-cache', title: 'Redis' }
    ]
  },
  {
    id: 'security',
    title: 'Web Security',
    topics: [
      { id: 'https', title: 'HTTPS' },
      { id: 'cors', title: 'CORS' },
      { id: 'content-security', title: 'Content Security Policy' },
      { id: 'ssl-tls', title: 'SSL/TLS' },
      { id: 'owasp', title: 'OWASP Security Risks' }
    ]
  }
];

const BackendRoadmap = () => {
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
    const totalTopics = BACKEND_ROADMAP.reduce((acc, node) => {
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
                Backend Developer Roadmap
              </h1>
              <p className="text-[#888]">Track your progress and master backend development</p>
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
              {BACKEND_ROADMAP.map((node) => (
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

export default BackendRoadmap; 