import { createClient } from '@supabase/supabase-js';

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL || '');
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please check your .env file.');
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

// Helper function to test basic network connectivity
export async function testNetworkConnectivity(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors'
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      clearTimeout(timeoutId);
      if (import.meta.env.DEV) {
        console.warn('Network connectivity test failed:', error);
      }
      return false;
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Network connectivity test error:', error);
    }
    return false;
  }
}