/*
  # Fix Contact Submissions RLS Policy

  1. Security Updates
    - Drop existing problematic INSERT policy
    - Create new INSERT policy that allows anonymous users to submit contact forms
    - Ensure the policy properly allows public access for form submissions

  2. Policy Details
    - Allow INSERT operations for anonymous (public) users
    - No restrictions on the data being inserted for contact submissions
*/

-- Drop the existing INSERT policy that might be causing issues
DROP POLICY IF EXISTS "Public insert access for contact submissions" ON contact_submissions;

-- Create a new INSERT policy that properly allows anonymous submissions
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also allow authenticated users to insert (in case they're logged in)
CREATE POLICY "Allow authenticated contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);