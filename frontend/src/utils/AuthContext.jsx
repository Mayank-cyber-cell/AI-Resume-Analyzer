import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children})=>{

    var login = localStorage.getItem('isLogin');
    var userInfoData = localStorage.getItem('userInfo');
    const [islogin,setLogin] = useState(login?login:false);
    const [userInfo,setUserInfo] = useState(userInfoData?JSON.parse(userInfoData):null);

    return (
        <AuthContext.Provider value={{islogin,setLogin,userInfo,setUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;