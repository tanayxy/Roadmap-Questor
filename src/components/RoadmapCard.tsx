
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface RoadmapCardProps {
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  timeframe: string;
  skills: string[];
  className?: string;
}

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

const RoadmapCard = ({ title, description, level, timeframe, skills, className }: RoadmapCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewRoadmap = () => {
    // In a real application, we would navigate to a specific roadmap page
    // For now, we'll just show a toast notification
    toast({
      title: `${title} Roadmap`,
      description: "This roadmap will be available in the full version of the app.",
    });
  };

  return (
    <div className={cn(
      "glass-card p-6 rounded-xl transition-all duration-300 hover-glow flex flex-col h-full",
      className
    )}>
      <div className="mb-4">
        <Badge className={`${getLevelColor(level)} border`}>
          {level}
        </Badge>
        <Badge variant="outline" className="ml-2">
          {timeframe}
        </Badge>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/80 mb-4 flex-grow">{description}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge key={i} variant="secondary" className="bg-secondary/80">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <Button 
        className="w-full bg-brand-purple hover:bg-brand-purple/90 group"
        onClick={handleViewRoadmap}
      >
        <span>View Roadmap</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default RoadmapCard;
