import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { EQUIPMENT_LIST } from '../data/sgiarcContent';

const Facilities: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = EQUIPMENT_LIST.filter(eq => 
    eq.equipment.toLowerCase().includes(search.toLowerCase()) ||
    eq.make.toLowerCase().includes(search.toLowerCase()) ||
    eq.model.toLowerCase().includes(search.toLowerCase()) ||
    eq.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full pt-28 pb-32 bg-white min-h-screen font-sans text-stanford-black">
      {/* Header Banner */}
      <div className="bg-stanford-cardinal text-white py-16 px-4 md:px-12 lg:px-24 mb-16">
        <div className="container max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-white"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">Infrastructure & Instrumentation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">
            Laboratory Equipment & Facilities
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl leading-relaxed mb-8">
            State-of-the-art consolidated equipment register for the BioMID Lab at SGIARC, supporting microfluidics, 3D additive manufacturing, UV-Vis spectroscopy, high-precision analytical weighing, and biological incubation.
          </p>

          <div className="flex gap-8 pt-4 border-t border-white/20 text-sm font-bold uppercase tracking-wider">
            <div>
              <span className="text-2xl font-serif font-bold">{EQUIPMENT_LIST.length}</span> Active Instrumentation Units
            </div>
            <div>
              <span className="text-2xl font-serif font-bold">100%</span> Research Grade Verified
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        {/* Search */}
        <div className="mb-12 max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stanford-coolGrey w-5 h-5" />
          <input 
            type="text"
            placeholder="Search equipment by name, make, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-stanford-cardinal text-sm font-sans placeholder-gray-400 shadow-sm"
          />
        </div>

        {/* Equipment Table / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((eq, idx) => (
            <motion.div 
              key={eq.sr || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
              className="bg-stanford-lightGrey p-8 border-l-4 border-stanford-cardinal shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stanford-cardinal mb-2">
                  <span>Register ID #{eq.sr}</span>
                  <span className="bg-white px-2 py-0.5 border border-gray-200 text-stanford-black">Qty: {eq.qty}</span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-stanford-black mb-2 leading-snug">
                  {eq.equipment}
                </h3>

                <div className="text-xs font-bold uppercase tracking-wider text-stanford-coolGrey mb-4 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Make: <strong className="text-stanford-black">{eq.make}</strong></span>
                  {eq.model && <span>Model: <strong className="text-stanford-black">{eq.model}</strong></span>}
                </div>

                <p className="text-sm font-sans text-stanford-coolGrey leading-relaxed bg-white p-4 border border-gray-200 mb-4">
                  {eq.details}
                </p>
              </div>

              {eq.serial && (
                <div className="text-xs font-mono text-stanford-coolGrey/80 pt-3 border-t border-gray-200">
                  Ref / Serial: {eq.serial}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
