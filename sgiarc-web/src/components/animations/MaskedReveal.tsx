import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MaskedRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const MaskedReveal: React.FC<MaskedRevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 1.0, 
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use native IntersectionObserver - works regardless of Lenis
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // once only
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden" style={{ display: 'inline-block', verticalAlign: 'top' }}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isVisible ? { y: 0 } : { y: '100%' }}
        transition={{ 
          duration, 
          delay,
          ease: [0.19, 1.0, 0.22, 1.0]
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MaskedReveal;
