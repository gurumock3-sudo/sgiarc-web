import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitTextReveal from '../animations/SplitTextReveal';

const StanfordNewsEvents: React.FC = () => {
  const news = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
      title: "Breakthrough in Biosensing Technology",
      date: "September 15, 2026",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      title: "SGIARC Secures DST Grant for IoT Innovations",
      date: "September 10, 2026",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      title: "New AI Framework for Healthcare Diagnostics",
      date: "September 02, 2026",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      title: "Researchers Publish High-Impact Findings in Nature",
      date: "August 28, 2026",
    }
  ];

  return (
    <section className="bg-stanford-lightGrey py-24 md:py-32">
      <div className="container px-4 md:px-12 lg:px-24">
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column - Title & Button */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="text-4xl md:text-5xl font-serif font-bold text-stanford-black mb-6 leading-tight">
              <SplitTextReveal text="SGIARC News" />
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-stanford-coolGrey font-sans text-lg mb-8 leading-relaxed max-w-sm"
            >
              Stories to keep you informed and inspired, from one of the region's leading research and teaching institutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/news" className="btn btn-primary bg-stanford-cardinal text-white hover:bg-stanford-cardinalDark rounded-full px-8 py-3 text-sm font-bold w-fit">
                SGIARC Report
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Arched Cards Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {news.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <div className="overflow-hidden mb-6 relative w-full aspect-[4/5] rounded-t-[10rem]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stanford-coolGrey font-sans text-sm mt-auto font-semibold">
                    {item.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StanfordNewsEvents;
