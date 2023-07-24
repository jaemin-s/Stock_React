// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../util/AuthContext";
// import { KAKAO_AUTH_URL } from "./OAuth"

// const KLogin = () => {

//     const redirection = useNavigate();

//     const { onLogin, isLoggedIn } = useContext(AuthContext);

//     useEffect(() => {
//         if (isLoggedIn) {
//                 setTimeout(() => {
//                 redirection('/');
//             }, 3000);
//         }
//     }, [isLoggedIn, redirection]);

   

//     const fetchKLogin = async() => {


//      const res = await fetch('http://localhost:8181/api/user/callback/kakao', {
//         method: 'GET',
//         headers: { 'content-type' : 'application/json' },
//         body: JSON.stringify({
           
//          })
//     });

//     if (res.status === 400) {
//         const text = await res.text();
//         alert(text);
//         return;
//     }

//     const { token, email } = await res.json();

//     // Context API를 사용하여 로그인 상태를 업데이트합니다.
//     onLogin(token, email);
    

//      //홈으로 리다이렉트
//      redirection('/');

// }

    

// }
// export default fetchKLogin;


// const loginByKakao = (data) => async (dispatch, getState, { history }) => {
//     try {
//       // 카카오 로그인으로 받아온 토큰으로 서버에서 jwt 토근을 받아옴
//       const res = await userAPI.loginByKakao(data);
  
//       const token = res.data.token;
//       const username = res.data.username;
//       const userId = res.data.userid;
  
       
//       // 헤더에 토큰 저장
//       axios.defaults.headers.common['token'] = `${token}`;
  
//       // 토큰으로 유저정보 받아옴
//       dispatch(fetchUserProfile(1));
//     } catch (error) {
//       console.error(error);
//       dispatch(setLoginError(error.response.data.errorMessage));
//     }
//   };

async function checkToken() {
    await fetch(`http://localhost:8181/api/user/callback/kakao`, {
        method: "GET",
        headers: {
           
        },
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("LOGIN_ACCESS_TOKEN", res.data.token);
            localStorage.setItem("USER_EMAIL", res.data.email);
        });

}
