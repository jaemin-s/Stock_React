import React, { useContext, useEffect } from 'react'
import AuthContext from '../util/AuthContext';
import { Container } from 'reactstrap';
import styled from '@emotion/styled';

const KakaoAuthHandle = (props) => {

    const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    `

    const { onLogin, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        let code = new URL(window.location.href).searchParams.get('code');
        console.log('code: ', code);

        const kakaoLogin = async() => {
            const res = await fetch(`http://localhost:8181/api/user/callback/kakao?code=${code}`);
            const { token, email, image } = await res.json();

            // Context API를 사용하여 로그인 상태를 업데이트합니다.
            onLogin(token, email, image);
            window.location.href = '/';
        }
        kakaoLogin();


    }, []);

  return (
    <>
      <Container></Container>
    </>
  )
}

export default KakaoAuthHandle;


