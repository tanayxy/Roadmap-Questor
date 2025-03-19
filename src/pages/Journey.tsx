import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Code, Brain, Rocket, Lock, CheckCircle2, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const Journey = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  
  const journeyGrid = [
    {
      id: 1,
      title: "HTML Basics",
      icon: Code,
      status: "completed",
      xp: 100,
      description: "Master the fundamentals of HTML"
    },
    {
      id: 2,
      title: "CSS Styling",
      icon: Code,
      status: "completed",
      xp: 150,
      description: "Learn CSS and responsive design"
    },
    {
      id: 3,
      title: "JavaScript",
      icon: Code,
      status: "in-progress",
      xp: 200,
      description: "JavaScript programming basics"
    },
    {
      id: 4,
      title: "React Basics",
      icon: Brain,
      status: "locked",
      xp: 250,
      description: "Introduction to React",
      requires: 3
    },
    {
      id: 5,
      title: "Master Challenge",
      icon: Trophy,
      status: "locked",
      xp: 500,
      description: "Complete a full project",
      requires: 4
    },
    {
      id: 6,
      title: "Advanced React",
      icon: Brain,
      status: "locked",
      xp: 300,
      description: "Advanced React concepts",
      requires: 4
    },
    {
      id: 7,
      title: "Backend Basics",
      icon: Rocket,
      status: "locked",
      xp: 200,
      description: "Introduction to backend",
      requires: 3
    },
    {
      id: 8,
      title: "Database",
      icon: Brain,
      status: "locked",
      xp: 250,
      description: "Database fundamentals",
      requires: 7
    },
    {
      id: 9,
      title: "Full Stack",
      icon: Trophy,
      status: "locked",
      xp: 500,
      description: "Full stack development",
      requires: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20';
      case 'in-progress':
        return 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20';
      default:
        return 'border-gray-500/50 bg-gray-500/10 opacity-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-gray-500" />;
      default:
        return null;
    }
  };

  const totalXP = journeyGrid.reduce((acc, cell) => {
    if (cell.status === 'completed') {
      return acc + cell.xp;
    }
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container px-4 py-8 mt-16">
        {/* Level Progress */}
        <div className="mb-8">
          <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/20 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">Level {currentLevel}</h1>
                <p className="text-muted-foreground">Tech Explorer</p>
              </div>
              <Badge variant="outline" className="text-xl">
                {totalXP} XP
              </Badge>
            </div>
            <Progress value={(totalXP / 2000) * 100} className="h-2" />
          </div>
        </div>

        {/* Journey Grid */}
        <div className="grid grid-cols-3 gap-4">
          {journeyGrid.map((cell) => (
            <Card 
              key={cell.id}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]",
                "border glass-card",
                getStatusColor(cell.status)
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <cell.icon className="w-8 h-8 text-brand-purple" />
                {getStatusIcon(cell.status)}
              </div>
              <h3 className="font-semibold mb-2">{cell.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cell.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{cell.xp} XP</Badge>
                {cell.requires && (
                  <span className="text-xs text-muted-foreground">
                    Requires #{cell.requires}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Unlocked Animation */}
        <div className="fixed bottom-4 right-4 space-y-2">
          {/* Add achievement notifications here */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Journey; 