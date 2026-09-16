import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Building2 } from 'lucide-react';
import { COLLABORATORS } from '../data/sgiarcContent';

const Collaborators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'International' | 'National'>('All');

  const filtered = COLLABORATORS.filter(c => {
    if (activeTab === 'All') return true;
    return c.category === activeTab;
  });

  const intlCount = COLLABORATORS.filter(c => c.category === 'International').length;
  const natCount = COLLABORATORS.filter(c => c.category === 'National').length;

  return (
    <div className="w-full pt-28 pb-32 bg-white min-h-screen font-sans text-stanford-black">
      {/* Header Banner */}
      <div className="bg-stanford-cardinal text-white py-16 px-4 md:px-12 lg:px-24 mb-16">
        <div className="container max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-white"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">Global Network</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">
            Research Collaborators
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl leading-relaxed mb-8">
            High-impact bilateral research linkages with premier global and national academic institutions across Israel, Greece, Spain, Norway, Brazil, China, and premier Indian institutes including IIT Delhi and BITS Pilani.
          </p>

          <div className="flex gap-8 pt-4 border-t border-white/20 text-sm font-bold uppercase tracking-wider">
            <div>
              <span className="text-2xl font-serif font-bold">{intlCount}</span> International Partners
            </div>
            <div>
              <span className="text-2xl font-serif font-bold">{natCount}</span> National Institutes
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        {/* Filter Tabs */}
        <div className="flex space-x-3 mb-12 border-b border-gray-200 pb-4">
          {(['All', 'International', 'National'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-all ${
                activeTab === tab
                  ? 'bg-stanford-cardinal text-white shadow'
                  : 'bg-stanford-lightGrey text-stanford-coolGrey hover:bg-gray-200'
              }`}
            >
              {tab === 'All' ? `All Collaborators (${COLLABORATORS.length})` : `${tab} (${tab === 'International' ? intlCount : natCount})`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
              className="bg-stanford-lightGrey p-8 border-b-4 border-transparent hover:border-stanford-cardinal transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stanford-cardinal mb-3">
                  <span>{c.category} Partnership</span>
                  {c.category === 'International' ? <Globe className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                </div>

                <h3 className="text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug mb-3">
                  {c.name}
                </h3>

                <p className="text-sm font-sans font-bold text-stanford-coolGrey mb-6 flex items-start">
                  <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-stanford-cardinal mt-0.5" />
                  <span>{c.institution}</span>
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="text-xs uppercase font-bold tracking-wider text-stanford-coolGrey/80 mb-2">
                  Core Scientific Expertise:
                </div>
                <p className="text-sm font-serif italic text-stanford-black/90 leading-relaxed">
                  "{c.expertise}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
