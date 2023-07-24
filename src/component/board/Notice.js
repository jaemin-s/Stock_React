import React from "react";
import "./Notice.scss";

const announcement = () => {
  return (
    <>
      <body id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <ul
            class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
            style={{ position: "sticky" }}
          >
            <div class="sidebar-brand d-flex align-items-center justify-content-center">
              <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
              </div>
              <div class="sidebar-brand-text mx-3">notice & board</div>
            </div>
            <hr class="sidebar-divider my-0"></hr>

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item">
              <>
                {/* <div class="sidebar-heading ">공지사항</div> */}
                <div className="list-info">
                  <a
                    class="nav-link"
                    href="#1"
                    className="nav-link"
                    style={{ padding: "0px 16px" }}
                  >
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>공지사항</span>
                  </a>
                  <a
                    class="nav-link"
                    href="/inquiryboard"
                    className="nav-link"
                    style={{ padding: "0px 16px" }}
                  >
                    <i class="fas fa-fw fa-tachometer-alt"></i>

                    <span>문의 게시판</span>
                  </a>
                </div>
              </>

              <hr class="sidebar-divider my-0"></hr>
            </li>
          </ul>

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
                  <th scope="col">작성일</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-07-23</td>
                  <td>공지사항 1</td>
                  <td>작성자 1</td>
                </tr>
                <tr>
                  <td>2023-07-24</td>
                  <td>공지사항 2</td>
                  <td>작성자 2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </>
  );
};

export default announcement;
