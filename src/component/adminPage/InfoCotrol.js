import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';

const InfoControl = ({ toggleHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // 모달 표시 및 닫기를 위한 핸들러 함수
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    toggleHandler();
  };

  return (
    <>
      <Modal isOpen={isModalOpen} toggle={toggleModal} style={{ width: 1000 }}>
        <ModalBody>
          <div className='user-info-box'>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>이름</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>닉네임</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>이메일</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>전화번호</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>성별</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>나이</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>경력</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>MBTI</th>
                  <th style={{ backgroundColor: "#3385ff", color: "white", fontWeight: "600" }}>등급</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>홍길동</td>
                  <td>춘식이</td>
                  <td>hong@gmail.com</td>
                  <td>01024093845</td>
                  <td>남</td>
                  <td>26</td>
                  <td>입문</td>
                  <td>ENFP</td>
                  <td>브론즈</td>
                </tr>
                {/* 추가적인 사용자 정보들을 이곳에 표시 */}
              </tbody>
            </table>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default InfoControl;