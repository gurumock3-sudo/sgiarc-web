import React from 'react';
import { motion } from 'framer-motion';
import { Mail, BookOpen, User, ExternalLink } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/sgiarcContent';

const Team: React.FC = () => {
  const pis = TEAM_MEMBERS.filter(m => m.category === 'PI');
  const researchers = TEAM_MEMBERS.filter(m => m.category === 'Researcher');

  return (
    <div className="w-full pt-28 pb-32 bg-white min-h-screen font-sans text-stanford-black">
      {/* Header Banner */}
      <div className="bg-stanford-cardinal text-white py-16 px-4 md:px-12 lg:px-24 mb-16">
        <div className="container max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-white"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">People & Innovators</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">
            BioMID Research Team
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
            Interdisciplinary scientists, doctoral scholars, and student researchers driving applied breakthrough technologies at Shri Sant Gajanan Maharaj College of Engineering, Shegaon.
          </p>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        {/* Principal Investigator Section */}
        {pis.map((pi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 bg-stanford-lightGrey border-t-8 border-stanford-cardinal shadow-sm p-8 md:p-14"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Photo / Avatar Placeholder */}
              <div className="w-full lg:w-72 shrink-0">
                <div className="aspect-[4/5] bg-stanford-cardinal/10 border border-stanford-cardinal/20 flex flex-col items-center justify-center text-center p-6 rounded-t-[6rem]">
                  <div className="w-24 h-24 rounded-full bg-stanford-cardinal text-white flex items-center justify-center font-serif text-3xl font-bold mb-4 shadow-lg">
                    MB
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stanford-black">{pi.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-stanford-cardinal font-bold mt-1">Associate Professor & PI</p>
                  <p className="text-xs text-stanford-coolGrey mt-2">Ph.D. BITS Pilani | Postdoc Technion, Israel</p>
                </div>
                
                {pi.contact && (
                  <div className="mt-4 text-center">
                    <a 
                      href={`mailto:${pi.contact}`} 
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-stanford-cardinal hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1.5" /> {pi.contact}
                    </a>
                  </div>
                )}
              </div>

              {/* Bio Details */}
              <div className="flex-1">
                <div className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-stanford-cardinal mb-2">
                  Laboratory Leadership
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stanford-black mb-4">
                  {pi.name}
                </h2>
                <p className="text-base font-semibold text-stanford-coolGrey uppercase tracking-wider mb-6">
                  Principal Investigator, BioMID Lab • Shri Sant Gajanan Maharaj College of Engineering, Shegaon
                </p>

                <div className="prose prose-lg text-stanford-coolGrey font-light leading-relaxed mb-8 space-y-4">
                  <p>{pi.bio}</p>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-300/80">
                  <a 
                    href="https://scholar.google.com/citations?user=VBox-vcAAAAJ&hl=en" 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-primary rounded-none uppercase font-bold text-xs px-6 py-3"
                  >
                    Google Scholar Profile (70+ Works) <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                  <a 
                    href={`mailto:${pi.contact}`} 
                    className="btn btn-outline rounded-none uppercase font-bold text-xs px-6 py-3"
                  >
                    Contact Principal Investigator
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Researchers & Student Scholars */}
        <div className="mb-12">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stanford-black mb-3">
              Research Scholars & Project Fellows
            </h2>
            <div className="w-16 h-1 bg-stanford-cardinal mb-4"></div>
            <p className="text-stanford-coolGrey font-sans text-lg max-w-2xl">
              Student researchers leading specialized AI, healthcare diagnostic, and biosensing initiatives within the center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchers.map((r, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="bg-stanford-lightGrey border-l-4 border-stanford-cardinal p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-xs uppercase tracking-widest font-bold text-stanford-coolGrey mt-1">
                        Research Scholar • BioMID Lab
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-stanford-cardinal shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                  </div>

                  {r.projectName && (
                    <div className="mb-4 bg-white p-4 border border-gray-200">
                      <div className="text-xs font-bold uppercase tracking-wider text-stanford-cardinal mb-1 flex items-center">
                        <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Project Investigation
                      </div>
                      <h4 className="font-serif font-bold text-lg text-stanford-black leading-snug">
                        {r.projectName.replace(/^"/, '').replace(/"$/, '')}
                      </h4>
                    </div>
                  )}

                  {r.projectDescription && (
                    <p className="text-stanford-coolGrey font-sans text-sm leading-relaxed mb-6">
                      {r.projectDescription.replace(/^"/, '').replace(/"$/, '')}
                    </p>
                  )}
                </div>

                {r.contact && (
                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between text-xs font-bold font-sans">
                    <span className="text-stanford-coolGrey uppercase tracking-wider">Direct Institutional Contact:</span>
                    <a 
                      href={`mailto:${r.contact}`}
                      className="text-stanford-cardinal hover:underline inline-flex items-center"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1" /> {r.contact}
                    </a>
                  </div>
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
