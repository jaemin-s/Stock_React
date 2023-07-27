import React, { useContext, useEffect, useState } from "react";
import "../bootstrap/css/sb-admin-2.min.css";
import "../user/Login.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../util/AuthContext";
import { KAKAO_AUTH_URL } from "./OAuth";
import IdModal from "./IdModal";
import PasswordModal from "./PasswordModal";

const LS_KEY_ID = "LS_KEY_ID";
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";

const Login = () => {
  const [loginID, setLoginID] = useState("");
  const [saveIDFlag, setSaveIDFlag] = useState(false);

  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setTimeout(() => {
  //       redirection("/");
  //     }, 3000);
  //   }
  // }, [isLoggedIn, redirection]);

  const REQUEST_URL = "http://localhost:8181/api/user/login";

  const fetchLogin = async () => {
    // 사용자가 입력한 이메일, 비밀번호 입력 태그 얻어오기
    const $email = document.getElementById("email");
    const $password = document.getElementById("password");

    const res = await fetch(REQUEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { token, email, image, userRole } = await res.json();

    // Context API를 사용하여 로그인 상태를 업데이트합니다.
    onLogin(token, email, image, userRole);

    //홈으로 리다이렉트
    redirection("/");
  };

  //로그인 요청 핸들러
  const loginHandler = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 전송
    fetchLogin();
  };

  //카카오 로그인 요청 핸들러
  const kloginHandler = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 전송
    // checkToken();
    window.location.href = KAKAO_AUTH_URL;
  };

  // 아이디 찾기 모달
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //비번변경 모달
  const [modalOpenl, setModalOpenl] = useState(false);

  const openModall = () => {
    setModalOpenl(true);
  };
  const closeModall = () => {
    setModalOpenl(false);
  };

  //아이디 저장하기

  if (true /* login success */) {
    if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);
  }
  const getLoginID = (event) => {
    let value = event.target.value;

    if (value === "") {
      setLoginID(value);
      return;
    }

    setLoginID(value);

    return;
  };

  const handleSaveIDFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  if (true /* login success */) {
    if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);
  }

  useEffect(() => {
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");

    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginID(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLogin();
  };
  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center" style={{ margin: "0" }}>
          <div
            className="col-xl-10 col-lg-12 col-md-9"
            style={{ padding: "0" }}
          >
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0" style={{ overflow: "hidden" }}>
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">로그인</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="이메일 주소"
                            value={loginID}
                            onChange={(e) => getLoginID(e)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="password"
                            placeholder="비밀번호"
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                              checked={saveIDFlag}
                              onChange={handleSaveIDFlag}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              아이디 기억하기
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          onClick={loginHandler}
                        >
                          로그인
                        </button>
                        <hr />
                        <div>
                          <a
                            href="#"
                            className="kakaobtn"
                            onClick={kloginHandler}
                          >
                            <img
                              src={require("./image/kakao1.png")}
                              alt="카카오로그인"
                            />
                          </a>
                        </div>
                      </form>

                      <div className="text-center">
                        <React.Fragment>
                          <a className="small" href="#" onClick={openModal}>
                            아이디 찾기
                          </a>
                          <IdModal
                            open={modalOpen}
                            close={closeModal}
                            header="아이디 찾기"
                          ></IdModal>
                        </React.Fragment>
                        /{" "}
                        <React.Fragment>
                          <a className="small" href="#" onClick={openModall}>
                            비밀번호 변경
                          </a>
                          <PasswordModal
                            open={modalOpenl}
                            close={closeModall}
                            header="비밀번호 변경"
                          ></PasswordModal>
                        </React.Fragment>
                        <div className="text-center">
                          <a className="small" href="/join">
                            회원가입
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
