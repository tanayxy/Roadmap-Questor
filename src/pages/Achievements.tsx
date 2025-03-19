import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Trophy, Star, Target, Flag, Award, Gift, CheckCircle2, Clock, XCircle, LucideIcon, BookOpen, Code, Brain, Rocket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

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

interface LearningProgress {
  category: string;
  icon: LucideIcon;
  topics: {
    name: string;
    progress: number;
    status: 'not-started' | 'in-progress' | 'completed';
  }[];
}

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
  const navigate = useNavigate();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [userXp, setUserXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/progress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }

        const data = await response.json();
        setQuests(data.quests);
        setLearningProgress(data.learningProgress);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [navigate]);

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

  const openQuestDialog = (quest: Quest) => {
    setSelectedQuest(quest);
    setDialogOpen(true);
  };

  const updateQuestProgress = async (value: number[]) => {
    if (!selectedQuest) return;
    
    const progressValue = value[0];
    const completedActions = Math.round((progressValue / 100) * selectedQuest.requiredActions);
    let status: QuestStatus = 'not-started';
    if (progressValue >= 100) {
      status = 'completed';
    } else if (progressValue > 0) {
      status = 'in-progress';
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/progress/quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          questId: selectedQuest.id,
          progress: progressValue,
          completedActions,
          status
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update quest progress');
      }

      const updatedQuests = quests.map(quest => {
        if (quest.id === selectedQuest.id) {
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
      setSelectedQuest({
        ...selectedQuest,
        progress: progressValue,
        completedActions,
        status
      });
    } catch (error) {
      console.error('Error updating quest progress:', error);
    }
  };

  const completeQuest = async () => {
    if (!selectedQuest) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/progress/quest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          questId: selectedQuest.id,
          progress: 100,
          completedActions: selectedQuest.requiredActions,
          status: 'completed'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete quest');
      }

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
    } catch (error) {
      console.error('Error completing quest:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8 border border-[#333]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Your Progress</h1>
              <p className="text-[#888]">Track your learning journey and achievements</p>
            </div>
            
            <div className="bg-[#222] p-4 rounded-xl border border-[#444] w-full md:w-auto">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div className="text-xl font-semibold text-white">Level {userLevel}</div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-[#888]">
                  <span>XP Progress</span>
                  <span>{500 - xpToNextLevel} / 500 XP</span>
                </div>
                <Progress value={((500 - xpToNextLevel) / 500) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="learning" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="learning" className="text-lg py-3">
                <BookOpen className="w-4 h-4 mr-2" />
                Learning Progress
              </TabsTrigger>
              <TabsTrigger value="quests" className="text-lg py-3">
                <Flag className="w-4 h-4 mr-2" />
                Quests & Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learning" className="space-y-6">
              {learningProgress.map((category) => (
                <div key={category.category} className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="w-6 h-6 text-brand-purple" />
                    <h2 className="text-xl font-semibold text-white">{category.category}</h2>
                  </div>
                  <div className="space-y-4">
                    {category.topics.map((topic) => (
                      <div key={topic.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[#ccc]">{topic.name}</span>
                          <Badge className={getStatusColor(topic.status)}>
                            {topic.progress}%
                          </Badge>
                        </div>
                        <Progress value={topic.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="quests" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests.map((quest) => (
                  <div key={quest.id} className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <quest.icon className="h-6 w-6 text-brand-purple" />
                          <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                        </div>
                        <Badge className={getDifficultyColor(quest.difficulty)}>
                          {quest.difficulty}
                        </Badge>
                      </div>
                      <p className="text-[#888] mb-4">{quest.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-[#888]">
                          <span>Progress</span>
                          <span>{quest.completedActions} / {quest.requiredActions} actions</span>
                        </div>
                        <Progress value={quest.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="border-t border-[#333] p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-[#888]">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>{quest.xpReward} XP</span>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => openQuestDialog(quest)}
                        className="gap-2"
                      >
                        <span>Update Progress</span>
                        {React.createElement(getStatusIcon(quest.status), { className: 'h-4 w-4' })}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {selectedQuest && (
            <DialogContent className="bg-[#1a1a1a] border border-[#333]">
              <DialogHeader>
                <DialogTitle className="text-white">{selectedQuest.title}</DialogTitle>
                <DialogDescription className="text-[#888]">{selectedQuest.description}</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-[#888]">
                    <span>Actions Completed</span>
                    <span>{selectedQuest.completedActions} / {selectedQuest.requiredActions}</span>
                  </div>
                  <Slider
                    value={[selectedQuest.progress]}
                    onValueChange={updateQuestProgress}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={completeQuest} 
                  disabled={selectedQuest.progress < 100}
                  className="bg-brand-purple hover:bg-brand-purple/90"
                >
                  Complete Quest
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
