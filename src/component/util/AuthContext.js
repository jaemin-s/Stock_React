import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  name: "",
  image: "",
  age: "",
  gender: "",
  career: "",
  mbti: "",
  onLogout: () => {},
  onLogin: (email, password) => {},
  setUserInfo: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [career, setCareer] = useState("");
  const [mbti, setMbti] = useState("");


  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("LOGIN_USEREMAIL"));
      setImage(localStorage.getItem("LOGIN_USERIMAGE"));
      setUserRole(localStorage.getItem("LOGIN_USERROLE"));
    }
  }, []);

  //로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("LOGIN_ACCESS_TOKEN");
    localStorage.removeItem("LOGIN_USEREMAIL");
    localStorage.removeItem("LOGIN_USERIMAGE");
    localStorage.removeItem("LOGIN_USERROLE");
    setIsLoggedIn(false);
  };

  //로그인 핸들러
  const loginHandler = (token, email, image, userRole) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("LOGIN_ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USEREMAIL", email);
    localStorage.setItem("LOGIN_USERIMAGE", image);
    localStorage.setItem("LOGIN_USERROLE", userRole);

    setIsLoggedIn(true);
    setEmail(email);
    setImage(image);
    setUserRole(userRole);

  };

  //카카오 로그인 핸들러
  const kLoginHandler = (token, email, image, userRole) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("LOGIN_ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USEREMAIL", email);
    localStorage.setItem("LOGIN_USERIMAGE", image);
    localStorage.setItem("LOGIN_USERROLE", userRole);
    setIsLoggedIn(true);
    setEmail(email);
    setImage(image);
    setUserRole(userRole);
  };

  //토큰 및 로그인 유저 데이터를 브라우저에 저장하는 함수
  const setLoginUserInfo = ({ token, email, image }) => {
    localStorage.setItem("LOGIN_ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USEREMAIL", email);
    localStorage.setItem("LOGIN_USERIMAGE", image);
    localStorage.setItem("LOGIN_USERROLE", userRole);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("LOGIN_USEREMAIL"));
      setName(localStorage.getItem("LOGIN_USERNAME"));
      setEmail(localStorage.getItem("LOGIN_USERROLE"));
      setNick(localStorage.getItem("NICK"));
      setAge(localStorage.getItem("AGE"));
      setGender(localStorage.getItem("GENDER"));
      setCareer(localStorage.getItem("CAREER"));
      setMbti(localStorage.getItem("MBTI"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        image,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        kLoginHandler,
        setUserInfo: setLoginUserInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
