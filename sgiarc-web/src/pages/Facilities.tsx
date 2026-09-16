import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Settings, Info } from 'lucide-react';

interface Equipment {
  id: number;
  name: string;
  make: string;
  model: string;
  details: string;
  qty: number;
}

const Facilities: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('equipment').select('*').eq('is_active', true).order('id');
      if (data) setEquipment(data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-brand-lavender/30 py-12 border-b border-gray-200">
        <div className="container px-4 md:px-8">
          <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-2">Facilities & Labs</h1>
          <p className="text-brand-navy font-semibold">State-of-the-art instrumentation and hardware.</p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipment.map((eq, idx) => (
            <motion.div key={eq.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="w-full md:w-1/3 bg-gray-100 p-6 flex items-center justify-center border-r border-gray-100">
                 <Settings className="w-12 h-12 text-gray-300" />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-xl font-heading font-bold text-brand-charcoal mb-1">{eq.name}</h3>
                <p className="text-sm text-brand-accent font-semibold mb-3">{eq.make} {eq.model && `| ${eq.model}`}</p>
                <div className="bg-brand-ivory p-3 rounded text-sm text-gray-700 flex items-start">
                  <Info className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-brand-navy" />
                  <p>{eq.details}</p>
                </div>
                <div className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Quantity: {eq.qty}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
