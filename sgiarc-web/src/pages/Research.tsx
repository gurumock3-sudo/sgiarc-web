import React from 'react';
import ResearchAreasSection from '../components/sections/ResearchAreasSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';

const Research: React.FC<{ type: 'areas' | 'projects' }> = ({ type }) => {
  return (
    <div className="w-full">
      <div className="bg-brand-lavender/30 py-12 border-b border-gray-200">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-2">
            {type === 'areas' ? 'Research Areas' : 'Research Projects'}
          </h1>
          <p className="text-brand-navy font-semibold">
            {type === 'areas' ? 'Core scientific domains actively investigated' : 'Sponsored and academic projects'}
          </p>
        </div>
      </div>
      
      {type === 'areas' ? (
        <ResearchAreasSection title="Thrust Areas" subtitle="Detailed overview of our focus domains." />
      ) : (
        <FeaturedProjectsSection title="All Projects" subtitle="Comprehensive list of ongoing and completed projects." />
      )}
    </div>
  );
};

export default Research;
