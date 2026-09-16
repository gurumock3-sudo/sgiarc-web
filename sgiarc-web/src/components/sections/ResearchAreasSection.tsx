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
    <section className="section bg-white">
      <div className="container">
        <div className="mb-12 text-center md:text-left">
          <div className="section-badge">Scientific Focus</div>
          <h2 className="section-title">{title || 'Research Thrust Areas'}</h2>
          <div className="divider-ssgmce mx-auto md:mx-0"></div>
          <p className="text-gray-700 max-w-2xl text-lg">
            {subtitle || 'Core scientific domains actively investigated at BioMID Lab.'}
          </p>
        </div>

        <div className="space-y-6">
          {areas.map((area, idx) => (
            <motion.div 
              key={area.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start p-6 bg-brand-ivory rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 mr-6 mt-1 hidden sm:block">
                <div className="w-12 h-12 bg-brand-lavender rounded-full flex items-center justify-center text-brand-navy">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-brand-charcoal mb-2 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-brand-accent sm:hidden" />
                  {area.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{area.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreasSection;
