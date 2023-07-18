import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
<<<<<<< HEAD
    isLoggedIn: false, 
    userEmail: '',
    userImage: '',
    onLogout: () => {}, 
    onLogin: (email, password) => {},
    setUserInfo: () => {}
=======
  isLoggedIn: false,
  userEmail: "",
  userName: "",
  age: "",
  gender: "",
  career: "",

  onLogout: () => {},
  onLogin: (email, password) => {},
  setUserInfo: () => {},
>>>>>>> 6c7f3019262e896fa6ece3de64e1871e1c85aa9c
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [nick, setNick] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [career, setCareer] = useState("");

<<<<<<< HEAD
export const AuthContextProvider = props => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(''); 
    const [userImage, setUserImage] = useState('');


   
    useEffect(() => {
        if(localStorage.getItem('isLoggedIn') === '1') {
            setIsLoggedIn(true);
            setUserEmail(localStorage.getItem('LOGIN_USEREMAIL'));
            setUserImage(localStorage.getItem('Login_USERIMAGE'))
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
        setUserEmail(email);
        setUserImage(image);
    };

    //카카오 로그인 핸들러
    const kLoginHandler = (token, email, image) => {
        localStorage.setItem('isLoggedIn', '1');
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
    const setLoginUserInfo = ({ token, email, image }) => {
        localStorage.setItem('LOGIN_ACCESS_TOKEN', token);
        localStorage.setItem('LOGIN_USEREMAIL', email);
        localStorage.setItem('LOGIN_USERIMAGE', image);
=======
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem("LOGIN_USEREMAIL"));
      setUserName(localStorage.getItem("LOGIN_USERNAME"));
      setNick(localStorage.getItem("NICK"));
      setAge(localStorage.getItem("AGE"));
      setGender(localStorage.getItem("GENDER"));
      setCareer(localStorage.getItem("CAREER"));
>>>>>>> 6c7f3019262e896fa6ece3de64e1871e1c85aa9c
    }
  }, []);

<<<<<<< HEAD
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            userEmail,
            userImage,
            onLogout: logoutHandler,
            onLogin: loginHandler, kLoginHandler,
            setUserInfo: setLoginUserInfo
        }}>
            {props.children}
        </AuthContext.Provider>
    );
=======
  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
>>>>>>> 6c7f3019262e896fa6ece3de64e1871e1c85aa9c

  //로그인 핸들러
  const loginHandler = (token, email, name, nick, age, gender, career) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("LOGIN_ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USEREMAIL", email);
    localStorage.setItem("LOGIN_USERNAME", name);
    localStorage.setItem("NICK", nick);
    localStorage.setItem("AGE", age);
    localStorage.setItem("GENDER", gender);
    localStorage.setItem("CAREER", career);
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name);
    setNick(nick);
    setAge(age);
    setGender(gender);
    setCareer(career);
  };

  //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
  const setLoginUserInfo = ({
    token,
    email,
    name,
    nick,
    age,
    gender,
    career,
  }) => {
    localStorage.setItem("LOGIN_ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USEREMAIL", email);
    localStorage.setItem("LOGIN_USERNAME", name);
    localStorage.setItem("NICK", nick);
    localStorage.setItem("AGE", age);
    localStorage.setItem("GENDER", gender);
    localStorage.setItem("CAREER", career);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        userName,
        age,
        nick,
        gender,
        career,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        setUserInfo: setLoginUserInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
