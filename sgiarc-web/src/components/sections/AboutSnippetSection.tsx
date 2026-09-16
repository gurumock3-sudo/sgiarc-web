import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutSnippetSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <section className="section bg-stanford-lightGrey relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-badge">Center Heritage</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stanford-black mb-6 leading-tight">
              {title || 'Fostering Applied Innovation in Central India'}
            </h2>
            <div className="w-16 h-1 bg-stanford-cardinal mb-8"></div>
            <p className="text-xl text-stanford-coolGrey font-sans font-light leading-relaxed mb-8">
              {subtitle || 'Shri Gajanan Innovation and Advanced Research Center (SGIARC) is the apex research body of Shri Sant Gajanan Maharaj College of Engineering, Shegaon.'}
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More About Us
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-video bg-white shadow-2xl p-4 border-l-8 border-stanford-cardinal">
              <div className="w-full h-full bg-stanford-sand/30 flex items-center justify-center font-serif text-stanford-coolGrey italic text-lg text-center p-8">
                "To emerge as an internationally acclaimed center of excellence in interdisciplinary research, fostering ethical innovation, societal prosperity, and sustainable technological leadership."
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippetSection;
