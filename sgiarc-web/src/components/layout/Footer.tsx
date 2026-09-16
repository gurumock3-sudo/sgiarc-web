import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold mb-2">SGIARC</h2>
            <h3 className="text-sm font-semibold text-brand-accent uppercase mb-4">
              Center for Advanced Research & Innovation
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Official Research Center of Shri Sant Gajanan Maharaj College of Engineering, Shegaon.
              Fostering multidisciplinary research, AI, IoT, Robotics, Renewable Energy, Patents & Industry Collaborations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About BioMID</Link></li>
              <li><Link to="/research-areas" className="hover:text-brand-accent transition-colors">Research Areas</Link></li>
              <li><Link to="/projects" className="hover:text-brand-accent transition-colors">Funded Projects</Link></li>
              <li><Link to="/publications" className="hover:text-brand-accent transition-colors">Publications</Link></li>
              <li><Link to="/team" className="hover:text-brand-accent transition-colors">Team Members</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">
              Contact Secretariat
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-accent shrink-0" size={18} />
                <span>
                  <strong>SSGMCE Campus:</strong><br />
                  SGIARC Research Wing, Shegaon - 444503, Dist. Buldhana, Maharashtra
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-accent shrink-0" size={18} />
                <span>
                  <strong>Email:</strong> <a href="mailto:sgiarc@ssgmce.ac.in" className="hover:text-white transition-colors">sgiarc@ssgmce.ac.in</a>
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-accent shrink-0" size={18} />
                <span>
                  <strong>Helpline:</strong> +91-7265-252478
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} SGIARC | Shri Sant Gajanan Maharaj College of Engineering, Shegaon. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.ssgmce.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              SSGMCE Ecosystem
            </a>
            <Link to="/contact" className="hover:text-white transition-colors">Campus Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
