import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beaker, FileText, Award, Users } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../lib/supabase';

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

const Home: React.FC = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setHeroContent(data);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="w-full">
      {/* Dynamic Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-brand-charcoal flex items-center">
        {/* Background Video or Poster */}
        {heroContent && (
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y, opacity }}
          >
            {heroContent.video_url ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroContent.poster_url}
                className="w-full h-full object-cover object-center"
              >
                <source src={heroContent.video_url} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={heroContent.poster_url} 
                alt="SGIARC Hero" 
                className="w-full h-full object-cover object-center"
              />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/60 to-transparent"></div>
          </motion.div>
        )}

        {/* Content */}
        <div className="container relative z-10 px-4 md:px-8">
          {heroContent ? (
            <div className={`max-w-3xl ${heroContent.alignment === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {heroContent.eyebrow && (
                  <div className="inline-block px-3 py-1 bg-brand-navy/80 text-brand-ivory rounded-full text-xs md:text-sm font-semibold mb-6 tracking-wider uppercase backdrop-blur-sm border border-brand-navy/50">
                    {heroContent.eyebrow}
                  </div>
                )}
                
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 leading-[1.1] drop-shadow-lg">
                  {heroContent.title}
                </h1>
                
                {heroContent.subtitle && (
                  <p className="text-xl md:text-3xl text-brand-accent font-semibold mb-6 drop-shadow-md">
                    {heroContent.subtitle}
                  </p>
                )}
                
                {heroContent.description && (
                  <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-sm font-light">
                    {heroContent.description}
                  </p>
                )}

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
            /* Loading State */
            <div className="animate-pulse flex flex-col space-y-4 max-w-3xl">
              <div className="h-6 bg-gray-600 rounded w-1/4"></div>
              <div className="h-20 bg-gray-600 rounded w-full"></div>
              <div className="h-8 bg-gray-600 rounded w-3/4"></div>
              <div className="h-24 bg-gray-600 rounded w-full mt-4"></div>
              <div className="flex gap-4 mt-8">
                 <div className="h-12 bg-gray-600 rounded w-48"></div>
                 <div className="h-12 bg-gray-600 rounded w-48"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section with Scroll Animation */}
      <section className="bg-white border-b border-gray-100 relative z-20">
        <div className="container px-4 md:px-8">
           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12"
            >
              {[
                { num: '70+', label: 'Publications', icon: FileText },
                { num: '70+', label: 'Citations', icon: Award },
                { num: '10+', label: 'Patents', icon: Beaker },
                { num: '15+', label: 'Researchers', icon: Users },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center md:items-start md:border-l-2 md:border-brand-accent md:pl-8 text-center md:text-left">
                  <stat.icon className="text-brand-navy mb-3 h-8 w-8 mx-auto md:mx-0" />
                  <div className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal">{stat.num}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase mt-1 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="section section-alt relative z-20">
        <div className="container">
          <div className="mb-16 text-center md:text-left">
            <div className="section-badge">Funded Initiatives</div>
            <h2 className="section-title">Featured Research Projects</h2>
            <div className="divider-ssgmce mx-auto md:mx-0"></div>
            <p className="text-gray-700 max-w-2xl text-lg">
              High-impact sponsored research projects funded by national agencies and industry partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for project cards fetched from Supabase */}
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-brand-ivory rounded-lg mb-6 flex items-center justify-center text-brand-navy/40 overflow-hidden relative">
                  <Beaker className="w-12 h-12 absolute opacity-10 transform group-hover:scale-150 transition-transform duration-500" />
                  <span className="font-semibold">Project Visual</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-brand-charcoal group-hover:text-brand-navy transition-colors">AI-Enabled Diagnostics</h3>
                <p className="text-base text-gray-600 mb-6 line-clamp-3">
                  Developing an explainable AI-based system for early disease detection from clinical images, integrating deep learning with medical knowledge.
                </p>
                <Link to="/projects" className="text-brand-accent font-bold hover:text-brand-navy transition-colors inline-flex items-center text-sm uppercase tracking-wide">
                  Read Full Abstract <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/projects" className="btn btn-navy py-3 px-8 text-lg">View All Sponsored Projects</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
