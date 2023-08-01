import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import InfoControl from "./InfoControl";
import RollControl from "./RollControl";
import ScoreControl from "./ScoreControl";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config/host-config";
const Dropdown = ({ onOpenModal, email, getUserHandler, userGrade }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRollModalOpen, setIsRollModalOpen] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

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
    setIsInfoModalOpen(false);
    setIsPointModalOpen(false);
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
    console.log("blackEmail in handleForceGradeDown:", blackEmail);

    try {
      console.log(
        "RequestBody: ",
        JSON.stringify({
          blackEmail: blackEmail,
          adminEmail: localStorage.getItem("LOGIN_USEREMAIL"),
        })
      );

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
      console.log("Response Status:", res.status);

      if (res.status === 200) {
        const data = await res.json();
        console.log("Response data: ", data);
        console.log("blackEmail: ", blackEmail);
      }
    } catch (networkError) {
      console.log("blackEmail: ", blackEmail);
      console.error("Network error:", networkError);
    }
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

      <div isOpen={isRollModalOpen} toggle={handleRollControlClick}>
        <RollControl
          isOpen={isRollModalOpen}
          toggleHandler={() => setIsRollModalOpen(false)}
        />
      </div>
    </>
  );
};

export default Dropdown;
