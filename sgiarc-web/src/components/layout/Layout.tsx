import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-ivory">
      <Header isHome={isHome} />
      <main className={`flex-grow ${isHome ? '' : 'pt-32'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
