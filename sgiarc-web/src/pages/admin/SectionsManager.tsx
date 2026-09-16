import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowUp, ArrowDown } from 'lucide-react';
import toast from 'react-hot-toast';

interface Section {
  id: number;
  name: string;
  component_name: string;
  sort_order: number;
  is_active: boolean;
}

const SectionsManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);

  const fetchSections = async () => {
    const { data } = await supabase.from('site_sections').select('*').order('sort_order');
    if (data) setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const move = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sections.length - 1)) return;
    
    const newSections = [...sections];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap sort_order
    const tempOrder = newSections[index].sort_order;
    newSections[index].sort_order = newSections[swapIndex].sort_order;
    newSections[swapIndex].sort_order = tempOrder;

    // Swap in array for immediate UI update
    const temp = newSections[index];
    newSections[index] = newSections[swapIndex];
    newSections[swapIndex] = temp;
    
    setSections(newSections);

    // Persist to DB
    await supabase.from('site_sections').upsert([
      { id: newSections[index].id, sort_order: newSections[index].sort_order },
      { id: newSections[swapIndex].id, sort_order: newSections[swapIndex].sort_order }
    ]);
    toast.success('Order updated');
  };

  const toggleVisibility = async (id: number, current: boolean) => {
    const { error } = await supabase.from('site_sections').update({ is_active: !current }).eq('id', id);
    if (!error) {
      toast.success(current ? 'Section hidden' : 'Section visible');
      fetchSections();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-800 mb-6">Homepage Sections</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div>
              <p className="font-bold text-brand-charcoal">{sec.name}</p>
              <p className="text-sm text-gray-500 font-mono">{sec.component_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => toggleVisibility(sec.id, sec.is_active)}
                className={`px-3 py-1 rounded text-xs font-bold ${sec.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
              >
                {sec.is_active ? 'Visible' : 'Hidden'}
              </button>
              <div className="flex flex-col space-y-1">
                <button onClick={() => move(idx, 'up')} disabled={idx === 0} className="p-1 text-gray-400 hover:text-brand-navy disabled:opacity-30"><ArrowUp size={16} /></button>
                <button onClick={() => move(idx, 'down')} disabled={idx === sections.length - 1} className="p-1 text-gray-400 hover:text-brand-navy disabled:opacity-30"><ArrowDown size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsManager;
