-- Allow admins (is_admin flag in raw_app_meta_data) to read all resumes
DROP POLICY IF EXISTS "select_all_resumes_admin" ON resumes;
CREATE POLICY "select_all_resumes_admin"
  ON resumes FOR SELECT
  TO authenticated
  USING (
    ((auth.jwt() -> 'app_metadata') ->> 'is_admin')::boolean = true
  );
