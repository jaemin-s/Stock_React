import React, { useState } from "react";
import "./InquiryBoard.scss";
import Paging from "./Paging";
import BoardSideBar from "./BoardSideBar";
import { NavLink } from "react-router-dom";
const InquiryBoard = ({ props }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      <body id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
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
            <table className="table" style={{ marginTop: "60px" }}>
              <thead>
                <tr>
                  <th scope="col">번호</th>
                  <th scope="col">작성일</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2</td>
                  <td>2023-07-23</td>
                  <td>문의사항 1</td>
                  <td>작성자 1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>2023-07-24</td>
                  <td>문의사항 2</td>
                  <td>작성자 2</td>
                </tr>
              </tbody>
            </table>
            <Paging page={page} count={100} setPage={setPage} />
            <br />
            <NavLink to="/regist?boardType=inquiry">
              <button className="button-58" style={{ float: "right" }}>
                글쓰기
              </button>
            </NavLink>
          </div>
        </div>
      </body>
    </>
  );
};

export default InquiryBoard;
