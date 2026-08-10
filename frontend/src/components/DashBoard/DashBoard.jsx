import React from 'react'
import styles from './DashBoard.module.css'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { withAUTHHOC } from '../../utils/HOC/withAUTHHOC';
import { Skeleton } from '@mui/material'
const DashBoard = () => {
  return (
    <div className={styles.dashboard}>
      <main className={styles.mainPanel}>
        <header className={styles.header}>
          <div className={styles.headerKicker}>Smart Resume Screening</div>
          <h1 className={styles.headerTitle}>Resume Match Score</h1>
        </header>

        <section className={styles.instructionsCard}>
          <div className={styles.instructionsTitle}>🔔 Important Instructions:</div>
          <div className={styles.instructionsList}>
            <div>📝 Please paste the complete job description in the Job Description field before submitting.</div>
            <div>📄 Only PDF format (.pdf) resumes are accepted.</div>
          </div>
        </section>

        <section className={styles.uploadRow}>
          <div className={styles.uploadLabel}>Upload Your Resume</div>
          <label htmlFor="inputField" className={styles.uploadButton}>
            Upload Resume
          </label>
          <input className={styles.hiddenInput} type="file" id="inputField" accept=".pdf" />
        </section>

        <section className={styles.actionGrid}>
          <textarea
            className={styles.textArea}
            placeholder="Paste Your Job Description"
            rows="10"
            aria-label="Job Description"
          />

          <div className={styles.actionColumn}>
            <button type="button" className={styles.analyzeCircle}>
              Analyze
            </button>
          </div>
        </section>
      </main>

      <aside className={styles.sidePanel}>
        <section className={styles.profileCard}>
          <h2 className={styles.cardHeading}>Analyze With AI</h2>
          <img
            className={styles.profileImg}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
            alt="Profile"
          />
          <h3 className={styles.profileName}>Mayank Shah</h3>
        </section>

        <section className={styles.resultCard}>
          <Skeleton
          variant="rectangular"
          width={210}
          height={333}
          sx={{ borderRadius: '20px' }} />
          <h2 className={styles.cardHeading}>Result</h2>
          <div className={styles.scoreRow}>
            <div className={styles.scoreValue}>75%</div>
            <SignalCellularAltIcon className={styles.scoreIcon} />
          </div>
          <div className={styles.feedback}>
            <h3>Feedback</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis optio ut illo repudiandae,
              facilis quasi asperiores repellendus adipisci, amet necessitatibus ipsa quidem officia qui quam,
              porro magni assumenda sapiente laboriosam!
            </p>
          </div>
        </section>
      </aside>
    </div>
  )
}

export default withAUTHHOC(DashBoard)
