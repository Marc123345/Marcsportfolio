/*
  # Fix contact submissions table and policies

  1. Security
    - Drop existing policies
    - Create new public insert policy with no restrictions
    - Create read policy for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert access for public" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON contact_submissions;

-- Create new policies with proper configuration
CREATE POLICY "Public insert access for contact submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated read access for contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);