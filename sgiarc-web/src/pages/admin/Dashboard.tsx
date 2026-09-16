import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, FileText, LayoutDashboard, Briefcase } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ members: 0, pubs: 0, projects: 0, sections: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: mCount }, { count: pCount }, { count: secCount }] = await Promise.all([
        supabase.from('members').select('*', { count: 'exact', head: true }),
        supabase.from('publications').select('*', { count: 'exact', head: true }),
        supabase.from('site_sections').select('*', { count: 'exact', head: true })
      ]);
      
      const { data: projData } = await supabase.from('members').select('project_title').not('project_title', 'is', null);

      setStats({
        members: mCount || 0,
        pubs: pCount || 0,
        sections: secCount || 0,
        projects: projData?.length || 0
      });
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Members', value: stats.members, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Publications', value: stats.pubs, icon: FileText, color: 'bg-green-100 text-green-600' },
    { label: 'Active Projects', value: stats.projects, icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Site Sections', value: stats.sections, icon: LayoutDashboard, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-full ${s.color} mr-4`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
