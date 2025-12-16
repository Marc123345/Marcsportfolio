import { supabase } from './supabase';

export class APIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'APIError';
  }
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  status?: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      service: data.service || null,
      message: data.message,
      status: data.status || 'new',
    });

    if (error) {
      console.error('Supabase error:', error);
      throw new APIError(error.message, error.code);
    }
    
    console.log('Contact form submitted successfully');
    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('An unexpected error occurred while submitting the form. Please try again later.');
  }
}

export async function getContactForms() {
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new APIError(error.message, error.code);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('An unexpected error occurred while fetching contact forms. Please try again later.');
  }
}