import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stanford-cardinalDark text-white pt-16 pb-8 font-sans relative overflow-hidden">
      <div className="container px-4 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">
          {/* Multi-column Links (Left) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-2/3">
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Schools</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Business</a></li>
                <li><a href="#" className="hover:underline">Education</a></li>
                <li><a href="#" className="hover:underline">Engineering</a></li>
                <li><a href="#" className="hover:underline">Humanities & Sciences</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Research</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><Link to="/research-areas" className="hover:underline">Centers & Institutes</Link></li>
                <li><Link to="/projects" className="hover:underline">Funded Projects</Link></li>
                <li><Link to="/publications" className="hover:underline">Publications</Link></li>
                <li><Link to="/team" className="hover:underline">Our Team</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Health Care</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><a href="#" className="hover:underline">Stanford Medicine</a></li>
                <li><a href="#" className="hover:underline">Stanford Health Care</a></li>
                <li><a href="#" className="hover:underline">Children's Health</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">About</h4>
              <ul className="space-y-3 text-sm text-white/90">
                <li><Link to="/about" className="hover:underline">Our Heritage</Link></li>
                <li><a href="#" className="hover:underline">Campus Map</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Large Logo (Right) */}
          <div className="w-full lg:w-1/3 flex lg:justify-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">Stanford<br/>University</h2>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/70">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white hover:underline">Stanford Home</a>
            <a href="#" className="hover:text-white hover:underline">Maps & Directions</a>
            <a href="#" className="hover:text-white hover:underline">Search Stanford</a>
            <a href="#" className="hover:text-white hover:underline">Emergency Info</a>
          </div>
          <p>© {new Date().getFullYear()} Stanford University. All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Stanford Footer Circular Flourish */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[60%] flex space-x-4 opacity-10 pointer-events-none">
        <div className="w-[40vw] h-[40vw] rounded-full bg-black"></div>
        <div className="w-[40vw] h-[40vw] rounded-full bg-black"></div>
        <div className="w-[40vw] h-[40vw] rounded-full bg-black"></div>
      </div>
    </footer>
  );
};

export default Footer;
