import React, { useContext, useRef, useState } from 'react'
import '../bootstrap/css/sb-admin-2.min.css';
import './Join.scss';
import AuthContext from '../util/AuthContext';
import { useNavigate } from 'react-router-dom';




const Join = () => {

  const $fileTag = useRef();

   //리다이렉트 사용하기
   const redirection = useNavigate();
   const { isLoggedIn } = useContext(AuthContext);


   const API_BASE_URL = 'http://localhost:8181/api/user';


    //상태변수로 회원가입 입력값 관리
    const [userValue, setUserValue] = useState({
        userName: '',
        nick: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        career: '',
        
    });


     //검증 메세지에 대한 상태변수 관리
     const [message, setMessage] = useState({
        userName: '',
        nick: '',
        email: '',
        password: '',
        passwordCheck: '',
        age: '',
    
    });

      //검증 완료 체크에 대한 상태변수 관리
      const [correct, setCorrect] = useState({
        userName: false,
        nick: false,
        email: false,
        password: false,
        passwordCheck: false,
        age: false,
        
        
    });

     //검증 데이터를 상태변수에 저장하는 함수
     const saveInputState = ({key, inputVal, flag, msg}) => {       
        
        inputVal !== 'pass' && setUserValue({
            ...userValue,
            [key]: inputVal
        });
        
        setMessage({
            ...message,
            [key]: msg
        });

        setCorrect({
            ...correct,
            [key]: flag
        });

    }



    //이름 입력창 체인지 이벤트 핸들러
    const nameHandler = e => {

        const nameRegex = /^[가-힣]{2,5}$/;  
        
        const inputVal = e.target.value;
        //입력값 검증
        let msg; //검증 메세지를 저장할 변수
        let flag = false; //입력값 검증 체크 변수
        
        if(!inputVal) {
            msg = '사용자 이름은 필수입니다.';
        } else if(!nameRegex.test(inputVal)) {
            msg = '2~5글자 사이의 한글로 작성해주세요.';
        } else {
            msg = '사용 가능한 이름입니다.';
            flag = true;
        }

        
        saveInputState({
            key: 'userName',
            inputVal,
            msg,
            flag
        });
        
    };


     // 닉네임 중복체크 서버 통신 함수
     const fetchNickCheck = nick => {

        let msg = '', flag = false;
        fetch(`${API_BASE_URL}/checknick?nick=${nick}`)
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                console.log(json);
                if(json) {
                    msg = '닉네임이 중복되었습니다!';
                } else {
                    msg = '사용 가능한 닉네임입니다.';
                    flag = true;
                }

                setUserValue({...userValue, nick: nick});
                setMessage({...message, nick: msg});
                setCorrect({...correct, nick: flag});
            })
            .catch(err => {
                console.log('서버 통신이 원활하지 않습니다.');
            });
    };

    //닉네임 입력창 체인지 이벤트 핸들러
    const nickHandler = e => {

        const inputVal = e.target.value;


        let msg, flag = false;
        if(!inputVal) {
            msg = '닉네임은 필수값입니다.';
            } else {
            // 중복 체크
            fetchNickCheck(inputVal);
            return;
        }

        saveInputState({
            key: 'nick',
            inputVal,
            msg,
            flag
        });

    };

    // 이메일 중복체크 서버 통신 함수
    const fetchDuplicateCheck = email => {

        let msg = '', flag = false;
        fetch(`${API_BASE_URL}/check?email=${email}`)
            .then(res => {
                if(res.status === 200) {
                    return res.json();
                }
            })
            .then(json => {
                console.log(json);
                if(json) {
                    msg = '이메일이 중복되었습니다!';
                } else {
                    msg = '사용 가능한 이메일입니다.';
                    flag = true;
                }

                setUserValue({...userValue, email: email});
                setMessage({...message, email: msg});
                setCorrect({...correct, email: flag});
            })
            .catch(err => {
                console.log('서버 통신이 원활하지 않습니다.');
            });
    };

    //이메일 입력창 체인지 이벤트 핸들러
    const emailHandler = e => {

        const inputVal = e.target.value;

        const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

        let msg, flag = false;
        if(!inputVal) {
            msg = '이메일은 필수값입니다.';
        } else if(!emailRegex.test(inputVal)) {
            msg = '이메일 형식이 아닙니다.';
        } else {
            //이메일 중복 체크
            fetchDuplicateCheck(inputVal);
            return;
        }

        saveInputState({
            key: 'email',
            inputVal,
            msg,
            flag
        });

    };

    //패스워드 입력창 체인지 이벤트 핸들러
    const passwordHandler = e => {

        //패스워드가 변동되면 패스워드 확인란을 비우기
        document.getElementById('passwordCheck').value = '';
        document.getElementById('check-span').textContent = '';

        setMessage({...message, passwordCheck: ''});
        setCorrect({...correct, passwordCheck: false});


        const inputVal = e.target.value;

        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;


  
        //검증 시작
        let msg, flag = false;
        if(!inputVal) { //패스워드 안적음.
            msg = '비밀번호는 필수입니다.';
        } else if(!pwRegex.test(inputVal)) {
            msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.';
        } else {
            msg = '사용 가능한 비밀번호입니다.';
            flag = true;
        }

        saveInputState({
            key: 'password',
            inputVal,
            msg,
            flag
        });       
    };

    const pwCheckHandler = e => {
        //검증 시작
        let msg, flag = false;
        if(!e.target.value) {
            msg = '비밀번호 확인란은 필수입니다.';
        } else if(userValue.password !== e.target.value) {
            msg = '패스워드가 일치하지 않습니다.';
        } else {
            msg = '패스워드가 일치합니다.';
            flag = true;
        }

        saveInputState({
            key: 'passwordCheck',
            inputVal: 'pass',
            msg,
            flag
        });

    };

      //나이 입력창 체인지 이벤트 핸들러
      const ageHandler = e => {

        let inputVal = e.target.value;

        const ageRegex = /[^0-9]/;

        let msg, flag = false;
        if(!inputVal) {
            msg = '나이를 입력해주세요.';
        } else if(ageRegex.test(inputVal)) {
            msg = '숫자 형식이 아닙니다.';
        } else {
            msg = '';
            flag=true;
        }

        saveInputState({
            key: 'age',
            inputVal,
            msg,
            flag
        });
    }


 // 이미지 파일 상태변수
 const [imgFile, setImgFile] = useState(null);

 // 이미지파일을 선택했을 때 썸네일 뿌리기
 const showThumbnailHandler = e => {
     //첨부된 파일 정보
     const file = $fileTag.current.files[0];
     console.log(file);

     const reader = new FileReader();
     reader.readAsDataURL(file);

     reader.onloadend = () => {
         setImgFile(reader.result);
     }

 };


 


 // 4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
 const isValid = () => {

    for(const key in correct) {
        const flag = correct[key];
        if(!flag) return false;
    }
    return true;
};

