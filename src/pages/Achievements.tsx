
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Trophy, Star, Target, Flag, Award, Gift, CheckCircle2, Clock, XCircle, LucideIcon } from 'lucide-react';

// Type definitions
type QuestStatus = 'not-started' | 'in-progress' | 'completed';
type QuestDifficulty = 'easy' | 'medium' | 'hard';

interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
  status: QuestStatus;
  progress: number;
  difficulty: QuestDifficulty;
  icon: LucideIcon;
  requiredActions: number;
  completedActions: number;
}

// Game data
const INITIAL_QUESTS: Quest[] = [
  {
    id: 1,
    title: "Start Your Coding Journey",
    description: "Complete your first roadmap milestone by finishing a beginner tutorial",
    xpReward: 100,
    status: 'not-started',
    progress: 0,
    difficulty: 'easy',
    icon: Target,
    requiredActions: 3,
    completedActions: 0
  },
  {
    id: 2,
    title: "First Project Completed",
    description: "Build and deploy your first web application following a roadmap",
    xpReward: 250,
    status: 'not-started',
    progress: 0,
    difficulty: 'medium',
    icon: Flag,
    requiredActions: 5,
    completedActions: 0
  },
  {
    id: 3,
    title: "Hackathon Explorer",
    description: "Register for your first hackathon using our platform's guidance",
    xpReward: 150,
    status: 'not-started',
    progress: 0,
    difficulty: 'easy',
    icon: Trophy,
    requiredActions: 2,
    completedActions: 0
  },
  {
    id: 4,
    title: "Skill Master",
    description: "Complete five challenges in your chosen skill path",
    xpReward: 300,
    status: 'not-started',
    progress: 0,
    difficulty: 'medium',
    icon: Award,
    requiredActions: 5,
    completedActions: 0
  },
  {
    id: 5,
    title: "Portfolio Builder",
    description: "Create a professional portfolio with three showcased projects",
    xpReward: 400,
    status: 'not-started',
    progress: 0,
    difficulty: 'hard',
    icon: Star,
    requiredActions: 8,
    completedActions: 0
  }
];

// Helper functions
const getDifficultyColor = (difficulty: QuestDifficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500 border-green-500/40 bg-green-500/10';
    case 'medium':
      return 'text-yellow-500 border-yellow-500/40 bg-yellow-500/10';
    case 'hard':
      return 'text-red-500 border-red-500/40 bg-red-500/10';
  }
};

const getStatusColor = (status: QuestStatus) => {
  switch (status) {
    case 'not-started':
      return 'text-gray-400 border-gray-400/40 bg-gray-400/10';
    case 'in-progress':
      return 'text-blue-500 border-blue-500/40 bg-blue-500/10';
    case 'completed':
      return 'text-green-500 border-green-500/40 bg-green-500/10';
  }
};

const getStatusIcon = (status: QuestStatus) => {
  switch (status) {
    case 'not-started':
      return XCircle;
    case 'in-progress':
      return Clock;
    case 'completed':
      return CheckCircle2;
  }
};

