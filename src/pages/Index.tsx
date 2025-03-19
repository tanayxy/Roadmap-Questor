import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RoadmapsSection from '@/components/RoadmapsSection';
import GenerateRoadmapSection from '@/components/GenerateRoadmapSection';
import TestimonialSection from '@/components/TestimonialSection';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RoadmapsSection />
        <GenerateRoadmapSection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
