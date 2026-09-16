import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSnippetSection from '../components/sections/AboutSnippetSection';
import StanfordNewsEvents from '../components/stanford/StanfordNewsEvents';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import TeamSnippetSection from '../components/sections/TeamSnippetSection';
import PublicationsSnippetSection from '../components/sections/PublicationsSnippetSection';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      
      {/* Stanford specific news and events layout */}
      <StanfordNewsEvents />

      <AboutSnippetSection />
      
      <FeaturedProjectsSection />
      
      <TeamSnippetSection />
      
      <PublicationsSnippetSection />
    </div>
  );
};

export default Home;
