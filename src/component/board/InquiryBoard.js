import React, { useEffect, useState } from "react";
import "./InquiryBoard.scss";
import Paging from "./Paging";
import BoardSideBar from "./BoardSideBar";
import { NavLink, useNavigate } from "react-router-dom";
import BoardContent from "./BoardContent";
const InquiryBoard = ({ props }) => {
  const [page, setPage] = useState(1);
  const [boardData, setboardData] = useState();
  const navigate = useNavigate();

  async function getBoardList() {
    const res = await fetch(
      "http://localhost:8181/api/board/inquiry" +
        "?size=" +
        8 +
        "&page=" +
        (page - 1)
    );
    const data = await res.json();
    setboardData({
      content: data.content,
      totalElements: data.totalElements,
      totlaPages: data.totalPages,
      pageIndex: data.pageable.pageNumber,
      offset: data.pageable.offset,
    });
    console.log(data);
  }
  useEffect(() => {
    getBoardList();
  }, [page]);

  function titleClickHandler(id) {
    console.log("click");
    console.log("id:" + id);
    console.log("type: inquiry");
    navigate("/regist/?boardType=inquiry&id=" + id + "&type=read");
  }
  return (
    <>
      <div id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <BoardSideBar />
          <div className="container-fluid">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="my-info"
                        href="#"
                        style={{ fontWeight: 700, fontSize: 25 }}
                      >
                        문의 게시판
                      </a>
                    </li>
                  </ul>
                  <br />
                  <br />
                </div>
              </nav>
            </div>
            <BoardContent
              boardData={boardData}
              titleClickHandler={titleClickHandler}
            />
            {boardData && (
              <Paging
                page={page}
                count={boardData.totalElements}
                setPage={setPage}
              />
            )}
            <br />
            <NavLink to="/regist?boardType=inquiry&type=write">
              <button className="button-58" style={{ float: "right" }}>
                글쓰기
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default InquiryBoard;
