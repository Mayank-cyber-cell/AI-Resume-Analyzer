import { useContext } from 'react'
import styles from './sidebar.module.css'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import BuildIcon from '@mui/icons-material/Build';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { supabase } from '../../utils/supabaseClient';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLogin, setUserInfo } = useContext(AuthContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLogin(false);
    setUserInfo(null);
    navigate('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarIcon}>
        <DocumentScannerIcon sx={{ fontSize: 54, marginBottom: 2 }} />
        <div className={styles.sidebarTopContent}>Resume Analyzer</div>
      </div>

      <div className={styles.sidebarOptionblock}>

        <Link to={"/dashboard"} className={[styles.sidebarOption, location.pathname === "/dashboard"?styles.selectedOption:null].join(" ")}>
          <DashboardCustomizeIcon sx={{ fontSize: 28 }} />
          <div>Dashboard</div>
        </Link>

        <Link to={"/history"} className={[styles.sidebarOption, location.pathname === "/history"?styles.selectedOption:null].join(" ")}>
          <ManageHistoryIcon sx={{ fontSize: 28 }} />
          <div>History</div>
        </Link>

        <Link to={"/builder"} className={[styles.sidebarOption, location.pathname === "/builder"?styles.selectedOption:null].join(" ")}>
          <BuildIcon sx={{ fontSize: 28 }} />
          <div>Resume Builder</div>
        </Link>

        <Link to={"/admin"} className={[styles.sidebarOption, location.pathname === "/admin"?styles.selectedOption:null].join(" ")}>
          <AdminPanelSettingsIcon sx={{ fontSize: 28 }} />
          <div>Admin</div>
        </Link>

        <div className={styles.sidebarOption} onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 28 }} />
          <div>LogOut</div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
