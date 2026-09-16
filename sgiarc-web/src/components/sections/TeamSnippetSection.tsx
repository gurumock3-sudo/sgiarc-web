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
    <section className="section bg-stanford-black text-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="md:w-2/3">
            <div className="text-stanford-cardinal font-bold font-sans tracking-widest uppercase text-sm mb-4">Leadership</div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">{title || 'Research Team & Scholars'}</h2>
            <div className="w-16 h-1 bg-stanford-cardinal mb-6"></div>
            <p className="text-stanford-coolGrey font-sans font-light text-xl max-w-2xl">
              {subtitle || 'Our doctorate research team leading funded labs, doctoral supervision, and student innovation teams.'}
            </p>
          </div>
          <Link to="/team" className="hidden md:inline-flex text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm items-center hover:underline mt-8">
            View All Members <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {team.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 border border-white/10 p-8 text-center hover:bg-white/10 transition-colors group"
            >
              <div className="w-24 h-24 mx-auto bg-gray-200 mb-6 flex items-center justify-center font-sans tracking-widest uppercase text-gray-500 font-bold group-hover:scale-105 transition-transform duration-300">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{member.name}</h3>
              <p className="text-stanford-cardinal text-xs uppercase tracking-widest font-sans font-bold">{member.designation}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Link to="/team" className="btn btn-primary">Browse All Team Members</Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSnippetSection;
