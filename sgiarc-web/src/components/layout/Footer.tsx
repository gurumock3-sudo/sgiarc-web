import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stanford-cardinal text-white pt-24 pb-12 font-sans">
      <div className="container px-4 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:w-1/3">
            <h2 className="text-4xl font-serif font-bold mb-4 tracking-tight">SGIARC</h2>
            <h3 className="text-sm font-bold uppercase mb-6 tracking-widest text-white/90">
              Shri Sant Gajanan Maharaj College of Engineering
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm font-light">
              Fostering multidisciplinary research, BioMID, IoT, Renewable Energy, Patents & Industry Collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/90">
              <li><Link to="/about" className="hover:underline">About BioMID</Link></li>
              <li><Link to="/research-areas" className="hover:underline">Research Areas</Link></li>
              <li><Link to="/projects" className="hover:underline">Funded Projects</Link></li>
              <li><Link to="/publications" className="hover:underline">Publications</Link></li>
              <li><Link to="/team" className="hover:underline">Team Members</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:w-1/3">
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start space-x-3">
                <MapPin className="text-white shrink-0" size={20} />
                <span className="leading-relaxed">
                  SGIARC Research Wing<br />
                  SSGMCE Campus, Shegaon<br />
                  Maharashtra 444503
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-white shrink-0" size={20} />
                <a href="mailto:sgiarc@ssgmce.ac.in" className="hover:underline">sgiarc@ssgmce.ac.in</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-white shrink-0" size={20} />
                <span>+91-7265-252478</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/70">
          <p>© {new Date().getFullYear()} SGIARC | SSGMCE. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.ssgmce.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
              SSGMCE Home
            </a>
            <Link to="/contact" className="hover:text-white hover:underline transition-colors">Campus Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
