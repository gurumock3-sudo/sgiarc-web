import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail } from 'lucide-react';
import { TEAM_MEMBERS } from '../../data/sgiarcContent';

const FeaturedProjectsSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  const projects = TEAM_MEMBERS.filter(m => m.projectName && m.projectName.length > 5);

  return (
    <section className="section bg-white relative z-20 py-24 md:py-32 font-sans text-stanford-black">
      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        <div className="mb-20">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-stanford-cardinal mb-3">
            Active Investigations
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-stanford-black mb-6 leading-tight">
            {title || 'Featured Research Projects'}
          </h2>
          <div className="w-20 h-1 bg-stanford-cardinal mb-6"></div>
          <p className="text-stanford-coolGrey max-w-3xl text-xl font-light leading-relaxed">
            {subtitle || 'High-impact interdisciplinary projects investigating deep learning, explainable AI, cardiovascular diagnostics, agricultural computer vision, and oncology screening.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-stanford-lightGrey p-8 md:p-10 shadow-sm border-t-4 border-transparent hover:border-stanford-cardinal transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stanford-cardinal mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BioMID Lab Project #{idx + 1}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4 text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug">
                  {project.projectName?.replace(/^"/, '').replace(/"$/, '')}
                </h3>

                <p className="text-stanford-coolGrey font-sans text-base leading-relaxed mb-6 font-light">
                  {project.projectDescription?.replace(/^"/, '').replace(/"$/, '')}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200/80 mt-auto">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-stanford-black font-serif text-sm">{project.name}</span>
                  {project.contact && (
                    <a 
                      href={`mailto:${project.contact}`}
                      className="text-stanford-cardinal hover:underline inline-flex items-center"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1" /> Contact
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
