/*
  # Contact Forms Schema Update

  This migration ensures the contact_forms table exists with proper structure and policies.
  It uses IF NOT EXISTS checks to handle cases where objects already exist.

  1. Table Structure
    - Checks if table exists before creating
    - All necessary columns for contact form data
    - Timestamps and status tracking

  2. Security
    - Enables RLS if not already enabled
    - Sets up insertion and viewing policies
*/

-- Create table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables WHERE tablename = 'contact_forms'
  ) THEN
    CREATE TABLE contact_forms (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL,
      company text,
      website text,
      project_type text NOT NULL,
      budget text NOT NULL,
      timeline text NOT NULL,
      goals text NOT NULL,
      audience text NOT NULL,
      features text[] NOT NULL DEFAULT '{}',
      design_preferences text,
      technical_requirements text,
      additional_info text,
      created_at timestamptz NOT NULL DEFAULT now(),
      status text NOT NULL DEFAULT 'new'
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert contact forms" ON contact_forms;
  DROP POLICY IF EXISTS "Only authenticated users can view contact forms" ON contact_forms;
END $$;

-- Create policies
CREATE POLICY "Anyone can insert contact forms"
  ON contact_forms
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact forms"
  ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);