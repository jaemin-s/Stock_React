import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
isLoggedIn: false,
  email: "",
  name: "",
  image: "",
  age: "",
  gender: "",
  career: "",

  onLogout: () => {},
  onLogin: (email, password) => {},
  setUserInfo: () => {},
});


export const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(''); 
    const [image, setImage] = useState('');
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [career, setCareer] = useState("");


   
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === '1') {
            setIsLoggedIn(true);
            setEmail(localStorage.getItem('LOGIN_USEREMAIL'));
            setImage(localStorage.getItem('LOGIN_USERIMAGE'))
        } 
    }, []);


    //로그아웃 핸들러
    const logoutHandler = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    //로그인 핸들러
    const loginHandler = (token, email, image) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
        setIsLoggedIn(true);
        setEmail(email);
        setImage(image);
    };

    //카카오 로그인 핸들러
    const kLoginHandler = (token, email, image) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
        setIsLoggedIn(true);
        setEmail(email);
        setImage(image);
    };

    //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
    const setLoginUserInfo = ({ token, email, image }) => {
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
    }


    useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("LOGIN_USEREMAIL"));
      setName(localStorage.getItem("LOGIN_USERNAME"));
      setNick(localStorage.getItem("NICK"));
      setAge(localStorage.getItem("AGE"));
      setGender(localStorage.getItem("GENDER"));
      setCareer(localStorage.getItem("CAREER"));
    } },[]);


    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            email,
            image,
            onLogout: logoutHandler,
            onLogin: loginHandler, kLoginHandler,
            setUserInfo: setLoginUserInfo
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthContext;


