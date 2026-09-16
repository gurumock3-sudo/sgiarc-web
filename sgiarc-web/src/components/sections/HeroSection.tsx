import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import MaskedReveal from '../animations/MaskedReveal';

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
  
  // Exact Stanford Parallax (Image moves down at 0.3 speed, scales slightly)
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  // Stanford fades out content slightly on scroll
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-stanford-black flex items-end pb-24 lg:pb-32">
      {heroContent && (
        <motion.div className="absolute inset-0 z-0 origin-bottom" style={{ y, scale }}>
          {heroContent.video_url ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={heroContent.poster_url} className="w-full h-full object-cover object-center">
              <source src={heroContent.video_url} type="video/mp4" />
            </video>
          ) : (
            <img src={heroContent.poster_url} alt="SGIARC Hero" className="w-full h-full object-cover object-center" />
          )}
          {/* Stanford Hero Gradient Mask - Pure black at bottom fading up */}
          <div className="absolute inset-0 bg-gradient-to-t from-stanford-black via-stanford-black/40 to-transparent opacity-90"></div>
        </motion.div>
      )}

      <div className="container relative z-10 px-4 md:px-12 lg:px-24 w-full">
        {heroContent ? (
          <motion.div 
            style={{ opacity }}
            className="max-w-4xl flex flex-col"
          >
            {heroContent.eyebrow && (
              <div className="mb-6">
                <MaskedReveal delay={0.1} duration={1}>
                  <span className="text-stanford-white/90 font-sans text-sm md:text-base font-bold tracking-[0.2em] uppercase">
                    {heroContent.eyebrow}
                  </span>
                </MaskedReveal>
              </div>
            )}
            
            <div className="mb-6 leading-[0.9]">
              {/* Split title into words to animate individually like Stanford */}
              {heroContent.title.split(' ').map((word, i) => (
                <MaskedReveal key={i} delay={0.2 + (i * 0.1)} duration={1.2}>
                  <span className="text-6xl md:text-8xl lg:text-[130px] font-serif font-bold text-white tracking-tight mr-4">
                    {word}
                  </span>
                </MaskedReveal>
              ))}
            </div>
            
            {heroContent.subtitle && (
              <div className="mb-10 max-w-3xl">
                <MaskedReveal delay={0.6} duration={1.2}>
                  <p className="text-2xl md:text-4xl text-white font-serif font-light leading-snug">
                    {heroContent.subtitle}
                  </p>
                </MaskedReveal>
              </div>
            )}
            
            <div className="flex flex-wrap gap-6 mt-6">
              {heroContent.primary_cta_text && (
                <MaskedReveal delay={0.8} duration={1}>
                  <Link to={heroContent.primary_cta_link} className="btn bg-stanford-cardinal text-white hover:bg-stanford-cardinalDark rounded-none px-8 py-4 font-sans font-bold text-lg flex items-center shadow-md">
                    {heroContent.primary_cta_text} <ArrowRight className="ml-3 h-5 w-5" />
                  </Link>
                </MaskedReveal>
              )}
              {heroContent.secondary_cta_text && (
                <MaskedReveal delay={0.9} duration={1}>
                  <Link to={heroContent.secondary_cta_link} className="btn bg-transparent border border-white text-white hover:bg-white hover:text-stanford-cardinal rounded-none px-8 py-4 font-sans font-bold text-lg flex items-center shadow-md">
                    {heroContent.secondary_cta_text}
                  </Link>
                </MaskedReveal>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="animate-pulse flex flex-col space-y-4 max-w-3xl pb-12">
            <div className="h-4 bg-white/20 rounded w-1/4"></div>
            <div className="h-24 bg-white/20 rounded w-full"></div>
            <div className="h-8 bg-white/20 rounded w-3/4 mt-4"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
