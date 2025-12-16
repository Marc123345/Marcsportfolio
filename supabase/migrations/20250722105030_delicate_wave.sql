/*
  # Add LinkedIn fields to contact submissions

  1. Changes
    - Add linkedin_url column to contact_submissions table
    - Add linkedin_verified column to track verification status
  
  2. Security
    - No changes to RLS policies needed
*/

-- Add LinkedIn URL column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN linkedin_url text;
  END IF;
END $$;

-- Add LinkedIn verified status column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'linkedin_verified'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN linkedin_verified boolean DEFAULT false;
  END IF;
END $$;