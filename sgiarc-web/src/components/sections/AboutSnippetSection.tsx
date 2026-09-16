import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MaskedReveal from '../animations/MaskedReveal';

const AboutSnippetSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <section className="section bg-stanford-lightGrey relative overflow-hidden pt-32 pb-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col">
            <MaskedReveal delay={0.1} duration={1}>
              <div className="text-stanford-cardinal font-bold font-sans tracking-widest uppercase text-sm mb-6">Center Heritage</div>
            </MaskedReveal>
            
            <div className="mb-8 leading-tight">
              {(title || 'Fostering Applied Innovation in Central India').split(' ').map((word, i) => (
                <MaskedReveal key={i} delay={0.2 + (i * 0.05)} duration={1.2}>
                  <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-stanford-black mr-3 inline-block">
                    {word}
                  </span>
                </MaskedReveal>
              ))}
            </div>

            <MaskedReveal delay={0.5} duration={1}>
              <div className="w-16 h-1 bg-stanford-cardinal mb-8"></div>
            </MaskedReveal>

            <MaskedReveal delay={0.6} duration={1.2}>
              <p className="text-xl text-stanford-coolGrey font-sans font-light leading-relaxed mb-10">
                {subtitle || 'Shri Gajanan Innovation and Advanced Research Center (SGIARC) is the apex research body of Shri Sant Gajanan Maharaj College of Engineering, Shegaon.'}
              </p>
            </MaskedReveal>

            <MaskedReveal delay={0.8} duration={1}>
              <Link to="/about" className="btn btn-primary rounded-none font-bold uppercase tracking-wider text-sm px-10">
                Learn More About Us
              </Link>
            </MaskedReveal>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-video lg:aspect-square bg-white shadow-2xl p-6 md:p-12 border-t-8 border-stanford-cardinal">
              <div className="w-full h-full bg-stanford-lightGrey flex items-center justify-center font-serif text-stanford-black italic text-xl md:text-2xl leading-relaxed text-center p-8 md:p-12">
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
