import { useState, useContext } from 'react'
import styles from './Dashboard.module.css'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import { AuthContext } from '../../utils/AuthContext';
import { supabase } from '../../utils/supabaseClient';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const DashBoard = () => {
  const { userInfo } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map((item) => item.str).join(' ') + '\n';
    }
    return fullText.trim();
  };

  const handleAnalyze = async () => {
    setError(null);
    if (!file) { setError('Please upload your resume PDF first.'); return; }
    if (!jobDesc.trim()) { setError('Please paste a job description.'); return; }
    if (!userInfo) { setError('User info missing, please log in again.'); return; }

    setLoading(true);
    setResult(null);
    try {
      const resumeText = await extractPdfText(file);

      const { data: aiData, error: aiError } = await supabase.functions.invoke('analyze-resume', {
        body: { resumeText, jobDesc },
      });

      if (aiError) throw aiError;
      if (aiData?.error) throw new Error(aiData.error);

      const { data: insertData, error: insertError } = await supabase
        .from('resumes')
        .insert({
          user_email: userInfo.email,
          user_name: userInfo.name,
          resume_name: fileName,
          job_desc: jobDesc,
          score: aiData.score,
          feedback: aiData.feedback,
          type: 'analysis',
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setResult(insertData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.dashboard}>
      <main className={styles.mainPanel}>
        <header className={styles.header}>
          <div className={styles.headerKicker}>Smart Resume Screening</div>
          <h1 className={styles.headerTitle}>Resume Match Score</h1>
        </header>

        <section className={styles.instructionsCard}>
          <div className={styles.instructionsTitle}>Important Instructions:</div>
          <div className={styles.instructionsList}>
            <div>Please paste the complete job description in the Job Description field before submitting.</div>
            <div>Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </section>

        <section className={styles.uploadRow}>
          <div className={styles.uploadLabel}>
            {fileName ? `Selected: ${fileName}` : 'Upload Your Resume'}
          </div>
          <label htmlFor="inputField" className={styles.uploadButton}>
            <CloudUploadIcon sx={{ fontSize: 20, marginRight: '6px' }} /> Upload Resume
          </label>
          <input className={styles.hiddenInput} type="file" id="inputField" accept=".pdf" onChange={handleFileChange} />
        </section>

        <section className={styles.actionGrid}>
          <textarea
            className={styles.textArea}
            placeholder="Paste Your Job Description"
            rows="10"
            aria-label="Job Description"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <div className={styles.actionColumn}>
            <button type="button" className={styles.analyzeCircle} onClick={handleAnalyze} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </section>

        {error && <div className={styles.errorMsg}>{error}</div>}
      </main>

      <aside className={styles.sidePanel}>
        <section className={styles.profileCard}>
          <h2 className={styles.cardHeading}>Analyze With AI</h2>
          {userInfo?.photoUrl && (
            <img className={styles.profileImg} src={userInfo.photoUrl} alt="Profile" />
          )}
          <h3 className={styles.profileName}>{userInfo?.name || 'User'}</h3>
        </section>

        <section className={styles.resultCard}>
          <h2 className={styles.cardHeading}>Result</h2>
          {loading && <div className={styles.loadingText}>Analyzing your resume...</div>}
          {!loading && result && (
            <>
              <div className={styles.scoreRow}>
                <div className={styles.scoreValue}>{result.score ?? 'N/A'}{result.score != null ? '%' : ''}</div>
                <SignalCellularAltIcon className={styles.scoreIcon} />
              </div>
              <div className={styles.feedback}>
                <h3>Feedback</h3>
                <p>{result.feedback}</p>
              </div>
            </>
          )}
          {!loading && !result && (
            <div className={styles.feedback}>
              <h3>Feedback</h3>
              <p>Your match score and AI feedback will appear here after analysis.</p>
            </div>
          )}
        </section>
      </aside>
    </div>
  )
}

export default withAUTHHOC(DashBoard)
