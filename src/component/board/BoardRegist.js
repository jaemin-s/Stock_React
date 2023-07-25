import React, { useEffect, useState } from "react";
import "./BoardRegist.scss";
import BoardSideBar from "./BoardSideBar";
import RegistFrame from "./RegistFrame";
import { useLocation } from "react-router-dom";

const BoardRegist = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const boardType = searchParams.get("boardType");

  console.log("boardType: ", boardType);
  return (
    <>
      <body id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <BoardSideBar />
          <div className="container-fluid">
            <div>
              <h2 className="board-title">
                {boardType === "notice" ? "공지사항" : "문의사항"}
              </h2>
              <RegistFrame boardType={boardType} />
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default BoardRegist;
