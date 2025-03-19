import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Trophy, Star, Target, Flag, Award, Gift, CheckCircle2, Clock, XCircle, LucideIcon, BookOpen, Code, Brain, Rocket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
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

// Initial Data
const INITIAL_QUESTS: Quest[] = [
  {
    id: 1,
    title: "Start Your Coding Journey",
    description: "Complete your first roadmap milestone",
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
    description: "Build and deploy your first web application",
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
    title: "Skill Master",
    description: "Complete five challenges in your chosen path",
    xpReward: 300,
    status: 'not-started',
    progress: 0,
    difficulty: 'medium',
    icon: Award,
    requiredActions: 5,
    completedActions: 0
  }
];

const LEARNING_PATHS = [
  {
    category: 'Frontend Development',
    icon: Code,
    topics: [
      { name: 'HTML & CSS', progress: 80, status: 'in-progress' as QuestStatus },
      { name: 'JavaScript', progress: 60, status: 'in-progress' as QuestStatus },
      { name: 'React', progress: 40, status: 'in-progress' as QuestStatus }
    ]
  },
  {
    category: 'Backend Development',
    icon: Brain,
    topics: [
      { name: 'Python', progress: 70, status: 'in-progress' as QuestStatus },
      { name: 'Node.js', progress: 50, status: 'in-progress' as QuestStatus },
      { name: 'Databases', progress: 30, status: 'in-progress' as QuestStatus }
    ]
  }
];

const Achievements = () => {
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(500);

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

  const updateQuestProgress = (value: number[]) => {
    if (!selectedQuest) return;
    
    const progressValue = value[0];
    const updatedQuests = quests.map(quest => {
      if (quest.id === selectedQuest.id) {
        const completedActions = Math.round((progressValue / 100) * quest.requiredActions);
        const status: QuestStatus = progressValue >= 100 ? 'completed' : progressValue > 0 ? 'in-progress' : 'not-started';
        return { ...quest, progress: progressValue, status, completedActions };
      }
      return quest;
    });
    
    setQuests(updatedQuests);
    setSelectedQuest({
      ...selectedQuest,
      progress: progressValue,
      completedActions: Math.round((progressValue / 100) * selectedQuest.requiredActions),
      status: progressValue >= 100 ? 'completed' : progressValue > 0 ? 'in-progress' : 'not-started'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      
      <main className="flex-grow container px-4 md:px-6 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div className="text-xl font-semibold">Level {userLevel}</div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>XP Progress</span>
                <span>{500 - xpToNextLevel} / 500 XP</span>
              </div>
              <Progress value={((500 - xpToNextLevel) / 500) * 100} className="h-2" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="learning">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Progress
            </TabsTrigger>
            <TabsTrigger value="quests">
              <Flag className="w-4 h-4 mr-2" />
              Quests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning" className="space-y-6">
            {LEARNING_PATHS.map((path) => (
              <Card key={path.category} className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <path.icon className="w-6 h-6 text-brand-purple" />
                    <CardTitle>{path.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {path.topics.map((topic) => (
                    <div key={topic.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>{topic.name}</span>
                        <Badge variant="outline">{topic.progress}%</Badge>
                      </div>
                      <Progress value={topic.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="quests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quests.map((quest) => (
                <Card key={quest.id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <quest.icon className="w-6 h-6 text-brand-purple" />
                      <CardTitle>{quest.title}</CardTitle>
                    </div>
                    <CardDescription>{quest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{quest.completedActions} / {quest.requiredActions}</span>
                      </div>
                      <Progress value={quest.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{quest.xpReward} XP</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedQuest(quest);
                        setDialogOpen(true);
                      }}
                    >
                      Update Progress
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {selectedQuest && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedQuest.title}</DialogTitle>
                <DialogDescription>{selectedQuest.description}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Actions Completed</span>
                    <span>{selectedQuest.completedActions} / {selectedQuest.requiredActions}</span>
                  </div>
                  <Slider
                    value={[selectedQuest.progress]}
                    onValueChange={updateQuestProgress}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Achievements;
