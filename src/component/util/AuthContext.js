
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false, 
    userEmail: '',
    onLogout: () => {}, 
    onLogin: (email, password) => {},
    setUserInfo: () => {}
});


export const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

   
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === '1') {
            setIsLoggedIn(true);
            setUserEmail(localStorage.getItem('LOGIN_USEREMAIL'));
        } 
    }, []);


    //로그아웃 핸들러
    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    //로그인 핸들러
    const loginHandler = (token, email) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
    const setLoginUserInfo = ({ token, email }) => {
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userEmail,
            onLogout: logoutHandler,
            onLogin: loginHandler,
            setUserInfo: setLoginUserInfo
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthContext;


