/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `service` (text)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `description` (text)
      - `created_at` (timestamptz)
      - `status` (text)
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for public users to insert submissions
    - Add policy for authenticated users to view submissions
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

-- Enable row level security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
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