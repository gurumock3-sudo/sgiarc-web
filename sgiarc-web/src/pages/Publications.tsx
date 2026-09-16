import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi: string;
  pdf_url: string;
}

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPubs = async () => {
      const { data } = await supabase
        .from('publications')
        .select('*')
        .eq('is_published', true)
        .order('year', { ascending: false });
      if (data) setPublications(data);
      setLoading(false);
    };
    fetchPubs();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-20 flex items-center justify-center"><div className="animate-pulse w-12 h-12 bg-stanford-cardinal rounded-full"></div></div>;
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container px-4 md:px-12 lg:px-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stanford-black mb-6">Publications</h1>
          <div className="w-24 h-1 bg-stanford-cardinal mb-12"></div>
          <p className="text-xl text-stanford-coolGrey font-sans font-light max-w-4xl mb-16">
            Peer-reviewed research, journal articles, and conference proceedings from the BioMID Lab and SGIARC collaborators.
          </p>
        </motion.div>

        <div className="space-y-12">
          {publications.map((pub, idx) => (
            <motion.div 
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="border-l-4 border-stanford-cardinal pl-6 md:pl-10 py-2 group"
            >
              <h2 className="text-2xl font-serif font-semibold text-stanford-black group-hover:text-stanford-cardinal transition-colors mb-3">
                {pub.title}
              </h2>
              <p className="text-lg text-stanford-coolGrey font-sans mb-2">
                {pub.authors}
              </p>
              <p className="text-sm font-sans font-bold text-stanford-black uppercase tracking-wider mb-4">
                {pub.venue} • {pub.year}
              </p>
              
              <div className="flex gap-4">
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="text-sm font-sans font-bold text-stanford-cardinal hover:underline flex items-center">
                    View DOI <span className="ml-1">↗</span>
                  </a>
                )}
                {pub.pdf_url && (
                  <a href={pub.pdf_url} target="_blank" rel="noreferrer" className="text-sm font-sans font-bold text-stanford-cardinal hover:underline flex items-center">
                    Download PDF <span className="ml-1">↓</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          {publications.length === 0 && (
            <p className="text-lg text-stanford-coolGrey italic">No publications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;
