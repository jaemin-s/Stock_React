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