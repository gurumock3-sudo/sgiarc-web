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

const Header: React.FC<{ isHome?: boolean }> = ({ isHome = false }) => {
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
      {/* Top Bar for SSGMCE */}
      <div className="hidden md:block bg-brand-charcoal text-white text-xs py-2 px-8 z-50 fixed w-full top-0 h-10">
        <div className="container flex justify-between items-center h-full">
          <span>Shri Gajanan Innovation & Advanced Research Center (SGIARC)</span>
          <span>Shri Sant Gajanan Maharaj College of Engineering, Shegaon</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          'fixed w-full z-40 transition-all duration-300 md:top-10',
          isScrolled
            ? 'bg-white shadow-md py-2'
            : isHome
              ? 'bg-transparent py-6'
              : 'bg-white py-4 shadow-sm'
        )}
      >
        <div className="container flex items-center justify-between px-4 md:px-8">
          {/* Logo / Brand */}
          <Link to="/" className="flex flex-col group">
            <span className={cn("text-xl md:text-2xl font-heading font-bold transition-colors", 
              (isHome && !isScrolled) ? "text-white group-hover:text-brand-lavender" : "text-brand-navy"
            )}>
              BioMID Lab
            </span>
            <span className={cn("text-[0.65rem] md:text-xs uppercase font-semibold transition-colors",
              (isHome && !isScrolled) ? "text-brand-lavender" : "text-brand-accent"
            )}>
              Biosensing, Microsystems & Intelligent Diagnostics
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                {link.dropdown ? (
                  <div className={cn("px-4 py-2 font-semibold flex items-center cursor-pointer transition-colors",
                    (isHome && !isScrolled) ? "text-white hover:text-brand-lavender" : "text-brand-charcoal hover:text-brand-navy"
                  )}>
                    {link.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                ) : (
                  link.is_external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'px-4 py-2 font-semibold block transition-colors',
                        (isHome && !isScrolled) ? "text-white hover:text-brand-lavender" : "text-brand-charcoal hover:text-brand-navy"
                      )}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        'px-4 py-2 font-semibold block transition-colors',
                        location.pathname === link.path && (!isHome || isScrolled)
                          ? 'text-brand-navy border-b-2 border-brand-navy'
                          : location.pathname === link.path && isHome && !isScrolled
                          ? 'text-white border-b-2 border-white'
                          : (isHome && !isScrolled) ? "text-gray-200 hover:text-white" : "text-brand-charcoal hover:text-brand-navy"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-0 w-56 bg-white border border-gray-100 shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {link.dropdown.map((drop) => (
                        drop.is_external ? (
                          <a
                            key={drop.id}
                            href={drop.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-lavender/30 hover:text-brand-navy"
                          >
                            {drop.label}
                          </a>
                        ) : (
                          <Link
                            key={drop.id}
                            to={drop.path}
                            className="block px-4 py-2 text-sm text-brand-charcoal hover:bg-brand-lavender/30 hover:text-brand-navy"
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
            className={cn("md:hidden p-2 transition-colors", (isHome && !isScrolled) ? "text-white" : "text-brand-charcoal")}
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
