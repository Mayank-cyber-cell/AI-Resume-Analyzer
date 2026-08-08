import React from 'react'
import styles from './login.module.css'
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
  return (
    <div className={styles.Login}>
        <div className={styles.loginCard}>
          <div className={styles.loginCardTitle}>
            <h1>Login</h1>
            <KeyIcon />
          </div>
          <div className={styles.googleBtn}> <GoogleIcon sx={{ fontSize: 20, color: "red" }} /> Sign in with Google</div>

        </div>
    </div>
  )
}

export default Login
