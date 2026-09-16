import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function setup() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@example.com',
    password: 'SecureAdminPassword123!',
  });
  if (error) console.error('Error:', error.message);
  else console.log('Admin user created:', data.user?.email);
}
setup();
