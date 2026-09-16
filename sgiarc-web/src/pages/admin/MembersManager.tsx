import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Member {
  id: string;
  name: string;
  designation: string;
  category: string;
  is_active: boolean;
}

const MembersManager: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const fetchMembers = async () => {
    const { data } = await supabase.from('members').select('*').order('sort_order');
    if (data) setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const deleteMember = async (id: string) => {
    if (confirm('Delete this member?')) {
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (!error) {
        toast.success('Deleted');
        fetchMembers();
      } else toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-gray-800">Members</h1>
        <button className="btn btn-navy flex items-center">
          <Plus size={18} className="mr-2" /> Add Member
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Designation</th>
              <th className="p-4 font-semibold text-gray-600">Category</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{m.name}</td>
                <td className="p-4 text-gray-600">{m.designation}</td>
                <td className="p-4 text-gray-600">{m.category}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-gray-500 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => deleteMember(m.id)} className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersManager;
