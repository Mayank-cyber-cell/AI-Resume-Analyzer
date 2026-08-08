import  { useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export const withAUTHHOC = (WrappedComponent) => {
    const {setLogin} = useContext(AuthContext);
    return (props)=>{
        const navigate = useNavigate();
        useEffect(()=>{
            const isLogin = localStorage.getItem('isLogin');
            if(!isLogin){
                setLogin(false);
                navigate('/');
                return;
            }
        },[navigate])
        return <WrappedComponent {...props} />
    }
}

export default withAUTHHOC;