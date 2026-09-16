import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';

interface NavItem {
  id: number;
  label: string;
  path: string;
  parent_id: number | null;
  sort_order: number;
  is_external: boolean;
  dropdown?: NavItem[];
}

const Header: React.FC<{ isHome?: boolean }> = ({ isHome: _isHome = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchNav = async () => {
      const { data, error } = await supabase
        .from('navigation')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (data && !error) {
        // Build hierarchy
        const parents = data.filter(item => item.parent_id === null) as NavItem[];
        const children = data.filter(item => item.parent_id !== null) as NavItem[];

        const nestedNav = parents.map(parent => ({
          ...parent,
          dropdown: children.filter(child => child.parent_id === parent.id).length > 0
            ? children.filter(child => child.parent_id === parent.id).sort((a, b) => a.sort_order - b.sort_order)
            : undefined
        }));

        setNavLinks(nestedNav);
      }
    };
    
    fetchNav();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Utility Top Bar (Stanford Cardinal) */}
      <div className="hidden md:flex justify-between items-center px-4 md:px-12 lg:px-24 h-10 bg-stanford-cardinal text-white text-xs font-sans tracking-wide">
        <div>SGIARC | Sant Gajanan Maharaj College of Engineering</div>
        <div className="flex space-x-6">
          <Link to="/contact" className="hover:underline">Contact Us</Link>
          <a href="https://ssgmce.ac.in" target="_blank" rel="noreferrer" className="hover:underline">SSGMCE Campus</a>
        </div>
      </div>

      <header
        className={cn(
          'fixed w-full z-40 transition-all duration-300',
          isScrolled ? 'md:top-0 bg-white shadow-lg py-2' : 'md:top-10 bg-white py-4 border-b border-gray-100 shadow-sm'
        )}
      >
        <div className="container flex items-center justify-between px-4 md:px-12 lg:px-24">
          {/* Logo / Brand */}
          <Link to="/" className="flex flex-col group">
            <span className="text-2xl md:text-3xl font-serif font-bold text-stanford-cardinal tracking-tight transition-colors">
              BioMID Lab
            </span>
            <span className="text-[0.65rem] md:text-xs uppercase font-sans font-semibold text-stanford-coolGrey tracking-widest mt-1">
              Biosensing & Intelligent Diagnostics
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                {link.dropdown ? (
                  <div className="px-3 py-2 font-sans font-semibold text-stanford-black flex items-center cursor-pointer transition-colors hover:text-stanford-cardinal">
                    {link.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                ) : (
                  link.is_external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 font-sans font-semibold block transition-colors text-stanford-black hover:text-stanford-cardinal"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        'px-3 py-2 font-sans font-semibold block transition-colors',
                        location.pathname === link.path 
                          ? 'text-stanford-cardinal' 
                          : 'text-stanford-black hover:text-stanford-cardinal'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-0 w-64 bg-white border-t-2 border-stanford-cardinal shadow-xl rounded-b opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-3">
                      {link.dropdown.map((drop) => (
                        drop.is_external ? (
                          <a
                            key={drop.id}
                            href={drop.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-6 py-2 text-sm font-sans text-stanford-coolGrey hover:text-stanford-cardinal hover:bg-gray-50 transition-colors"
                          >
                            {drop.label}
                          </a>
                        ) : (
                          <Link
                            key={drop.id}
                            to={drop.path}
                            className="block px-6 py-2 text-sm font-sans text-stanford-coolGrey hover:text-stanford-cardinal hover:bg-gray-50 transition-colors"
                          >
                            {drop.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stanford-black transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={cn(
            'absolute right-0 top-0 bottom-0 w-64 bg-brand-charcoal text-white transform transition-transform duration-300 shadow-2xl',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <span className="font-heading font-bold text-lg">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col py-4 overflow-y-auto max-h-screen pb-20">
            {navLinks.map((link) => (
              <div key={link.id}>
                {link.dropdown ? (
                  <div className="px-6 py-2 font-semibold text-gray-300">
                    {link.label}
                    <div className="pl-4 mt-2 flex flex-col space-y-2 border-l border-gray-700">
                      {link.dropdown.map((drop) => (
                         drop.is_external ? (
                          <a
                            key={drop.id}
                            href={drop.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {drop.label}
                          </a>
                        ) : (
                          <Link
                            key={drop.id}
                            to={drop.path}
                            className="text-sm text-gray-400 hover:text-white block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {drop.label}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  link.is_external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="block px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
