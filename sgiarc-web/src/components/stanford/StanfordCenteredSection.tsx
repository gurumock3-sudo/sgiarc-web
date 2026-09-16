import React from 'react';
import { Link } from 'react-router-dom';
import SplitTextReveal from '../animations/SplitTextReveal';
import ScrollFade from '../animations/ScrollFade';

interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  image?: string;
}

const StanfordCenteredSection: React.FC<Props> = ({ title, subtitle, buttonText, buttonLink = '#', image }) => {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container px-4 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <div className="text-4xl md:text-5xl font-serif font-bold text-stanford-black mb-6">
          <SplitTextReveal text={title} className="justify-center" />
        </div>
        
        <ScrollFade delay={0.3} duration={1}>
          <p className="text-stanford-coolGrey font-sans text-lg mb-8 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        </ScrollFade>
        
        <ScrollFade delay={0.5} duration={0.8}>
          <Link to={buttonLink} className="inline-block bg-stanford-cardinal text-white hover:bg-stanford-cardinalDark rounded-full px-8 py-3 text-sm font-bold tracking-wide transition-colors">
            {buttonText}
          </Link>
        </ScrollFade>

        {image && (
          <ScrollFade delay={0.2} duration={1.2} distance={60}>
            <div className="w-full mt-16 overflow-hidden rounded-[2rem] md:rounded-[4rem]">
              <img src={image} alt={title} className="w-full h-auto max-h-[80vh] object-cover" />
            </div>
          </ScrollFade>
        )}
      </div>
    </section>
  );
};

export default StanfordCenteredSection;
