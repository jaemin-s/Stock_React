import React, { useContext, useState } from "react";
import AuthContext from "../util/AuthContext";

const Delete = () => {
  const { isLoggedIn, email, onLogout } = useContext(AuthContext);
  const [responseMessage, setResponseMessage] = useState("");

  const handleDeleteUser = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const shouldDelete = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (shouldDelete) {
      const token = localStorage.getItem("LOGIN_ACCESS_TOKEN");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

        // 서버에 DELETE 요청 보내기
        // const response = await fetch(`${email}`, {
        //   method: "DELETE",
        //   headers: headers,
        // });
        try {
          const response = await fetch("http://localhost:8181/api/user/deleteInfo", {
            method: "DELETE",
            headers: {
              // "Content-Type": "application/json",
            },
            body: {email:localStorage.getItem("LOGIN_USEREMAIL")},
          });

        if (response.ok) {
          setResponseMessage("회원 탈퇴가 완료되었습니다.");
          onLogout();
        } else {
          setResponseMessage("회원 탈퇴를 실패했습니다. 다시 시도해주세요.");
        }
        
      } catch (error) {
        setResponseMessage(
          "서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      }
    }
  }

  return (
    <div>
      <button onClick={handleDeleteUser}>회원 탈퇴</button>
      <p>{responseMessage}</p>
    </div>
  );
  }

export default Delete;