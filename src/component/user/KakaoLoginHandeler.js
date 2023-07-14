// redux > modules > user.js

import axios from "axios";

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://localhost:8181/oauth/callback/kakao?code=${code}`,
    })
      .then((res) => {
        console.log(res); // 토큰이 넘어올 것임
        
        const ACCESS_TOKEN = res.data.token;
        
        localStorage.setItem("LOGIN_ACCESS_TOKEN", ACCESS_TOKEN);    //예시로 로컬에 저장함    
        
        history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        
      
    }
  )}
};

export default kakaoLogin;