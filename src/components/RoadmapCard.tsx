import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
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
  isCustom?: boolean;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-500 hover:bg-green-500/30';
    case 'Intermediate':
      return 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30';
    case 'Advanced':
      return 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30';
  }
};

const RoadmapCard = ({ title, description, level, timeframe, skills, className, isCustom }: RoadmapCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewRoadmap = () => {
    if (title === "Frontend Web Developer") {
      navigate('/roadmaps/frontend');
    } else if (title === "Backend Developer") {
      navigate('/roadmaps/backend');
    } else if (isCustom) {
      navigate('/roadmaps/custom');
    } else {
      toast({
        title: `${title} Roadmap`,
        description: "This roadmap will be available in the full version of the app.",
      });
    }
  };

  return (
    <div className={cn(
      "glass-card p-6 rounded-xl transition-all duration-300 hover-glow flex flex-col h-full",
      isCustom && "border-2 border-brand-purple/30 hover:border-brand-purple/50",
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
      
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        {title}
        {isCustom && <Sparkles className="w-5 h-5 text-brand-purple" />}
      </h3>
      <p className="text-foreground/80 mb-4 flex-grow">{description}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className={cn(
                "bg-secondary/80",
                isCustom && "bg-brand-purple/20 text-brand-purple"
              )}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <Button 
        className={cn(
          "w-full group",
          isCustom 
            ? "bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90" 
            : "bg-brand-purple hover:bg-brand-purple/90"
        )}
        onClick={handleViewRoadmap}
      >
        <span>{isCustom ? "Create Custom Roadmap" : "View Roadmap"}</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default RoadmapCard;
