/*
# Create resumes table for AI Resume Analyzer

1. New Tables
- `resumes` — stores resume analysis results and AI-built resumes
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, identifies the owner)
  - `user_email` (text, the user's email for display/filtering)
  - `user_name` (text, the user's display name)
  - `resume_name` (text, name of the resume file or built resume)
  - `job_desc` (text, the job description used for analysis)
  - `score` (integer, match score 0-100, nullable for built resumes)
  - `feedback` (text, AI feedback or generated resume text)
  - `type` (text, either 'analysis' or 'built' to distinguish record types)
  - `created_at` (timestamptz, defaults to now())

2. Security
- Enable RLS on `resumes`.
- Owner-scoped CRUD: each authenticated user can only access rows they own.
- SELECT, INSERT, UPDATE, DELETE policies using auth.uid() = user_id.
- Admins can read all resumes (admin flag stored in raw_app_meta_data).

3. Notes
- The `user_id` column has DEFAULT auth.uid() so inserts that omit it still work.
- The `type` column distinguishes between resume analysis records and AI-built resume records.
- Admin access is determined by the `is_admin` flag in the user's app metadata.
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  user_name text,
  resume_name text NOT NULL,
  job_desc text NOT NULL DEFAULT '',
  score integer,
  feedback text,
  type text NOT NULL DEFAULT 'analysis',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Owner-scoped SELECT
DROP POLICY IF EXISTS "select_own_resumes" ON resumes;
CREATE POLICY "select_own_resumes"
  ON resumes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Owner-scoped INSERT
DROP POLICY IF EXISTS "insert_own_resumes" ON resumes;
CREATE POLICY "insert_own_resumes"
  ON resumes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Owner-scoped UPDATE
DROP POLICY IF EXISTS "update_own_resumes" ON resumes;
CREATE POLICY "update_own_resumes"
  ON resumes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Owner-scoped DELETE
DROP POLICY IF EXISTS "delete_own_resumes" ON resumes;
CREATE POLICY "delete_own_resumes"
  ON resumes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for querying by user
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
