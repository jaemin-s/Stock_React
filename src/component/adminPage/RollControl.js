import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { API_BASE_URL } from "../../config/host-config";
import Swal from "sweetalert2";

const RollControl = ({ isOpen, toggleHandler, blackEmail }) => {
  const [info, setInfo] = useState({});

  const handleForceGradeDown = async () => {
    console.log("blackEmail in handleForceGradeDown:", blackEmail);

    try {
      console.log("API_BASE_URL: ", API_BASE_URL);
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

  return <></>;
};

export default RollControl;
