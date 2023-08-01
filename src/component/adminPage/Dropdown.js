import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import InfoControl from "./InfoControl";
import RollControl from "./RollControl";
import ScoreControl from "./ScoreControl";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config/host-config";
const Dropdown = ({ onOpenModal, email, getUserHandler }) => {
  const [isToggle, setIsToggle] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRollModalOpen, setIsRollModalOpen] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  // 등급관리
  const handleRollControlClick = () => {
    setIsRollModalOpen(true);
    setIsInfoModalOpen(false);
    setIsPointModalOpen(false);
    setIsToggle(false);

    Swal.fire({
      title: "'BLACK' 등급으로 강등시키겠습니까?",
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

  // 정보관리
  const handleInfoControlClick = () => {
    setIsInfoModalOpen(true);
    setIsRollModalOpen(false);
    setIsPointModalOpen(false);
    setIsToggle(false);
  };

  // 포인트 관리
  const handlePointControlClick = () => {
    setIsPointModalOpen(true);
    setIsInfoModalOpen(false);
    setIsRollModalOpen(false);
    setIsToggle(false);
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
    <ul className="navbar-nav">
      <li
        className={
          isToggle
            ? "nav-item dropdown no-arrow show"
            : "nav-item dropdown no-arrow"
        }
        onClick={handleToggle}
        style={{ margin: "0 auto" }}
      >
        <button
          className={
            isToggle
              ? "nav-link dropdown-toggle slide-up"
              : "nav-link dropdown-toggle slide-down"
          }
          id="userDropdown"
          type="button"
          aria-haspopup="true"
          aria-expanded={isToggle ? "true" : "false"}
        >
          <span style={{ fontWeight: 600, fontSize: 20 }}>
            &nbsp;
            <span className={isToggle ? "rotate-up" : "rotate-down"}>
              {isToggle ? "↩" : "↪"}
            </span>
          </span>
        </button>

        <div
          className={
            isToggle
              ? "dropdown-menu dropdown-menu-right shadow animated--grow-in show"
              : "dropdown-menu dropdown-menu-right shadow animated--grow-in"
          }
          aria-labelledby="userDropdown"
          style={{ width: 1, position: "absolute", left: -47 }}
        >
          <li className="dropdown-item" onClick={handleRollControlClick}>
            <button className="nav-link" onClick={() => onOpenModal(email)}>
              등급관리
            </button>
          </li>
          <hr className="border-line" />
          <li className="dropdown-item" onClick={handleInfoControlClick}>
            <button className="nav-link">정보관리</button>
          </li>
          <hr className="border-line" />
          <li className="dropdown-item" onClick={handlePointControlClick}>
            <button className="nav-link">포인트 관리</button>
          </li>
        </div>
      </li>

      <div isOpen={isRollModalOpen} toggle={handleRollControlClick}>
        <RollControl
          isOpen={isRollModalOpen}
          toggleHandler={() => setIsRollModalOpen(false)}
        />
      </div>

      <div isOpen={isInfoModalOpen} toggle={handleInfoControlClick}>
        <InfoControl
          isOpen={isInfoModalOpen}
          toggleHandler={() => setIsInfoModalOpen(false)}
        />
      </div>

      <div isOpen={isPointModalOpen} toggle={handlePointControlClick}>
        <ScoreControl
          isOpen={isPointModalOpen}
          toggleHandler={() => setIsPointModalOpen(false)}
        />
      </div>
    </ul>
  );
};

export default Dropdown;
