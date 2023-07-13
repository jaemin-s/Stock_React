import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userName: "",
  onLogout: () => {},
  onLogin: (email, password) => {},
  setUserInfo: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("LOGIN_USERNAME"));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const loginHandler = (token, userName, career) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USERNAME", userName);
    localStorage.setItem("CAREER", career);

    setIsLoggedIn(true);
    setUserName(userName);
  };

  const setLoginUserInfo = ({ token, userName, career }) => {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("LOGIN_USERNAME", userName);
    localStorage.setItem("CAREER", career);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
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
