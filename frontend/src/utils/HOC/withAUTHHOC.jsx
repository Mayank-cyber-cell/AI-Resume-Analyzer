import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export const withAUTHHOC = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const { islogin, loading } = useContext(AuthContext);

    useEffect(() => {
      if (loading) return;
      if (!islogin) {
        navigate('/');
      }
    }, [islogin, loading, navigate]);

    if (loading) return null;
    if (!islogin) return null;

    return <WrappedComponent {...props} />
  }
}

export default withAUTHHOC;
