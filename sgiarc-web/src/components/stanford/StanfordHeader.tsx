import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const StanfordHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About SGIARC', path: '/about' },
    { name: 'Academics', path: '/research-areas' },
    { name: 'Research', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'Team', path: '/team' },
    { name: 'Admissions & Aid', path: '#' },
    { name: 'Life on Campus', path: '#' },
  ];

  return (
    <header className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-lg' : 'absolute top-0'}`}>
      {/* Top Utility Bar (Darker Red) */}
      <div className="bg-stanford-cardinalDark text-white text-[11px] font-sans font-bold tracking-widest uppercase py-2 px-4 md:px-12 lg:px-24 hidden lg:flex justify-between items-center h-10">
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">Stanford Home</Link>
          <a href="#" className="hover:underline">Maps & Directions</a>
          <a href="#" className="hover:underline">Search Stanford</a>
          <a href="#" className="hover:underline">Emergency Info</a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:underline">Students</a>
          <a href="#" className="hover:underline">Faculty/Staff</a>
          <a href="#" className="hover:underline">Alumni</a>
          <a href="#" className="hover:underline flex items-center">
            <Search className="w-3 h-3 mr-1" /> Search
          </a>
        </div>
      </div>

      {/* Main Nav Bar (Cardinal Red) */}
      <nav className="bg-stanford-cardinal w-full h-[72px] flex items-center px-4 md:px-12 lg:px-24">
        <Link to="/" className="text-white font-serif font-bold text-3xl md:text-4xl tracking-tight mr-auto">
          SGIARC University
        </Link>
        
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-white font-sans font-semibold text-[14px] hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
          <button className="text-white hover:text-white/80 p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <button 
          className="lg:hidden text-white p-2 flex items-center space-x-2 border border-white/30 rounded"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className="text-sm font-bold uppercase">Menu</span>
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-[112px] bg-stanford-cardinal z-40 p-8 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-white font-serif font-bold text-2xl border-b border-white/20 pb-4"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default StanfordHeader;
