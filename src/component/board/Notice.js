import React, { useEffect, useState } from "react";
import "./Notice.scss";
import Paging from "./Paging";
import BoardSideBar from "./BoardSideBar";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BoardContent from "./BoardContent";
const Notice = ({ boardType }) => {
  const redirection = useNavigate();
  const [page, setPage] = useState(1);
  const [boardData, setboardData] = useState();

  async function getBoardList() {
    const res = await fetch(
      "http://localhost:8181/api/board/notice" +
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
    console.log("type: notice");
    redirection("/regist/?boardType=notice&id=" + id + "&type=read");
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
                        공지사항
                      </a>
                      {/* <a>{page}</a> */}
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

            <NavLink to="/regist?boardType=notice&type=write">
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

export default Notice;
