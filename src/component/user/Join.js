import React, { useRef, useState } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import './Join.scss';




const Join = () => {

  const $fileTag = useRef();

 // 이미지 파일 상태변수
 const [imgFile, setImgFile] = useState(null);

 // 이미지파일을 선택했을 때 썸네일 뿌리기
 const showThumbnailHandler = e => {
     //첨부된 파일 정보
     const file = $fileTag.current.files[0];

     const reader = new FileReader();
     reader.readAsDataURL(file);

     reader.onloadend = () => {
         setImgFile(reader.result);
     }

 };


  return (
    <body class="bg-gradient-primary">

    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div class="row">
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">회원가입</h1>
                            </div>
                            <form class="user">

                           <div className="profile" onClick={() => $fileTag.current.click()}>
                                <img src= {imgFile || require("../../assets/img/image-add.png")} alt="profile" />
                            </div>
                            <label className='signup-img-label' htmlFor='profile-img'>프로필 이미지 추가</label>
                            <input
                                id='profile-img'
                                type='file'
                                style={{display: 'none'}}
                                accept='image/*'
                                ref={$fileTag}
                                onChange={showThumbnailHandler}
                            />
                        
                            <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="이름" />
                                </div>

                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="닉네임" />
                                </div>

                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="이메일 주소" />
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="비밀번호" />
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="비밀번호 확인" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="나이" />
                                </div>
                                <div class="form-group">
                               성별
                               <span style={{ marginRight: 20}}></span> 
                               <input type="radio" name="gender" value="man" />남
                               <span style={{ marginRight: 20}}></span>
                               <input type="radio" name="gender" value="woman" />여
                               </div>
                               <div class="form-group">
                                주식경력
                                <span style={{ marginRight: 20}}></span>
                                <select>
                                <option value="" selected disabled hidden>주식경력</option>
                                <option value="0">입문</option>
			                          <option value="1">1~3년</option>
                                <option value="4">4~10년</option>
                                <option value="10">10년 이상</option>
                                </select>
                                </div>
		
                                <a href="login.html" class="btn btn-primary btn-user btn-block">
                                    회원가입
                                </a>
                               
                               
                            </form>
                            <hr />
                            <div class="text-center">
                                <a class="small" href="forgot-password.html">비밀번호 변경</a>
                            </div>
                            <div class="text-center">
                                <a class="small" href="login.html">로그인</a>
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

export default Join;