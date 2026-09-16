import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'D:/sgiarc/sgiarc-web/.env' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function addSections() {
  const sections = [
    {
      name: 'home-about',
      title: 'Fostering Applied Innovation in Central India',
      subtitle: 'Shri Gajanan Innovation and Advanced Research Center (SGIARC) is the apex research body of Shri Sant Gajanan Maharaj College of Engineering, Shegaon.',
      component_name: 'AboutSnippetSection',
      sort_order: 15,
      is_active: true
    },
    {
      name: 'home-publications',
      title: 'Recent Publications',
      subtitle: 'Peer-reviewed research and discoveries from BioMID Lab.',
      component_name: 'PublicationsSnippetSection',
      sort_order: 45,
      is_active: true
    }
  ];

  for (const s of sections) {
    console.log(`Adding ${s.component_name}...`);
    await supabase.from('site_sections').insert(s);
  }

  console.log('Done!');
}

addSections().catch(console.error);
