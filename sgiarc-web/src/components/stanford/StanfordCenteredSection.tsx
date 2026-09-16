import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitTextReveal from '../animations/SplitTextReveal';

interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
  image?: string;
}

const StanfordCenteredSection: React.FC<Props> = ({ title, subtitle, buttonText, image }) => {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container px-4 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <div className="text-4xl md:text-5xl font-serif font-bold text-stanford-black mb-6">
          <SplitTextReveal text={title} />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-stanford-coolGrey font-sans text-lg mb-8 max-w-3xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="#" className="inline-block bg-stanford-cardinal text-white hover:bg-stanford-cardinalDark rounded-full px-8 py-3 text-sm font-bold tracking-wide transition-colors">
            {buttonText}
          </Link>
        </motion.div>

        {image && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-16 overflow-hidden rounded-[2rem] md:rounded-[4rem]"
          >
            <img src={image} alt={title} className="w-full h-auto max-h-[80vh] object-cover" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StanfordCenteredSection;
