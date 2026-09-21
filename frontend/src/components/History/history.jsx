import React, { useState, useEffect, useContext } from 'react'
import styles from './history.module.css'
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import { AuthContext } from '../../utils/AuthContext';
import axios from '../../utils/HOC/axios';

function History() {
  const { userInfo } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      if (!userInfo) return;
      try {
        const response = await axios.get(`/api/resume/get/${userInfo.email}`);
        setResumes(response.data.resumes || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load history.');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [userInfo]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString();
  };

  return (
    <div className={styles.history}>
      <h2 className={styles.pageTitle}>Your Resume History</h2>
      {loading && <div className={styles.statusMsg}>Loading your history...</div>}
      {error && <div className={styles.statusMsg}>{error}</div>}
      {!loading && !error && resumes.length === 0 && (
        <div className={styles.statusMsg}>No resumes analyzed yet. Go to Dashboard to analyze one!</div>
      )}
      <div className={styles.HistoryCardBlock}>
        {!loading && resumes.map((r) => (
          <div className={styles.HistoryCard} key={r._id}>
            <div className={styles.CardPercentage}>
              {r.score != null ? `${r.score}%` : 'N/A'}
            </div>
            <h2>{r.resume_name}</h2>
            <p className={styles.jobDesc}>Job: {r.job_desc?.substring(0, 80)}{r.job_desc?.length > 80 ? '...' : ''}</p>
            <p className={styles.feedback}>{r.feedback}</p>
            <p className={styles.dateRow}>Dated: {formatDate(r.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withAUTHHOC(History)
