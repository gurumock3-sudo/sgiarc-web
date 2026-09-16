import React from 'react';
import MaskedReveal from './MaskedReveal';

interface Props {
  text: string;
  className?: string;
  baseDelay?: number;
}

const SplitTextReveal: React.FC<Props> = ({ text, className = "", baseDelay = 0 }) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {text.split(' ').map((word, index) => (
        <React.Fragment key={index}>
          <MaskedReveal delay={baseDelay + (index * 0.04)} duration={1.2}>
            <span className="inline-block mr-[0.3em]">{word}</span>
          </MaskedReveal>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SplitTextReveal;
