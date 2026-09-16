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
    <div className="w-full">
      <div className="bg-brand-lavender/30 py-12 border-b border-gray-200">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-2">Research Team</h1>
          <p className="text-brand-navy font-semibold">The minds behind BioMID Lab</p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-12">
        {/* Principal Investigator */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold mb-6 border-b-2 border-brand-accent pb-2 inline-block">Principal Investigator</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {pis.map((pi) => (
              <motion.div key={pi.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="w-full md:w-1/3 bg-gray-100 min-h-[300px] flex items-center justify-center text-gray-400">
                  <span className="text-sm">Photo</span>
                </div>
                <div className="w-full md:w-2/3 p-8">
                  <h3 className="text-3xl font-heading font-bold text-brand-charcoal mb-2">{pi.name}</h3>
                  <p className="text-brand-accent font-semibold mb-4 text-lg">{pi.designation}</p>
                  <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">{pi.bio}</p>
                  <a href={`mailto:${pi.email}`} className="inline-flex items-center text-brand-navy hover:text-brand-accent font-medium">
                    <Mail className="w-4 h-4 mr-2" /> {pi.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Researchers */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-6 border-b-2 border-brand-accent pb-2 inline-block">Researchers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchers.map((r, idx) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
                <div className="flex items-start mb-4">
                   <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0 mr-4 flex items-center justify-center text-xs text-gray-500">Photo</div>
                   <div>
                     <h3 className="text-xl font-heading font-bold text-brand-charcoal">{r.name}</h3>
                     <p className="text-sm text-gray-500 font-semibold">{r.designation}</p>
                   </div>
                </div>
                {r.project_title && (
                  <div className="mt-2 mb-4 bg-brand-ivory p-3 rounded border border-gray-50 flex-grow">
                    <div className="text-xs text-brand-navy font-bold uppercase tracking-wider mb-1 flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" /> Project
                    </div>
                    <p className="text-sm font-semibold text-brand-charcoal">{r.project_title}</p>
                  </div>
                )}
                {r.email && (
                  <a href={`mailto:${r.email}`} className="inline-flex items-center text-sm text-gray-600 hover:text-brand-navy mt-auto">
                    <Mail className="w-3 h-3 mr-1" /> {r.email}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
