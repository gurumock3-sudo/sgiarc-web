import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Area {
  id: number;
  title: string;
  description: string;
}

const ResearchAreasSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      const { data } = await supabase.from('research_areas').select('*').eq('is_active', true).order('sort_order');
      if (data) setAreas(data);
    };
    fetchAreas();
  }, []);

  return (
    <section className="section bg-stanford-lightGrey">
      <div className="container">
        <div className="mb-16">
          <div className="section-badge">Scientific Focus</div>
          <h2 className="section-title">{title || 'Research Thrust Areas'}</h2>
          <div className="divider-ssgmce"></div>
          <p className="text-stanford-coolGrey max-w-3xl text-xl font-light">
            {subtitle || 'Core scientific domains actively investigated at BioMID Lab.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, idx) => (
            <motion.div 
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white p-10 border-b-4 border-transparent hover:border-stanford-cardinal shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors">
                  {area.title}
                </h3>
              </div>
              <p className="text-stanford-coolGrey font-sans text-lg leading-relaxed flex-grow">
                {area.description}
              </p>
              <div className="mt-8 flex items-center text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform duration-300">
                Explore <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreasSection;
