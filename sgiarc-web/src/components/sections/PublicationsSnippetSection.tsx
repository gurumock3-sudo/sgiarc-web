import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
}

const PublicationsSnippetSection: React.FC<{ title?: string }> = ({ title }) => {
  const [pubs, setPubs] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchPubs = async () => {
      const { data } = await supabase
        .from('publications')
        .select('*')
        .eq('is_published', true)
        .order('year', { ascending: false })
        .limit(3);
      if (data) setPubs(data);
    };
    fetchPubs();
  }, []);

  return (
    <section className="section bg-white border-t border-gray-100">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="section-badge">Latest Research</div>
            <h2 className="section-title mb-0">{title || 'Recent Publications'}</h2>
            <div className="divider-ssgmce mt-6"></div>
          </div>
          <Link to="/publications" className="hidden md:inline-flex text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm items-center hover:underline">
            View All Publications <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pubs.map((pub, idx) => (
            <motion.div 
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t-4 border-stanford-cardinal pt-6 group"
            >
              <h3 className="text-xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors mb-3">
                {pub.title}
              </h3>
              <p className="text-stanford-coolGrey font-sans text-sm mb-4">
                {pub.authors}
              </p>
              <p className="text-stanford-black font-sans font-bold uppercase tracking-wider text-xs">
                {pub.venue} • {pub.year}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/publications" className="btn btn-outline">
            View All Publications
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSnippetSection;
