import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PedigreeSection from '../components/PedigreeSection';
import TechStackSection from '../components/TechStackSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PedigreeSection />
      <TechStackSection />
      <Footer />
    </div>
  );
};

export default HomePage;
