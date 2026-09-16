import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Microscope, Dna, Cpu, Layers, Zap } from 'lucide-react';
import { RESEARCH_AREAS } from '../../data/sgiarcContent';

const icons = [Microscope, Dna, Layers, Cpu, Zap];

const ResearchAreasSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <section className="section bg-stanford-lightGrey py-24 md:py-32">
      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        <div className="mb-20">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-stanford-cardinal mb-3">Scientific Frontiers</div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-stanford-black mb-6">
            {title || 'Research Thrust Areas'}
          </h2>
          <div className="w-20 h-1 bg-stanford-cardinal mb-6"></div>
          <p className="text-stanford-coolGrey max-w-3xl text-xl font-light leading-relaxed">
            {subtitle || 'Core scientific domains actively investigated at BioMID Lab combining microfluidics, biosensors, additive manufacturing, and artificial intelligence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESEARCH_AREAS.map((area, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white p-10 border-b-4 border-transparent hover:border-stanford-cardinal shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none bg-stanford-cardinal/10 flex items-center justify-center text-stanford-cardinal mb-6 group-hover:bg-stanford-cardinal group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug mb-4">
                    {area.title}
                  </h3>
                  
                  <p className="text-stanford-coolGrey font-sans text-base leading-relaxed mb-6 font-light">
                    {area.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-xs group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore Research Direction</span> <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreasSection;
