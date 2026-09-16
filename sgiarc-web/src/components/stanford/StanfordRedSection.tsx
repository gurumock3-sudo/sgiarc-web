import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitTextReveal from '../animations/SplitTextReveal';

interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
}

const StanfordRedSection: React.FC<Props> = ({ title, subtitle, buttonText }) => {
  return (
    <section className="bg-stanford-cardinalDark py-32 md:py-40">
      <div className="container px-4 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
          <SplitTextReveal text={title} />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/90 font-sans text-lg mb-8 max-w-3xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="#" className="inline-block bg-transparent border border-white text-white hover:bg-white hover:text-stanford-cardinalDark rounded-full px-8 py-3 text-sm font-bold tracking-wide transition-colors">
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StanfordRedSection;
