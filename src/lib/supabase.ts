import { createClient } from '@supabase/supabase-js';

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL || '');
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');

if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('Missing Supabase environment variables. Check your .env file.');
  }
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'portfolio-website'
      }
    }
  }
);

// Helper function to check Supabase connection with improved error handling
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Skip connection check in development to avoid CORS issues
    if (import.meta.env.DEV) {
      return true;
    }

    // For production, do a simple health check
    const { error } = await supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      if (import.meta.env.DEV) {
        console.warn('Supabase connection issue:', error.message);
      }
      return false;
    }

    return true;
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.warn('Supabase connection check failed:', error.message || 'Unknown error');
    }
    return false;
  }
}
