import React, { useState, useEffect } from 'react'
import styles from './admin.module.css'
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import axios from '../../utils/HOC/axios';

const admin = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get('/api/resume/get');
        setResumes(response.data.resumes || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminInner}>
        <h2 className={styles.pageTitle}>All Resumes (Admin View)</h2>
        {loading && <div className={styles.statusMsg}>Loading...</div>}
        {error && <div className={styles.statusMsg}>{error}</div>}
        {!loading && !error && resumes.length === 0 && (
          <div className={styles.statusMsg}>No resumes found.</div>
        )}
        <div className={styles.AdminBlock}>
          {!loading && resumes.map((r) => (
            <div className={styles.AdminCard} key={r._id}>
              <h3>{r.resume_name}</h3>
              <p className={styles.userLine}>{r.user}</p>
              <p className={styles.scoreLine}>Score: {r.score != null ? `${r.score}%` : 'N/A'}</p>
              <p className={styles.feedbackLine}>{r.feedback}</p>
              <p className={styles.dateLine}>Date: {formatDate(r.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withAUTHHOC(admin)
