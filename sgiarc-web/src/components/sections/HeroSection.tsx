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
  // Deep parallax for stanford effect
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.05]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-stanford-black flex items-end pb-24">
      {heroContent && (
        <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
          {heroContent.video_url ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={heroContent.poster_url} className="w-full h-full object-cover object-center">
              <source src={heroContent.video_url} type="video/mp4" />
            </video>
          ) : (
            <img src={heroContent.poster_url} alt="SGIARC Hero" className="w-full h-full object-cover object-center" />
          )}
          {/* Stanford style bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-stanford-black/80 via-stanford-black/20 to-transparent"></div>
        </motion.div>
      )}

      <div className="container relative z-10 px-4 md:px-12 lg:px-24 w-full">
        {heroContent ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            {heroContent.eyebrow && (
              <motion.div variants={itemVariants} className="text-stanford-white/90 font-sans text-sm md:text-base font-semibold mb-4 tracking-widest uppercase">
                {heroContent.eyebrow}
              </motion.div>
            )}
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-[110px] font-serif font-medium text-white mb-6 leading-[0.95] tracking-tight"
            >
              {heroContent.title}
            </motion.h1>
            
            {heroContent.subtitle && (
              <motion.p variants={itemVariants} className="text-2xl md:text-4xl text-white font-serif font-light mb-8 max-w-3xl">
                {heroContent.subtitle}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mt-12">
              {heroContent.primary_cta_text && (
                <Link to={heroContent.primary_cta_link} className="btn bg-stanford-cardinal text-white hover:bg-stanford-cardinalDark rounded-none px-8 py-4 font-sans text-lg flex items-center shadow-md">
                  {heroContent.primary_cta_text} <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              )}
              {heroContent.secondary_cta_text && (
                <Link to={heroContent.secondary_cta_link} className="btn bg-white text-stanford-cardinal hover:bg-gray-100 rounded-none px-8 py-4 font-sans text-lg flex items-center shadow-md">
                  {heroContent.secondary_cta_text}
                </Link>
              )}
            </motion.div>
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
