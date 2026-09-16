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
    <section className="section section-alt relative z-20">
      <div className="container">
        <div className="mb-16 text-center md:text-left">
          <div className="section-badge">Funded Initiatives</div>
          <h2 className="section-title">{title || 'Featured Research Projects'}</h2>
          <div className="divider-ssgmce mx-auto md:mx-0"></div>
          <p className="text-gray-700 max-w-2xl text-lg">
            {subtitle || 'High-impact sponsored research projects funded by national agencies and industry partners.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="h-40 bg-brand-ivory rounded-lg mb-6 flex items-center justify-center text-brand-navy/40 overflow-hidden relative shrink-0">
                <Beaker className="w-12 h-12 absolute opacity-10 transform group-hover:scale-150 transition-transform duration-500" />
                <span className="font-semibold text-sm px-4 text-center">{project.project_title}</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-brand-charcoal group-hover:text-brand-navy transition-colors">{project.project_title}</h3>
              <p className="text-sm text-gray-600 mb-6 line-clamp-4 flex-grow">
                {project.project_description}
              </p>
              <Link to="/projects" className="text-brand-accent font-bold hover:text-brand-navy transition-colors inline-flex items-center text-xs uppercase tracking-wide mt-auto">
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
  );
};

export default FeaturedProjectsSection;
