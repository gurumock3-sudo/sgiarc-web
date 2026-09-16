import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, CheckCircle, XCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  is_published: boolean;
}

const PublicationsManager: React.FC = () => {
  const [pubs, setPubs] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPub, setCurrentPub] = useState<Partial<Publication>>({});

  const fetchPubs = async () => {
    setLoading(true);
    const { data } = await supabase.from('publications').select('*').order('year', { ascending: false });
    if (data) setPubs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPubs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPub.id) {
      const { error } = await supabase.from('publications').update(currentPub).eq('id', currentPub.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('publications').insert([currentPub]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }
    setIsEditing(false);
    fetchPubs();
  };

  const togglePublish = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase.from('publications').update({ is_published: !currentStatus }).eq('id', id);
    if (!error) {
      toast.success(currentStatus ? 'Unpublished' : 'Published');
      fetchPubs();
    }
  };

  const deletePub = async (id: number) => {
    if(confirm('Are you sure you want to delete this publication?')) {
      const { error } = await supabase.from('publications').delete().eq('id', id);
      if (!error) {
        toast.success('Deleted');
        fetchPubs();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-gray-800">Publications Management</h1>
        <button onClick={() => { setCurrentPub({ is_published: false, year: new Date().getFullYear() }); setIsEditing(true); }} className="btn btn-navy flex items-center">
          <Plus size={18} className="mr-2" /> Add Publication
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-4">{currentPub.id ? 'Edit' : 'New'} Publication</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Title</label>
              <input type="text" className="w-full border p-2 rounded" required value={currentPub.title || ''} onChange={e => setCurrentPub({...currentPub, title: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold">Authors</label>
              <input type="text" className="w-full border p-2 rounded" required value={currentPub.authors || ''} onChange={e => setCurrentPub({...currentPub, authors: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold">Venue (Journal/Conference)</label>
                <input type="text" className="w-full border p-2 rounded" value={currentPub.venue || ''} onChange={e => setCurrentPub({...currentPub, venue: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold">Year</label>
                <input type="number" className="w-full border p-2 rounded" value={currentPub.year || ''} onChange={e => setCurrentPub({...currentPub, year: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn bg-gray-200 text-gray-800">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Title</th>
              <th className="p-4 font-semibold text-gray-600">Authors</th>
              <th className="p-4 font-semibold text-gray-600">Year</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pubs.map(pub => (
              <tr key={pub.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{pub.title}</td>
                <td className="p-4 text-gray-600 text-sm">{pub.authors}</td>
                <td className="p-4 text-gray-600">{pub.year}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${pub.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {pub.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => togglePublish(pub.id, pub.is_published)} className="text-gray-500 hover:text-brand-navy" title={pub.is_published ? 'Unpublish' : 'Publish'}>
                    {pub.is_published ? <XCircle size={18} /> : <CheckCircle size={18} />}
                  </button>
                  <button onClick={() => { setCurrentPub(pub); setIsEditing(true); }} className="text-gray-500 hover:text-blue-600"><Edit2 size={18} /></button>
                  <button onClick={() => deletePub(pub.id)} className="text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {pubs.length === 0 && !loading && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No publications found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicationsManager;
