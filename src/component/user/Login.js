import React, { useContext, useEffect, useState } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import '../user/Login.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../util/AuthContext';
import { KAKAO_AUTH_URL } from './OAuth';
import IdModal from './IdModal'



const Login = () => {
   
    
  const redirection = useNavigate();

  const { onLogin, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        redirection("/");
      }, 3000);
    }
  }, [isLoggedIn, redirection]);

  const REQUEST_URL = "http://localhost:8181/api/user/login";

    const fetchLogin = async() => {

      //사용자가 입력한 이메일, 비밀번호 입력 태그 얻어오기
      const $email = document.getElementById('email');
      const $password = document.getElementById('password');


      const res = await fetch(REQUEST_URL, {
        method: 'POST',
        headers: { 'content-type' : 'application/json' },
        body: JSON.stringify({
            email: $email.value,
            password: $password.value
         }) 
      });

      if (res.status === 400) {
          const text = await res.text();
          alert(text);
          return;
      }

      const { token, email, image } = await res.json();

    // Context API를 사용하여 로그인 상태를 업데이트합니다.
    onLogin(token, email, image);
    

     //홈으로 리다이렉트
     redirection('/');

    
    
    }




    //로그인 요청 핸들러
    const loginHandler = e => {
      e.preventDefault();

      

      // 서버에 로그인 요청 전송
      fetchLogin();

    }

    //카카오 로그인 요청 핸들러
    const kloginHandler = e => {
        e.preventDefault();

        

        // 서버에 로그인 요청 전송
        // checkToken();
        window.location.href = KAKAO_AUTH_URL;
    }

    // function Modal() {
    //     // 모달창 노출 여부 state
    //     const [modalOpen, setModalOpen] = useState(false);
    
    //     // 모달창 노출
    //     const showModal = () => {
    //         setModalOpen(true);
    //     };                 
    

   

    // async function checkToken(code) {
    //   const res = await fetch(`http://localhost:3000/api/user/callback/kakao?code=${code}`, { 
    //     method: "GET"
       
    // });
    
    // const data = await res.json();
    // console.log('data: ', data);
    
    //    .then(res => res.json())             //json으로 받을 것을 명시
    //    .then(res => {      
    //             console.log(res);
    //             console.log(res.data.email);
    //             console.log(res.data.token);
                
    //             localStorage.setItem("email", res.data.email);
    //             localStorage.setItem("token", res.data.token);
                            
    //   });

          
             //홈으로 리다이렉트
            //  redirection('/');

        
        
    
    
    
     

  return (
    <div className="bg-gradient-primary">

        <div className="container">

            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* <!-- Nested Row within Card Body --> */}
                            <div className="row">
                                {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                                <div className="col-lg-6"> 
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">로그인</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user"
                                                    id="email" aria-describedby="emailHelp"
                                                    placeholder="이메일 주소" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user"
                                                    id="password" placeholder="비밀번호" />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    <label className="custom-control-label" htmlFor="customCheck">아이디 기억하기</label>
                                                </div>
                                            </div>
                                            <a href="#" className="btn btn-primary btn-user btn-block" onClick={loginHandler}>
                                                로그인
                                            </a>
                                            <hr />
                                            <div>
                                            <a href="#" className="kakaobtn" onClick={kloginHandler}>
                                                <img src={require('./image/kakao1.png')} alt="카카오로그인" />
                                            </a>
                                            </div>

                                                                                
                                        </form>

                                        <div className="text-center">
                                        {/* <div>
                                            <a className="small" href="#" onClick={showModal}>아이디 찾기</a>{modalOpen && <IdModal setModalOpen={setModalOpen} />}</div>  */}
                                           /<a className="small" href="#"> 비밀번호 변경</a> 
                                           </div>
                                        
                                        <div className="text-center">
                                        <a className="small" href="/join">회원가입</a>
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

    
  )
  }
    }

  


export default Login;