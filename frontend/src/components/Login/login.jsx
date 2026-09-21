import React, { useContext } from 'react'
import styles from './login.module.css'
import KeyIcon from '@mui/icons-material/Key';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/HOC/axios';

const Login = () => {
  const { islogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }

      await axios.post('/api/user', userData).then((response) => {
        setUserInfo(response.data.user);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      }).catch(err => {
        console.error(err);
      });
      
      setLogin(true);
      localStorage.setItem('isLogin', true);

      navigate('/dashboard');
    } catch (err) {
      alert("Something went wrong while login");
      console.log(err);
    }
  }
  return (
    <div className={styles.Login}>
      <div className={styles.loginCard}>
        <div className={styles.loginCardTitle}>
          <h1>Login</h1>
          <KeyIcon />
        </div>
        <div className={styles.googleBtn} onClick={handlelogin}> <GoogleIcon sx={{ fontSize: 20, color: "red" }} /> Sign in with Google</div>

      </div>
    </div>
  )
}

export default Login
