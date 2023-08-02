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
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
    }
  };

  handleForceGradeDown();
  return <></>
};

export default RollControl;
