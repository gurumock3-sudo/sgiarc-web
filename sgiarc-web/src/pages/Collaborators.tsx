import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';

interface Collaborator {
  id: number;
  name: string;
  institution: string;
  country: string;
  expertise: string;
  category: string;
}

const Collaborators: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('collaborators').select('*').eq('is_active', true).order('sort_order');
      if (data) setCollaborators(data);
    };
    fetchData();
  }, []);

  const intl = collaborators.filter(c => c.category === 'International');
  const national = collaborators.filter(c => c.category === 'National');

  const renderCollab = (c: Collaborator, idx: number) => (
    <motion.div 
      key={c.id} 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }} 
      className="p-8 bg-white border-b-4 border-transparent hover:border-stanford-cardinal shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      <h3 className="font-serif font-bold text-2xl text-stanford-black group-hover:text-stanford-cardinal transition-colors mb-2">{c.name}</h3>
      <p className="text-sm font-sans font-bold text-stanford-cardinal uppercase tracking-widest mb-4 flex items-start">
        <MapPin className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
        <span>{c.institution} ({c.country})</span>
      </p>
      <div className="mt-auto pt-6">
        <div className="text-xs uppercase text-stanford-coolGrey font-sans font-bold tracking-widest mb-2">Core Expertise</div>
        <p className="text-lg text-stanford-coolGrey font-serif italic leading-relaxed">{c.expertise}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full pt-32 pb-24 bg-stanford-lightGrey min-h-screen">
      <div className="container px-4 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stanford-black mb-6">Collaboration</h1>
          <div className="w-24 h-1 bg-stanford-cardinal mb-6"></div>
          <p className="text-xl text-stanford-coolGrey font-sans font-light max-w-3xl">Global & National Research Partnerships fostering joint development and innovation.</p>
        </motion.div>

        <div className="space-y-20">
          {intl.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center border-b border-gray-300 pb-4 text-stanford-black">
                International Collaborators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {intl.map((c, i) => renderCollab(c, i))}
              </div>
            </div>
          )}

          {national.length > 0 && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center border-b border-gray-300 pb-4 text-stanford-black">
                National Collaborators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {national.map((c, i) => renderCollab(c, i))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
