import React, { useContext } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import '../user/Login.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../util/AuthContext';



const Login = () => {

    const redirection = useNavigate();

    const { onLogin, isLoggedIn } = useContext(AuthContext);


    const REQUEST_URL = '/login';

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

    const { token, userName, email } = await res.json();

    // Context API를 사용하여 로그인 상태를 업데이트합니다.
    onLogin(token, userName);
    

     //홈으로 리다이렉트
     redirection('/');

}

     //로그인 요청 핸들러
     const loginHandler = e => {
        e.preventDefault();

        

        // 서버에 로그인 요청 전송
        fetchLogin();

    }



  return (
    <body class="bg-gradient-primary">

    <div class="container">

        {/* <!-- Outer Row --> */}
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div class="row">
                              {/* <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                            <div class="col-lg-6"> 
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">로그인</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="이메일 주소" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="비밀번호" />
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                <label class="custom-control-label" for="customCheck">기억하기</label>
                                            </div>
                                        </div>
                                        <a href="index.html" class="btn btn-primary btn-user btn-block">
                                            로그인
                                        </a>
                                        <hr />
                                                                            
                                    </form>
                                    <div class="text-center">
                                        <a class="small" href="#">아이디 찾기 </a>/<a class="small" href="#"> 비밀번호 변경</a> 
                                    
                                    <div class="text-center">
                                    <a class="small" href="/join">회원가입</a>
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
   
    </body>
  )
}

export default Login;