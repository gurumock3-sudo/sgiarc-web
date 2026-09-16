import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, BookOpen } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  designation: string;
  email: string;
  bio: string;
  project_title: string;
  category: string;
}

const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('members').select('*').eq('is_active', true).order('sort_order');
      if (data) setMembers(data);
    };
    fetchData();
  }, []);

  const pis = members.filter(m => m.category === 'PI');
  const researchers = members.filter(m => m.category === 'Researcher');

  return (
    <div className="w-full pt-32 pb-24 bg-stanford-lightGrey min-h-screen">
      <div className="container px-4 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stanford-black mb-6">Research Team</h1>
          <div className="w-24 h-1 bg-stanford-cardinal mb-6"></div>
          <p className="text-xl text-stanford-coolGrey font-sans font-light">The minds behind BioMID Lab</p>
        </motion.div>

        {/* Principal Investigator */}
        {pis.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-semibold text-stanford-black mb-8 border-b border-gray-300 pb-4">Principal Investigator</h2>
            <div className="grid grid-cols-1 gap-8">
              {pis.map((pi) => (
                <motion.div key={pi.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row bg-white shadow-md border-b-4 border-stanford-cardinal overflow-hidden">
                  <div className="w-full md:w-1/3 bg-gray-200 min-h-[400px] flex items-center justify-center text-gray-500 font-sans tracking-widest uppercase text-sm">
                    {pi.name.charAt(0)}
                  </div>
                  <div className="w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
                    <h3 className="text-4xl font-serif font-bold text-stanford-black mb-2">{pi.name}</h3>
                    <p className="text-stanford-cardinal font-sans font-semibold tracking-wide uppercase text-sm mb-6">{pi.designation}</p>
                    <p className="text-stanford-coolGrey font-sans text-lg leading-relaxed mb-8 whitespace-pre-wrap">{pi.bio || 'Leading research in Biosensing, Micro/Nanotechnology, Point-of-Care Diagnostics, and Artificial Intelligence.'}</p>
                    {pi.email && (
                      <a href={`mailto:${pi.email}`} className="inline-flex items-center text-stanford-cardinal hover:underline font-bold font-sans">
                        <Mail className="w-5 h-5 mr-2" /> {pi.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Researchers */}
        {researchers.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-semibold text-stanford-black mb-8 border-b border-gray-300 pb-4">Researchers & Scholars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchers.map((r, idx) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white shadow-sm border-t-4 border-transparent hover:border-stanford-cardinal transition-all duration-300 p-8 flex flex-col group">
                  <h3 className="text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors mb-1">{r.name}</h3>
                  <p className="text-sm text-stanford-coolGrey font-sans uppercase tracking-widest font-semibold mb-6">{r.designation}</p>
                  
                  {r.project_title ? (
                    <div className="mb-6 flex-grow">
                      <div className="text-xs text-stanford-cardinal font-bold uppercase tracking-widest mb-2 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" /> Project
                      </div>
                      <p className="text-lg font-serif text-stanford-black leading-snug">{r.project_title}</p>
                    </div>
                  ) : (
                    <div className="mb-6 flex-grow text-stanford-coolGrey font-sans">
                      {r.bio}
                    </div>
                  )}

                  {r.email && (
                    <a href={`mailto:${r.email}`} className="inline-flex items-center text-sm font-sans font-bold text-stanford-coolGrey hover:text-stanford-cardinal mt-auto">
                      <Mail className="w-4 h-4 mr-2" /> {r.email}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
