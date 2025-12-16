/*
  # Fix contact submissions table and policies

  1. New Tables
    - Ensures `contact_submissions` table exists with proper structure
  2. Security
    - Adds policies for contact_submissions table if they don't exist
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'::text
);

-- Enable RLS on the table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies only if they don't exist
DO $$
BEGIN
  -- Check if the insert policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Anyone can insert contact submissions'
  ) THEN
    CREATE POLICY "Anyone can insert contact submissions"
      ON contact_submissions
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
  
  -- Check if the select policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_submissions' 
    AND policyname = 'Only authenticated users can view submissions'
  ) THEN
    CREATE POLICY "Only authenticated users can view submissions"
      ON contact_submissions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END
$$;