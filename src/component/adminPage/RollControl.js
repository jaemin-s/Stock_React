import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { API_BASE_URL } from "../../config/host-config";

const RollControl = ({ isOpen, toggleHandler, blackEmail }) => {
  const [info, setInfo] = useState({});
  const handleForceGradeDown = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/api/user/forcegradedown", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          blackEmail: blackEmail,
          adminEmail: localStorage.getItem("LOGIN_USEREMAIL"),
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        console.log("Response data: ", data);
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
    }
  };

  // handleForceGradeDown();
  return (
    <Modal isOpen={isOpen} toggle={toggleHandler} style={{ width: 1000 }}>
      <ModalBody>
        <div className="roll-box" style={{ display: "flex" }}>
          <div
            className="roll-check"
            style={{
              width: 160,
              margin: "0 auto",
              height: 150,
              textAlign: "center",
              borderRight: "1px solid black",
            }}
          >
            <p style={{ marginTop: 50 }}>홍길동님의 등급은 "브론즈" 입니다.</p>
          </div>
          <div>등급 지정하기</div>
          <div className="roll-option">
            <select>
              <option>블랙</option>
              <option>브론즈</option>
              <option>실버</option>
              <option>골드</option>
            </select>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default RollControl;
