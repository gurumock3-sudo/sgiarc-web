import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
  duration = 1.0, 
  className = "",
  as: Component = "div" 
}) => {
  const ref = useRef(null);
  // trigger as soon as it enters viewport (10% margin so it doesn't trigger when barely visible)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const containerVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { 
        duration: duration, 
        delay: delay,
        ease: [0.19, 1.0, 0.22, 1.0] // Stanford-esque silky smooth bezier
      } 
    }
  };

  return (
    <div ref={ref} className="overflow-hidden relative inline-flex" style={{ verticalAlign: 'top' }}>
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
