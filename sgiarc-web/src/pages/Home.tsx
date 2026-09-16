import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import ResearchAreasSection from '../components/sections/ResearchAreasSection';
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection';
import TeamSnippetSection from '../components/sections/TeamSnippetSection';
import PublicationsSnippetSection from '../components/sections/PublicationsSnippetSection';
import AboutSnippetSection from '../components/sections/AboutSnippetSection';

// Map component names from the database to actual React components
const componentMap: Record<string, React.FC<any>> = {
  HeroSection,
  StatsSection,
  ResearchAreasSection,
  FeaturedProjectsSection,
  TeamSnippetSection,
  PublicationsSnippetSection,
  AboutSnippetSection,
};

interface SiteSection {
  id: number;
  name: string;
  title: string | null;
  subtitle: string | null;
  component_name: string;
  sort_order: number;
}

const Home: React.FC = () => {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (data && !error) {
        setSections(data);
      }
      setLoading(false);
    };

    fetchSections();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-brand-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-navy"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {sections.map((section) => {
        const Component = componentMap[section.component_name];
        if (!Component) {
          console.warn(`Component ${section.component_name} not found in map.`);
          return null;
        }
        return (
          <Component 
            key={section.id} 
            title={section.title} 
            subtitle={section.subtitle} 
          />
        );
      })}
    </div>
  );
};

export default Home;
