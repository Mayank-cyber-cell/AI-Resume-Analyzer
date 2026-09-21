import React, { useState, useContext } from 'react'
import styles from './Dashboard.module.css'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/HOC/axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

  const handleAnalyze = async () => {
    setError(null);
    if (!file) { setError('Please upload your resume PDF first.'); return; }
    if (!jobDesc.trim()) { setError('Please paste a job description.'); return; }
    if (!userInfo) { setError('User info missing, please log in again.'); return; }

    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_desc', jobDesc);
      formData.append('user', userInfo.email);

      const response = await axios.post('/api/resume/addResume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });
      setResult(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
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
