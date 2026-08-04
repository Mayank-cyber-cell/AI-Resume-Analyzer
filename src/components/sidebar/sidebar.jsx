import React from 'react'
import styles from './sidebar.module.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
const sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarIcon}>
        <DocumentScannerIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className={styles.sidebarTopContent}>Resume Analyzer</div>
      </div>

      <div className={styles.sidebarOptionblock}>

        <div className={styles.sidebarOption}>
          <DashboardCustomizeIcon sx={{ fontSize: 28 }} />
          <div>Dashboard</div>
        </div>

        <div className={styles.sidebarOption}>
          <ManageHistoryIcon sx={{ fontSize: 28 }} />
          <div>History</div>
        </div>

        <div className={styles.sidebarOption}>
          <AdminPanelSettingsIcon sx={{ fontSize: 28 }} />
          <div>Admin</div>
        </div>

        <div className={styles.sidebarOption}>
          <LogoutIcon sx={{ fontSize: 28 }} />
          <div>LogOut</div>
        </div>

      </div>
    </div>
  )
}

export default sidebar
