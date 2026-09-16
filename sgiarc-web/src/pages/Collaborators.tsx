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
    <motion.div key={c.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className="p-6 bg-white rounded border border-gray-100 shadow-sm flex flex-col h-full">
      <h3 className="font-heading font-bold text-lg text-brand-charcoal mb-1">{c.name}</h3>
      <p className="text-sm font-semibold text-brand-navy mb-3 flex items-start">
        <MapPin className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
        <span>{c.institution} ({c.country})</span>
      </p>
      <div className="mt-auto">
        <div className="text-xs uppercase text-gray-500 font-bold mb-1">Core Expertise</div>
        <p className="text-sm text-gray-700 bg-brand-ivory p-2 rounded">{c.expertise}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full">
      <div className="bg-brand-lavender/30 py-12 border-b border-gray-200">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-2">Collaboration</h1>
          <p className="text-brand-navy font-semibold">Global & National Research Partnerships</p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-12 space-y-12">
        <div>
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center border-b border-gray-200 pb-2">
            <Globe className="w-6 h-6 mr-2 text-brand-accent" /> International Collaborators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {intl.map((c, i) => renderCollab(c, i))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-heading font-bold mb-6 flex items-center border-b border-gray-200 pb-2">
            <MapPin className="w-6 h-6 mr-2 text-brand-accent" /> National Collaborators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {national.map((c, i) => renderCollab(c, i))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;
