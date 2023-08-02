import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import RollControl from "./RollControl";

import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config/host-config";
const Dropdown = ({ onOpenModal, email, getUserHandler, userGrade }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isRollModalOpen, setIsRollModalOpen] = useState(false);

  // 등급관리
  const handleRollControlClick = () => {
    if (userGrade === "BLACK") {
      Swal.fire({
        title:
          "<div style='font-size:25px'>이 회원은 이미 'BLACK'회원 입니다.</div>",
      });
      return;
    }

    setIsRollModalOpen(true);
    setIsToggle(false);

    Swal.fire({
      title:
        "<div style='font-size:25px'>'BLACK' 등급으로 강등시키겠습니까?</div>",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleForceGradeDown(email);
        Swal.fire("강등에 성공했습니다!", "", "success").then(() => {
          // window.location.reload();
          getUserHandler();
        });
      } else if (result.isDenied) {
        Swal.fire("강등을 취소합니다.", "", "info");
      }
    });
  };

  const handleForceGradeDown = async (blackEmail) => {
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
      }
    } catch (networkError) {}
  };

  return (
    <>
      <div className="dropdown-item" onClick={handleRollControlClick}>
        <button
          className="button-58"
          onClick={() => onOpenModal(email)}
          style={{ margin: "0" }}
        >
          등급 강등
        </button>
      </div>

      {isRollModalOpen && (
        <RollControl
          isOpen={isRollModalOpen}
          toggleHandler={() => setIsRollModalOpen(false)}
          blackEmail={email}
          handleForceGradeDown={handleForceGradeDown}
          getUserHandler={getUserHandler}
        />
      )}
    </>
  );
};

export default Dropdown;
