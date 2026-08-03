import React from 'react'
import styles from './sidebar.module.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
const sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarIcon}>
        <DocumentScannerIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className={styles.sidebarTopContent}>Resume Analyzer</div>
      </div>

      <div className={styles.sidebarOptionblock}>
        <div className={styles.sidebarOption}>
            DashBoard
        </div>
        </div>
    </div>
  )
}

export default sidebar
