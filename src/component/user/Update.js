import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

const Update = ({  toggleModifyModal  }) => {
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");
  const [modifyModal, setModifyModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      password,
      nick,
    };

    try {
        const response = await fetch("/api/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
    
        // 응답 객체의 상태 코드 확인
        if (!response.ok) {
          // 클라이언트 오류 발생
          const errorMessage = await response.text();
          console.error("클라이언트 오류:", response.status, errorMessage);
          return; // 오류 처리 여기서 진행하거나 상태 업데이트 등을 수행할 수 있습니다.
        }
    
        // 성공적인 응답을 받은 경우
        const data = await response.json();
        console.log("서버 응답 데이터:", data);
    
        // 원하는 동작 수행 (예: 회원 정보 수정 완료 메시지, 상태 업데이트 등)
      } catch (error) {
        console.error("네트워크 오류:", error);
        // 네트워크 오류 처리를 여기서 진행하거나 에러 메시지를 화면에 표시할 수 있습니다.
      }
    };
  const updateModal = (
    <Modal isOpen={modifyModal} toggle={toggleModifyModal}>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새로운 비밀번호"
          />
          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            placeholder="새로운 닉네임"
          />
        </ModalBody>
        <ModalFooter>
          <button type="submit">완료</button>
          <button type="button" onClick={() => setModifyModal(false)}>
            취소
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );

  return (
    <>
     <a
        className="nav-link"
        href="#0"
        style={{ padding: "0px 16px" }}
        onClick={() => setModifyModal(true)}
      >
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>수정</span>
      </a>

      {updateModal}
    </>
  );
};

export default Update;