const Achievements = () => {
  // State management
  const [quests, setQuests] = useState<Quest[]>(() => {
    // Try to load quests from localStorage, or use initial quests if not available
    const savedQuests = localStorage.getItem('user-quests');
    return savedQuests ? JSON.parse(savedQuests) : INITIAL_QUESTS;
  });
  
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(500);
  
  // Save quests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('user-quests', JSON.stringify(quests));
  }, [quests]);

  // Calculate user level and XP
  useEffect(() => {
    const totalXp = quests.reduce((total, quest) => {
      if (quest.status === 'completed') {
        return total + quest.xpReward;
      }
      return total + Math.floor((quest.progress / 100) * quest.xpReward);
    }, 0);
    
    setUserXp(totalXp);
    setUserLevel(Math.floor(totalXp / 500) + 1);
    setXpToNextLevel(500 - (totalXp % 500));
  }, [quests]);

  // Handle opening quest detail dialog
  const openQuestDialog = (quest: Quest) => {
    setSelectedQuest(quest);
    setDialogOpen(true);
  };

  // Update quest progress
  const updateQuestProgress = (value: number[]) => {
    if (!selectedQuest) return;
    
    const progressValue = value[0];
    const updatedQuests = quests.map(quest => {
      if (quest.id === selectedQuest.id) {
        const completedActions = Math.round((progressValue / 100) * quest.requiredActions);
        
        // Fix: Use typed status instead of plain string
        let status: QuestStatus = 'not-started';
        if (progressValue >= 100) {
          status = 'completed';
        } else if (progressValue > 0) {
          status = 'in-progress';
        }
        
        return {
          ...quest,
          progress: progressValue,
          status,
          completedActions
        };
      }
      return quest;
    });
    
    setQuests(updatedQuests);
    
    // Fix: Use the same typed status for selectedQuest
    let updatedStatus: QuestStatus = 'not-started';
    if (progressValue >= 100) {
      updatedStatus = 'completed';
    } else if (progressValue > 0) {
      updatedStatus = 'in-progress';
    }
    
    setSelectedQuest({
      ...selectedQuest,
      progress: progressValue,
      completedActions: Math.round((progressValue / 100) * selectedQuest.requiredActions),
      status: updatedStatus
    });
  };

  // Complete quest action
  const completeQuest = () => {
    if (!selectedQuest) return;
    
    const updatedQuests = quests.map(quest => {
      if (quest.id === selectedQuest.id) {
        return {
          ...quest,
          progress: 100,
          status: 'completed' as QuestStatus,
          completedActions: quest.requiredActions
        };
      }
      return quest;
    });
    
    setQuests(updatedQuests);
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      
      <main className="flex-grow container px-4 md:px-6 py-12 mt-16">
        <div className="space-y-6">
          {/* Hero section with player stats */}
          <div className="glass-card p-6 rounded-xl mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Your Quest Journey</h1>
                <p className="text-foreground/70">Complete quests to level up and unlock achievements</p>
              </div>
              
              <div className="glass-card p-4 rounded-xl w-full md:w-auto">
                <div className="flex items-center gap-3 mb-1">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div className="text-xl font-semibold">Level {userLevel}</div>
                </div>
                
                <Progress 
                  value={(500 - xpToNextLevel) / 5} 
                  className="h-2.5 w-full md:w-64 mb-1" 
                />
                
                <div className="flex justify-between text-sm text-foreground/70">
                  <span>XP: {userXp}</span>
                  <span>{xpToNextLevel} XP to next level</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quest board */}
          <h2 className="text-2xl font-bold mb-4">Available Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quests.map(quest => {
              const StatusIcon = getStatusIcon(quest.status);
              return (
                <Card 
                  key={quest.id} 
                  className="glass-card border-none hover:shadow-lg transition-all duration-300 hover-glow relative overflow-hidden"
                >
                  {quest.status === 'completed' && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-xs font-medium">
                      COMPLETED
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <quest.icon className="h-6 w-6 text-brand-purple" />
                        <CardTitle className="text-xl">{quest.title}</CardTitle>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge className={`${getDifficultyColor(quest.difficulty)} border`}>
                        {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                      </Badge>
                      
                      <Badge className={`${getStatusColor(quest.status)} border`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        <span>
                          {quest.status === 'not-started' ? 'Not Started' : 
                           quest.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </span>
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{quest.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Progress</span>
                        <span className="font-medium">{quest.progress}%</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          <Gift className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{quest.xpReward} XP</span>
                        </div>
                        
                        <div className="text-xs text-foreground/70">
                          {quest.completedActions}/{quest.requiredActions} actions
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={() => openQuestDialog(quest)} 
                      className="w-full bg-brand-purple hover:bg-brand-purple/90"
                    >
                      {quest.status === 'completed' ? 'View Details' : 'Update Progress'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      {/* Quest detail dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card border-none">
          {selectedQuest && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <selectedQuest.icon className="h-5 w-5 text-brand-purple" />
                  <DialogTitle>{selectedQuest.title}</DialogTitle>
                </div>
                <DialogDescription>{selectedQuest.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Quest Progress</span>
                  <span className="font-medium">{selectedQuest.progress}%</span>
                </div>
                
                <Slider
                  defaultValue={[selectedQuest.progress]}
                  max={100}
                  step={1}
                  onValueChange={updateQuestProgress}
                  disabled={selectedQuest.status === 'completed'}
                />
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span>{selectedQuest.xpReward} XP Reward</span>
                  </div>
                  
                  <div className="text-sm flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-brand-purple"></div>
                    <span>
                      {selectedQuest.completedActions}/{selectedQuest.requiredActions} actions completed
                    </span>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
                
                {selectedQuest.status !== 'completed' && (
                  <Button 
                    onClick={completeQuest} 
                    className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple/90"
                  >
                    Complete Quest
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Achievements;
