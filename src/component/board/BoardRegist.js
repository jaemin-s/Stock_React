import React, { useEffect, useState } from "react";
import "./BoardRegist.scss";
import BoardSideBar from "./BoardSideBar";
import RegistFrame from "./RegistFrame";
import { useLocation } from "react-router-dom";
import BoardDetail from "./BoardDetail";

const BoardRegist = () => {
  const [boardType, setBoardType] = useState();
  const [id, setId] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedType = searchParams.get("type");
  useEffect(() => {
    setBoardType(searchParams.get("boardType"));
    setId(searchParams.get("id"));
  }, []);

  function showHandler() {
    if (selectedType === "read") {
      return (
        <BoardDetail
          boardType={searchParams.get("boardType")}
          id={searchParams.get("id")}
        />
      );
    } else if (selectedType === "write") {
      return <RegistFrame boardType={searchParams.get("boardType")} />;
    } else {
      return;
    }
  }
  return (
    <>
      <div id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <BoardSideBar />
          <div className="container-fluid">
            <div>
              <h2 className="board-title">
                {boardType === "notice" ? "공지사항" : "문의사항"}
              </h2>
              {showHandler()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardRegist;
