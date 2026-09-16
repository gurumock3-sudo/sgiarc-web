import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

interface Member {
  id: string;
  name: string;
  designation: string;
}

const TeamSnippetSection: React.FC<{ title?: string, subtitle?: string }> = ({ title, subtitle }) => {
  const [team, setTeam] = useState<Member[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase.from('members').select('id, name, designation').eq('is_active', true).order('sort_order').limit(4);
      if (data) setTeam(data);
    };
    fetchTeam();
  }, []);

  return (
    <section className="section bg-brand-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-brand-lavender to-brand-navy"></div>
      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-white/10 text-brand-lavender rounded-full text-sm font-semibold mb-3 tracking-wider">Team</div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{title || 'Research Team & Mentors'}</h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            {subtitle || 'Our doctorate research team leading funded labs, doctoral supervision, and student innovation teams.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {team.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full mb-4 overflow-hidden shadow-lg border-2 border-brand-accent/50 flex items-center justify-center text-xs text-gray-300">
                Photo
              </div>
              <h3 className="text-lg font-heading font-bold mb-1">{member.name}</h3>
              <p className="text-brand-accent text-sm font-semibold">{member.designation}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/team" className="btn bg-brand-accent text-brand-charcoal hover:bg-white transition-colors">Browse All Team Members</Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSnippetSection;
