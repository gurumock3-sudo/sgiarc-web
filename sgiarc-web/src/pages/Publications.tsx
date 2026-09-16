import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Award, BookOpen, Filter } from 'lucide-react';
import allPublications from '../data/scholar_publications.json';

interface Publication {
  title: string;
  link: string;
  authors: string;
  venue: string;
  citations: string;
  year: string;
}

const Publications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  const publications: Publication[] = allPublications as Publication[];

  // Compute available years
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    publications.forEach(p => {
      if (p.year) yearsSet.add(p.year);
    });
    return ['All', ...Array.from(yearsSet).sort((a, b) => parseInt(b) - parseInt(a))];
  }, [publications]);

  // Compute total citations
  const totalCitations = useMemo(() => {
    return publications.reduce((acc, p) => {
      const c = parseInt(p.citations) || 0;
      return acc + c;
    }, 0);
  }, [publications]);

  // Filtered publications
  const filteredPubs = useMemo(() => {
    return publications.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || p.year === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [publications, searchQuery, selectedYear]);

  return (
    <div className="pt-24 pb-32 bg-white min-h-screen font-sans text-stanford-black">
      {/* Header Banner */}
      <div className="bg-stanford-cardinal text-white py-16 px-4 md:px-12 lg:px-24 mb-12">
        <div className="container max-w-[1400px] mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-block w-8 h-[2px] bg-white"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">BioMID Research Repository</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 text-white">
            Scholarly Publications
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-3xl leading-relaxed mb-8">
            Complete indexed record of peer-reviewed articles, books, and conference proceedings authored by Dr. Manish Bhaiyya and the BioMID Lab research group at Shri Sant Gajanan Maharaj College of Engineering, Shegaon.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold">{publications.length}</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-semibold mt-1">Total Publications</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold">{totalCitations.toLocaleString()}+</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-semibold mt-1">Citations Count</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif font-bold">2008–2026</div>
              <div className="text-xs uppercase tracking-wider text-white/80 font-semibold mt-1">Publication Span</div>
            </div>
            <div>
              <a 
                href="https://scholar.google.com/citations?user=VBox-vcAAAAJ&hl=en" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-wider font-bold text-white hover:text-white/80 transition-colors mt-2"
              >
                Google Scholar Profile <ExternalLink className="ml-1 w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24">
        {/* Search & Year Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 mb-12 pb-8 border-b border-gray-200">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stanford-coolGrey w-5 h-5" />
            <input 
              type="text"
              placeholder="Search 70+ papers by title, author, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-stanford-cardinal text-sm font-sans placeholder-gray-400 shadow-sm"
            />
          </div>

          {/* Year Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-stanford-coolGrey shrink-0 mr-1" />
            {availableYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-none transition-all ${
                  selectedYear === yr 
                    ? 'bg-stanford-cardinal text-white shadow' 
                    : 'bg-stanford-lightGrey text-stanford-coolGrey hover:bg-gray-200'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-stanford-coolGrey">
            Showing <span className="text-stanford-cardinal">{filteredPubs.length}</span> of {publications.length} Publications
          </p>
          {selectedYear !== 'All' && (
            <button 
              onClick={() => setSelectedYear('All')} 
              className="text-xs text-stanford-cardinal font-bold uppercase hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Publications List */}
        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {filteredPubs.map((pub, idx) => (
              <motion.article 
                key={pub.link || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.02, 0.3) }}
                className="py-8 group hover:bg-gray-50/70 transition-colors px-4 -mx-4 border-l-4 border-transparent hover:border-stanford-cardinal"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug">
                      <a 
                        href={pub.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:underline flex items-start"
                      >
                        <span>{pub.title}</span>
                        <ExternalLink className="ml-2 w-4 h-4 shrink-0 text-stanford-cardinal opacity-0 group-hover:opacity-100 transition-opacity mt-1.5" />
                      </a>
                    </h2>
                  </div>

                  {/* Year & Citations Badge */}
                  <div className="flex items-center space-x-3 shrink-0">
                    {pub.citations && parseInt(pub.citations) > 0 && (
                      <span className="inline-flex items-center text-xs font-bold font-sans bg-amber-50 text-amber-800 border border-amber-300/80 px-2.5 py-1 rounded">
                        <Award className="w-3.5 h-3.5 mr-1 text-amber-600" />
                        {pub.citations} citations
                      </span>
                    )}
                    {pub.year && (
                      <span className="text-xs font-bold font-sans bg-stanford-lightGrey text-stanford-black px-2.5 py-1 uppercase tracking-wider">
                        {pub.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Authors */}
                <p className="text-base text-stanford-coolGrey font-sans mb-2 font-medium">
                  {pub.authors}
                </p>

                {/* Journal / Venue */}
                {pub.venue && (
                  <p className="text-sm font-sans italic text-stanford-black/80 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5 shrink-0 text-stanford-cardinal" />
                    {pub.venue}
                  </p>
                )}

                {/* Action Link */}
                <div className="mt-4 pt-3 flex items-center space-x-6 text-xs font-bold font-sans uppercase tracking-wider">
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-stanford-cardinal hover:underline inline-flex items-center"
                  >
                    View on Google Scholar <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filteredPubs.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl font-serif text-stanford-coolGrey mb-4">No publications matching your search criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedYear('All'); }}
                className="btn btn-primary rounded-none uppercase font-bold text-xs px-6 py-2.5"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;
