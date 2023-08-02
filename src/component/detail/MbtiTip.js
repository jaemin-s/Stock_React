import React from "react";
import "./MbtiTip.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const MbtiTip = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      <FontAwesomeIcon icon={faQuestionCircle} style={{ marginLeft: "10px" }} />
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default MbtiTip;
