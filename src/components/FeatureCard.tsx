
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  linkTo?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className, linkTo }: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-xl transition-all duration-300 hover-glow animate-fade-in cursor-pointer", 
        className
      )}
      onClick={handleClick}
    >
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/80">{description}</p>
    </div>
  );
};

export default FeatureCard;