//회원 가입 처리 서버 요청
const fetchSignUpPost = () => {

    // JSON을 Blob타입으로 변경 후 FormData에 넣기
    const userJsonBlob = new Blob(
        [JSON.stringify(userValue)],
        { type: 'application/json' }
    );
    console.log('profileImage: ' + $fileTag.current.files[0]);

    // 이미지파일과 회원정보 JSON을 하나로 묶어야 함
    // FormData 객체를 활용해서.
    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    userFormData.append('profileImage', $fileTag.current.files[0]);

    fetch(API_BASE_URL, {
        method: 'POST',          
        body: userFormData
    })
    .then(res => {
        if(res.status === 200) {
            alert('회원가입에 성공했습니다!');
            //로그인 페이지로 리다이렉트
            // window.location.href = '/login';
            redirection('/login');
        } else {
            alert('서버와의 통신이 원활하지 않습니다.');
        }
    })
}


// 회원가입 버튼 클릭 이벤트 핸들러
const joinButtonClickHandler = e => {
    
    e.preventDefault();

    //회원 가입 서버 요청
    if(isValid()) {
        fetchSignUpPost();
    } else {
        alert('입력란을 다시 확인해 주세요!');
    }
}





  return (
    <div className="bg-gradient-primary">

    <div className="container">

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                    <div className="col-lg-7">
                        <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">회원가입</h1>
                            </div>
                            <form className="user">
                            <div className="thumbnail-box" onClick={() => $fileTag.current.click()}>
                                <img src= {imgFile || require('../../assets/img/image-add.png')} alt="profile" />
                                </div>
                            <label className='signup-img-label' htmlFor='profile-img'>프로필</label>
                            <input
                                id='profile-img'
                                type='file'
                                style={{display: 'none'}}
                                accept='image/*'
                                ref={$fileTag}
                                onChange={showThumbnailHandler}
                                
                                

                            />
                        
                            <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="userName"
                                        placeholder="이름" 
                                        required
                                        autoFocus
                                        onChange={nameHandler} />
                                       

                                <span className='pass-msg' style={
                                correct.userName
                                ? {color : 'blue'}
                                : {color : 'red'}
                            }>{message.userName}</span>
                              </div>
                               

                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="nick"
                                        placeholder="닉네임"
                                        required
                                        onChange={nickHandler} />

                                    <span className='pass-msg' style={
                                        correct.nick
                                        ? {color : 'blue'}
                                        : {color : 'red'}
                                    }>{message.nick}</span>
                                </div>

                          
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="email"
                                        placeholder="이메일 주소"
                                        required
                                        autoComplete="email"
                                        onChange={emailHandler} />

                                    <span className='pass-msg' style={
                                        correct.email
                                        ? {color : 'blue'}
                                        : {color : 'red'}
                                    }>{message.email}</span>
                                </div>

                                <div className="form-group">
                                    <input type="password" className="form-control form-control-user"
                                        id="password" placeholder="비밀번호" 
                                        required
                                        autoComplete="current-password"
                                        onChange={passwordHandler} />

                                    <span className='pass-msg' style={
                                        correct.password
                                        ? {color : 'blue'}
                                        : {color : 'red'}
                                    }>{message.password}</span>
                                </div>
                                    
                                      
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user"
                                            id="passwordCheck" placeholder="비밀번호 확인" 
                                            required
                                            autoComplete="check-password"
                                            onChange={pwCheckHandler} />
                                        <span id='check-span' className='pass-msg' style={
                                             correct.passwordCheck
                                        ? {color : 'blue'}
                                        : {color : 'red'}
                                    }>{message.passwordCheck}</span>
                                    </div>
                               
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="age"
                                        placeholder="나이"
                                        required
                                        onChange={ageHandler} />

                                    <span className='pass-msg' style={
                                        correct.age
                                        ? {color : 'blue'}
                                        : {color : 'red'}
                                    }>{message.age}</span>
                                </div>
                               
                                <div className="form-group">
                               성별
                               <span style={{ marginRight: 20}}></span> 
                               <input type="radio" name="gender" value="man" onClick={(e) => setUserValue({...userValue, gender: e.target.value})} />남
                               <span style={{ marginRight: 20}}></span>
                               <input type="radio" name="gender" value="woman"onClick={(e) => setUserValue({...userValue, gender: e.target.value})} />여
                               </div>
                               <div className="form-group">
                                주식경력
                                <span style={{ marginRight: 20}}></span>
                                <select onChange={(e) => setUserValue({...userValue, career: e.target.value})}>
                                <option selected disabled hidden>주식경력</option>
                                <option value="1">입문</option>
			                    <option value="2">1~3년</option>
                                <option value="3">4~10년</option>
                                <option value="4">10년 이상</option>
                                </select>
                                </div>
		
                                <a href="#" className="btn btn-primary btn-user btn-block" onClick={joinButtonClickHandler}>
                                    회원가입
                                </a>
                                                              
                            </form>
                            
                            <hr />
                            <div className="text-center">
                                <a className="small" href="forgot-password.html">비밀번호 변경</a>
                            </div>
                            <div className="text-center">
                                <a className="small" href="/login">로그인</a>
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

export default Join;