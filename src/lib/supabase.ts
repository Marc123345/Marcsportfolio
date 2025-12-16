import { createClient } from '@supabase/supabase-js';

console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL || '');
const supabaseAnonKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '');

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables, but continuing with default values');
}

export const supabase = createClient(
  supabaseUrl || 'https://ajqrdvsnkmiiuuqenyyt.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcXJkdnNua21paXV1cWVueXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMTUzMzIsImV4cCI6MjA2Mjg5MTMzMn0.MvSbW0g3cPR2W2BrK_42yt0QQea2X7_debSQ40-2Ccg',
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
      console.log('Development mode: Skipping Supabase connection check');
      return true;
    }

    // For production, do a simple health check
    console.log('Checking Supabase connection...');
    const { error } = await supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    if (error) {
      console.warn('Supabase connection issue:', error.message);
      return false;
    }

    console.log('Supabase connection successful');
    return true;
  } catch (error: any) {
    console.warn('Supabase connection check failed:', error.message || 'Unknown error');
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
      console.warn('Network connectivity test failed:', error);
      return false;
    }
  } catch (error) {
    console.warn('Network connectivity test error:', error);
    return false;
  }
}