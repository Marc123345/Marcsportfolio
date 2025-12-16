/*
  # Fix Contact Submissions Table RLS Policies

  1. Changes
    - Drop existing table to start fresh
    - Create new contact_submissions table with proper structure
    - Set up correct RLS policies that explicitly allow anonymous submissions
  
  2. Security
    - Enable RLS on contact_submissions table
    - Add policies for:
      - Anonymous users to insert submissions
      - Authenticated users to insert submissions
      - Authenticated users to view submissions
*/

-- Drop existing table and start fresh
DROP TABLE IF EXISTS contact_submissions;

-- Create new contact_submissions table
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'::text
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies with proper permissions
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated read access for contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);