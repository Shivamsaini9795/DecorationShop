/*
  # Flower Decoration Website Database Schema

  ## Overview
  Creates tables for managing contact form submissions and booking enquiries
  for a flower decoration business website.

  ## New Tables
  
  ### 1. contacts
  Stores contact form submissions from visitors
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Visitor's full name
  - `email` (text) - Visitor's email address
  - `message` (text) - Contact message content
  - `created_at` (timestamptz) - Timestamp of submission

  ### 2. bookings
  Stores booking enquiry submissions for events
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Customer's full name
  - `phone` (text) - Customer's phone number
  - `date` (text) - Requested event date
  - `event_type` (text) - Type of event (wedding, party, etc.)
  - `message` (text) - Additional details or requirements
  - `created_at` (timestamptz) - Timestamp of submission

  ## Security
  - Enable RLS on both tables
  - Allow anonymous inserts (for public form submissions)
  - Only authenticated admins can read submissions
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  date text NOT NULL,
  event_type text NOT NULL,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anyone to insert booking enquiries
CREATE POLICY "Anyone can submit booking enquiry"
  ON bookings FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read contacts
CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can read bookings
CREATE POLICY "Authenticated users can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

  import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
