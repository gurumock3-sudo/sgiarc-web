import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container px-4 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stanford-black mb-6">About SGIARC</h1>
          <div className="w-24 h-1 bg-stanford-cardinal mb-12"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-serif font-semibold text-stanford-black mb-6">Center Heritage & Fostering Applied Innovation</h2>
            <p className="text-xl text-stanford-coolGrey font-sans font-light leading-relaxed mb-8">
              Shri Gajanan Innovation and Advanced Research Center (SGIARC) is the apex research body of Shri Sant Gajanan Maharaj College of Engineering, Shegaon. Established with a vision to transform regional and national challenges into engineering solutions, SGIARC serves as a multidisciplinary incubator bridging academic inquiry and industrial application.
            </p>
            <p className="text-xl text-stanford-coolGrey font-sans font-light leading-relaxed mb-12">
              Affiliated to Sant Gadge Baba Amravati University (SGBAU) as a recognized Ph.D. research center, SGIARC oversees doctoral dissertations, AICTE & DST funded research schemes, patent filings, and high-performance computing clusters.
            </p>

            <div className="space-y-12">
              <div className="bg-stanford-lightGrey p-10 border-l-8 border-stanford-cardinal">
                <h3 className="text-2xl font-serif font-bold text-stanford-black mb-4">Our Vision</h3>
                <p className="text-lg text-stanford-coolGrey font-sans">
                  To emerge as an internationally acclaimed center of excellence in interdisciplinary research, fostering ethical innovation, societal prosperity, and sustainable technological leadership.
                </p>
              </div>

              <div className="bg-stanford-lightGrey p-10 border-l-8 border-stanford-black">
                <h3 className="text-2xl font-serif font-bold text-stanford-black mb-4">Our Mission</h3>
                <p className="text-lg text-stanford-coolGrey font-sans">
                  To cultivate rigorous academic and industrial research, mentor next-generation doctoral scholars, and secure high-impact sponsored grants while delivering technology that empowers rural and national ecosystems.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-stanford-cardinal text-white p-8 sticky top-32 shadow-xl">
              <h3 className="text-2xl font-serif font-bold mb-6">Quick Facts</h3>
              <ul className="space-y-6 font-sans">
                <li className="border-b border-white/20 pb-4">
                  <span className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-1">Established</span>
                  <span className="text-xl">SSGMCE Campus, Shegaon</span>
                </li>
                <li className="border-b border-white/20 pb-4">
                  <span className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-1">Affiliation</span>
                  <span className="text-xl">Sant Gadge Baba Amravati University (SGBAU)</span>
                </li>
                <li className="border-b border-white/20 pb-4">
                  <span className="block text-sm font-bold uppercase tracking-wider text-white/70 mb-1">Focus Areas</span>
                  <span className="text-xl">BioMID, IoT, AI, Microfluidics</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
