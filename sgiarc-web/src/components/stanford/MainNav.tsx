import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'News', path: '/news' },
    { name: 'Research', path: '/research-areas' },
    { name: 'Publications', path: '/publications' },
    { name: 'Team', path: '/team' },
    { name: 'Collaboration', path: '/collaboration' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav 
        className={`w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-md py-4' 
            : 'absolute top-10 bg-transparent py-8'
        }`}
      >
        <div className="container px-4 md:px-12 lg:px-24 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className={`font-serif font-bold text-3xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-stanford-cardinal' : 'text-white'}`}>
              SGIARC
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`font-sans font-bold text-sm tracking-widest uppercase transition-colors duration-200 hover:text-stanford-cardinal ${
                  isScrolled ? 'text-stanford-black' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className={`p-2 transition-colors duration-200 hover:text-stanford-cardinal ${isScrolled ? 'text-stanford-black' : 'text-white'}`}>
              <Search className="w-5 h-5" />
            </button>
          </div>

          <button 
            className={`md:hidden p-2 ${isScrolled ? 'text-stanford-black' : 'text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="font-serif font-bold text-3xl text-stanford-black border-b border-gray-100 pb-4"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNav;
