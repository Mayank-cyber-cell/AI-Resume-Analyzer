import React from 'react'
import styles from './DashBoard.module.css'
const DashBoard = () => {
  return (
    <div className={styles.DashBoard}>
      <div className={styles.leftDashboard}>
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>A.I Resume Analyzer</div>
          <div className={styles.DashboardHeaderLargeTitle}>Analyze your Resume with AI</div>
        </div>
        <div className={styles.alertInfo}>
          <div>🔔 Important Instructions:</div>
          <div className={styles.dashboardInstruction}>
            <div>📝Please paste the complete Job Description in 'Job Description' field Before analyzing your resume.</div>
            <div>📄 Only PDF files are accepted for analysis.</div>
          </div>
        </div>

        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}> Upload Your Resume</div>
          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              Upload Resume
            </label>
            <input type="file" id="inputField" accept=".pdf" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
