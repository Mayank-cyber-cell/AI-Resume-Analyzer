import React from 'react'
import styles from './sidebar.module.css'
const sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarIcon}>
        <div>Resume Analyzer</div>
      </div>
    </div>
  )
}

export default sidebar
