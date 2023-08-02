import React, { useContext, useState } from "react";
import AuthContext from "../util/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/host-config";
import Swal from "sweetalert2";
const Delete = () => {
  const { isLoggedIn, email, onLogout } = useContext(AuthContext);
  const [responseMessage, setResponseMessage] = useState("");
  const redirection = useNavigate();

  const handleDeleteUser = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    const confirmHandler = async () => {
      const token = localStorage.getItem("LOGIN_ACCESS_TOKEN");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        // 서버에 DELETE 요청 보내기
        const response = await fetch(
          API_BASE_URL + `/api/user/deleteInfo/${email}`,
          {
            method: "DELETE",
            headers: headers,
          }
        );
        if (response.ok) {
          // alert("회원 탈퇴가 완료되었습니다.");
          onLogout();
          redirection("/");
        } else {
          // alert("회원 탈퇴를 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        // setResponseMessage(
        // alert("서버와 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };

    Swal.fire({
      title: "정말로 회원 탈퇴하시겠습니까?",
      showDenyButton: true,
      icon: "question",
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        confirmHandler();
        Swal.fire("탈퇴되었습니다!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("취소되었습니다!", "", "error");
      }
    });
  };

  return (
    <div>
      <a
        className="nav-link"
        href="#0"
        style={{ padding: "0px 16px" }}
        onClick={handleDeleteUser}
      >
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>탈퇴</span>
      </a>

      <p>{responseMessage}</p>
    </div>
  );
};

export default Delete;
