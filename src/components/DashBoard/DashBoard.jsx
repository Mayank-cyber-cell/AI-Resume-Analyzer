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
      </div>
    </div>
  )
}

export default DashBoard
