import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beaker } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

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
    <section className="section bg-white relative z-20">
      <div className="container">
        <div className="mb-16">
          <div className="section-badge">Funded Initiatives</div>
          <h2 className="section-title">{title || 'Featured Research Projects'}</h2>
          <div className="divider-ssgmce"></div>
          <p className="text-stanford-coolGrey max-w-3xl text-xl font-light">
            {subtitle || 'High-impact sponsored research projects funded by national agencies and industry partners.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        
        <div className="mt-16">
          <Link to="/projects" className="btn btn-primary text-lg px-10 py-4 shadow-md">View All Sponsored Projects</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
