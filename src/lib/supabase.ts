import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

export interface BookingSubmission {
  name: string;
  phone: string;
  date: string;
  event_type: string;
  message: string;
}

export const submitContact = async (data: ContactSubmission) => {
  const { error } = await supabase
    .from('contacts')
    .insert([data]);

  if (error) throw error;
};

export const submitBooking = async (data: BookingSubmission) => {
  const { error } = await supabase
    .from('bookings')
    .insert([data]);

  if (error) throw error;
};
