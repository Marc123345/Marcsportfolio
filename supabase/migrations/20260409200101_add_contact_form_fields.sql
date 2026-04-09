/*
  # Add new contact form fields

  1. Modified Tables
    - `contact_submissions`
      - `city` (text, nullable) - City of the contact
      - `business_address` (text, nullable) - Business address of the contact
      - `zip_code` (text, nullable) - Zip code of the contact
      - `npi_number` (text, nullable) - NPI number of the contact

  2. Notes
    - All new fields are optional to maintain backward compatibility with existing data
    - NPI number is stored as text to preserve leading zeros
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'city'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'business_address'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN business_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'zip_code'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN zip_code text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'npi_number'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN npi_number text;
  END IF;
END $$;