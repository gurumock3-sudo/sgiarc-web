import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import StanfordNewsEvents from '../components/stanford/StanfordNewsEvents';
import StanfordDivider from '../components/stanford/StanfordDivider';
import StanfordCenteredSection from '../components/stanford/StanfordCenteredSection';
import StanfordRedSection from '../components/stanford/StanfordRedSection';

const Home: React.FC = () => {
  return (
    <div className="w-full bg-white">
      {/* 1. Hero */}
      <HeroSection />
      
      {/* 2. Advancing the Frontier (Centered) */}
      <StanfordCenteredSection 
        title="Fostering Applied Innovation"
        subtitle="At SGIARC, a spirit of optimism and possibility energizes our mission of discovery and learning. Here you'll find a place of intellectual expansiveness, wide-ranging perspectives, and freedom to explore new lines of thinking."
        buttonText="About SGIARC"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
      />

      {/* 3. Stanford News (Left text, right 4 cards) */}
      <StanfordNewsEvents />

      {/* 4. Massive Parallax Image Divider */}
      <StanfordDivider image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80" />

      {/* 5. Research for a Better World (Centered) */}
      <StanfordCenteredSection 
        title="Research for a Better World"
        subtitle="Solving society's pressing challenges requires state-of-the-art laboratories and smart people. It also takes a deep belief in the power of cross-disciplinary collaboration and the audacity to go in new directions."
        buttonText="Research"
      />

      {/* 6. Education for Engaged Citizenship (Solid Red) */}
      <StanfordRedSection 
        title="Education for Engaged Citizenship"
        subtitle="SGIARC prepares students to thrive and lead with principle in a complex society through open inquiry and rigorous debate."
        buttonText="Academics"
      />

    </div>
  );
};

export default Home;
