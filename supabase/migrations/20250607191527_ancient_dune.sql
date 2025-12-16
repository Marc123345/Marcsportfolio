/*
  # Fix Contact Submissions RLS Policies

  1. Changes
    - Drop existing RLS policies on contact_submissions table
    - Create new policies with proper configuration:
      - Allow public inserts with no restrictions
      - Allow authenticated users to view submissions
  
  2. Security
    - Enable RLS on contact_submissions table
    - Add policies for:
      - Public insert access
      - Authenticated user read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert access for public" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON contact_submissions;
DROP POLICY IF EXISTS "Public insert access for contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated read access for contact submissions" ON contact_submissions;

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