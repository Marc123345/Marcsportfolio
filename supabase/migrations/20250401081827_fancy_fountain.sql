/*
  # Contact Submissions Schema

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
    - Add policy for public submissions
    - Add policy for authenticated viewing
*/

-- Create contact_submissions table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables WHERE tablename = 'contact_submissions'
  ) THEN
    CREATE TABLE contact_submissions (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      service text NOT NULL,
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL,
      description text NOT NULL,
      created_at timestamptz DEFAULT now(),
      status text DEFAULT 'pending'
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
  DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON contact_submissions;
END $$;

-- Create policies
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);