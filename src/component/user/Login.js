import React from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import '../user/Login.scss';


const Login = () => {
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