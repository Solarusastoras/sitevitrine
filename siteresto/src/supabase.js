import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

if (!isConfigured) {
  console.warn('Supabase URL or Anon Key is missing. Please check your .env file.');
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : { 
      from: () => ({ select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }), insert: () => Promise.resolve({ data: [], error: null }) }),
      auth: { getSession: () => Promise.resolve({ data: { session: null } }), onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }), signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase non configuré' } }), signOut: () => Promise.resolve() },
      storage: { from: () => ({ upload: () => Promise.resolve({ error: { message: 'Supabase non configuré' } }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) }
    };
