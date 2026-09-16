import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Award, Beaker, Users } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
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
  );
};

export default StatsSection;
