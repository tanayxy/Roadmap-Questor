
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Trophy, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const CHALLENGES = [
  {
    title: "JavaScript Fundamentals",
    description: "Master JavaScript basics including variables, functions, objects, and arrays.",
    level: "Beginner",
    estimatedTime: "3 hours",
    completionRate: 0,
    xpReward: 100,
    tags: ["JavaScript", "Fundamentals", "Web Development"]
  },
  {
    title: "React Components Challenge",
    description: "Build five common UI components in React with proper state management.",
    level: "Intermediate",
    estimatedTime: "5 hours",
    completionRate: 0,
    xpReward: 250,
    tags: ["React", "Components", "Frontend"]
  },
  {
    title: "API Integration Marathon",
    description: "Connect your application to three different external APIs and display data.",
    level: "Intermediate",
    estimatedTime: "8 hours",
    completionRate: 0,
    xpReward: 350,
    tags: ["API", "Integration", "Backend"]
  },
  {
    title: "Algorithmic Problem Solving",
    description: "Solve a series of algorithm challenges focusing on efficiency and readability.",
    level: "Advanced",
    estimatedTime: "6 hours",
    completionRate: 0,
    xpReward: 400,
    tags: ["Algorithms", "Problem Solving", "Computer Science"]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-500 border-green-500/40';
    case 'Intermediate':
      return 'bg-blue-500/20 text-blue-500 border-blue-500/40';
    case 'Advanced':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/40';
    default:
      return 'bg-gray-500/20 text-gray-500 border-gray-500/40';
  }
};

const Challenges = () => {
  const [userXp, setUserXp] = useState(0);

  const startChallenge = (xp: number) => {
    setUserXp(prev => prev + xp);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container px-4 md:px-6 pt-24 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Skill Challenges</h1>
          <p className="text-foreground/80 max-w-3xl mb-6">
            Put your skills to the test with our collection of coding challenges. Complete challenges to earn XP and track your progress.
          </p>
          
          <div className="glass-card p-4 rounded-xl mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Your Progress</span>
              </div>
              <Badge variant="outline" className="bg-brand-purple/20 border-brand-purple/40">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>Level {Math.floor(userXp / 500) + 1}</span>
              </Badge>
            </div>
            <Progress value={(userXp % 500) / 5} className="h-2 mb-2" />
            <div className="text-sm text-foreground/70 flex justify-between">
              <span>XP: {userXp}</span>
              <span>{(userXp % 500)} / 500 to next level</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHALLENGES.map((challenge, index) => (
            <Card key={index} className="glass-card border-none hover-glow transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{challenge.title}</CardTitle>
                  <Badge className={`${getLevelColor(challenge.level)} border`}>
                    {challenge.level}
                  </Badge>
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm text-foreground/70">{challenge.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{challenge.xpReward} XP</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {challenge.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => startChallenge(challenge.xpReward)} 
                  className="w-full bg-brand-purple hover:bg-brand-purple/90 group"
                >
                  <Code className="mr-2 h-4 w-4" />
                  <span>Start Challenge</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Challenges;
