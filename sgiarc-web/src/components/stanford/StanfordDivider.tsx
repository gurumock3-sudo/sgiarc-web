import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  image: string;
}

const StanfordDivider: React.FC<Props> = ({ image }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
        <img 
          src={image} 
          alt="Divider Parallax" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default StanfordDivider;
