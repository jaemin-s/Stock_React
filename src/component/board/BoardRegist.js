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
  const { state } = location;
  const selectedType = state.type;
  console.log("savedPage in BoardRegist", state.savedPage);
  useEffect(() => {
    setBoardType(state.boardType);
    setId(state.id);
  }, []);

  function showHandler() {
    if (selectedType === "read") {
      return (
        <BoardDetail
          boardType={state.boardType}
          id={state.id}
          savedPage={state.savedPage}
        />
      );
    } else if (selectedType === "write") {
      return <RegistFrame boardType={state.boardType} />;
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
