import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import MaskedReveal from '../animations/MaskedReveal';

interface Project {
  id: string;
  project_title: string;
  project_description: string;
}

const FeaturedProjectsSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('members')
        .select('id, project_title, project_description')
        .not('project_title', 'is', null)
        .limit(3);
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <section className="section bg-white relative z-20 pt-32 pb-32">
      <div className="container">
        <div className="mb-20">
          <MaskedReveal delay={0.1} duration={1}>
            <div className="text-stanford-cardinal font-bold font-sans tracking-widest uppercase text-sm mb-4">Funded Initiatives</div>
          </MaskedReveal>
          
          <div className="mb-6 leading-tight">
            {(title || 'Featured Research Projects').split(' ').map((word, i) => (
              <MaskedReveal key={i} delay={0.2 + (i * 0.05)} duration={1.2}>
                <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stanford-black mr-3 inline-block">
                  {word}
                </span>
              </MaskedReveal>
            ))}
          </div>
          
          <MaskedReveal delay={0.4} duration={1}>
            <div className="w-16 h-1 bg-stanford-cardinal mb-6"></div>
          </MaskedReveal>
          
          <MaskedReveal delay={0.5} duration={1.2}>
            <p className="text-stanford-coolGrey max-w-3xl text-xl font-light">
              {subtitle || 'High-impact sponsored research projects funded by national agencies and industry partners.'}
            </p>
          </MaskedReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-stanford-lightGrey p-10 shadow-sm border-b-4 border-transparent hover:border-stanford-cardinal transition-all duration-300 group flex flex-col"
            >
              <h3 className="text-2xl font-serif font-bold mb-4 text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug">
                {project.project_title}
              </h3>
              <p className="text-stanford-coolGrey font-sans text-lg mb-8 line-clamp-4 flex-grow">
                {project.project_description || 'Exploring intelligent biosensing and advanced computational modelling.'}
              </p>
              <Link to="/projects" className="text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm inline-flex items-center mt-auto group-hover:translate-x-2 transition-transform duration-300">
                Read Full Abstract <span className="ml-2">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }}
          className="mt-16"
        >
          <Link to="/projects" className="btn btn-primary rounded-none font-bold uppercase tracking-wider text-sm px-10 shadow-md">View All Sponsored Projects</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
