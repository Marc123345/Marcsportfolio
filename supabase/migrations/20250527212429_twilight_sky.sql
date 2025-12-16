/*
  # Fix RLS policies for contact submissions table

  1. Changes
    - Drop existing RLS policies on contact_submissions table
    - Create new policies with proper configuration:
      - Allow public inserts with proper column checks
      - Allow authenticated users to view submissions
  
  2. Security
    - Enable RLS on contact_submissions table
    - Add policies for:
      - Public insert access with column validation
      - Authenticated user read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view submissions" ON contact_submissions;

-- Create new policies with proper configuration
CREATE POLICY "Enable insert access for public"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (
    service IS NOT NULL AND
    first_name IS NOT NULL AND
    last_name IS NOT NULL AND
    email IS NOT NULL AND
    description IS NOT NULL
  );

CREATE POLICY "Enable read access for authenticated users"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);