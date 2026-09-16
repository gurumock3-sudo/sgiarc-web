import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MaskedRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const MaskedReveal: React.FC<MaskedRevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 1.2, 
  className = "",
  as: Component = "div" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const containerVariants = {
    hidden: { y: "110%", opacity: 0, rotate: 2 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        duration: duration, 
        delay: delay,
        ease: [0.19, 1.0, 0.22, 1.0] // Stanford-esque silky smooth bezier
      } 
    }
  };

  return (
    <div ref={ref} className="overflow-hidden" style={{ display: 'inline-flex' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MaskedReveal;
