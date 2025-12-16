/*
  # Remove phone_confirm column from contact_submissions table

  1. Changes
    - Remove `phone_confirm` column from `contact_submissions` table
    - This aligns with the updated contact form that no longer has a phone confirmation field

  2. Notes
    - This is a safe operation as the column is no longer used
    - Existing data in other columns will be preserved
*/

-- Remove the phone_confirm column from contact_submissions table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'phone_confirm'
  ) THEN
    ALTER TABLE contact_submissions DROP COLUMN phone_confirm;
  END IF;
END $$;