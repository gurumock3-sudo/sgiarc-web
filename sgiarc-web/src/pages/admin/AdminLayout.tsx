import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Users, FileText, Image as ImageIcon, Settings, LogOut, FileCode } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const AdminLayout: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Publications', path: '/admin/publications', icon: FileText },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Sections', path: '/admin/sections', icon: FileCode },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <div className="w-64 bg-brand-charcoal text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-heading font-bold text-brand-lavender">SGIARC Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-brand-navy text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className="font-semibold">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-300 hover:text-white">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
