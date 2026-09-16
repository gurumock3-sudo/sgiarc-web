import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
