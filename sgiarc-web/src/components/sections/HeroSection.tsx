import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';

interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  poster_url: string;
  video_url: string;
  alignment: string;
}

const HeroSection: React.FC<{ sectionTitle?: string }> = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false })
        .limit(1)
        .single();
      if (data) setHeroContent(data);
    };
    fetchHero();
  }, []);

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-brand-charcoal flex items-center">
      {heroContent && (
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          {heroContent.video_url ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={heroContent.poster_url} className="w-full h-full object-cover object-center">
              <source src={heroContent.video_url} type="video/mp4" />
            </video>
          ) : (
            <img src={heroContent.poster_url} alt="SGIARC Hero" className="w-full h-full object-cover object-center" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/60 to-transparent"></div>
        </motion.div>
      )}

      <div className="container relative z-10 px-4 md:px-8">
        {heroContent ? (
          <div className={`max-w-3xl ${heroContent.alignment === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              {heroContent.eyebrow && (
                <div className="inline-block px-3 py-1 bg-brand-navy/80 text-brand-ivory rounded-full text-xs md:text-sm font-semibold mb-6 tracking-wider uppercase backdrop-blur-sm border border-brand-navy/50">
                  {heroContent.eyebrow}
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-[1.1] drop-shadow-lg">{heroContent.title}</h1>
              {heroContent.subtitle && <p className="text-xl md:text-3xl text-brand-accent font-semibold mb-6 drop-shadow-md">{heroContent.subtitle}</p>}
              {heroContent.description && <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-sm font-light">{heroContent.description}</p>}

              <div className={`flex flex-wrap gap-4 ${heroContent.alignment === 'center' ? 'justify-center' : ''}`}>
                {heroContent.primary_cta_text && (
                  <Link to={heroContent.primary_cta_link} className="btn bg-brand-accent text-brand-charcoal hover:bg-white hover:text-brand-navy font-bold flex items-center shadow-lg transform transition hover:-translate-y-1">
                    {heroContent.primary_cta_text} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
                {heroContent.secondary_cta_text && (
                  <Link to={heroContent.secondary_cta_link} className="btn bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-lg transform transition hover:-translate-y-1">
                    {heroContent.secondary_cta_text}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="animate-pulse flex flex-col space-y-4 max-w-3xl">
            <div className="h-6 bg-gray-600 rounded w-1/4"></div>
            <div className="h-20 bg-gray-600 rounded w-full"></div>
            <div className="h-8 bg-gray-600 rounded w-3/4"></div>
            <div className="h-24 bg-gray-600 rounded w-full mt-4"></div>
            <div className="flex gap-4 mt-8"><div className="h-12 bg-gray-600 rounded w-48"></div><div className="h-12 bg-gray-600 rounded w-48"></div></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
