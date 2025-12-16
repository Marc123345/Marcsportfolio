/*
  # Add Service Field to Contact Submissions

  1. Changes
    - Add `service` column to `contact_submissions` table
    - Optional text field to store the selected service
    - No constraints to allow flexibility

  2. Notes
    - This allows users to select which service they're interested in
    - Field is optional to maintain backward compatibility
*/

-- Add service field to contact_submissions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'service'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN service text;
  END IF;
END $$;
