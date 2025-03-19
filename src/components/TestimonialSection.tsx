
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    image: '/placeholder.svg',
    quote: 'DevPathAI helped me transition from a junior to senior developer in just 10 months. The personalized roadmap was incredibly accurate for my career goals.',
  },
  {
    name: 'Samantha Lee',
    role: 'Data Scientist',
    image: '/placeholder.svg',
    quote: 'The AI coaching and challenges pushed me to learn skills I wouldn\'t have considered. I secured my dream job after completing my personalized learning path.',
  },
  {
    name: 'Michael Torres',
    role: 'Full Stack Engineer',
    image: '/placeholder.svg',
    quote: 'The hackathon mentor helped me build a project that won first place. The guidance on tech stack and implementation was invaluable.',
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            See how DevPathAI has helped developers accelerate their careers and achieve their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-none hover-glow">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-brand-purple mb-4 opacity-50" />
                <p className="text-foreground/90 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-brand-purple/20 text-brand-purple">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
