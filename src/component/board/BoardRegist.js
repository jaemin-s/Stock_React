import React, { useEffect, useState } from "react";
import "./BoardRegist.scss";
const BoardRegist = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
  });

  async function getInfo() {
    const res = await fetch(
      "http://localhost:8181/api/user/myInfo/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
    console.log("myInfo: ", myInfo);
    setUserInfo({
      name: myInfo.name,
    });
  }

  useEffect(() => {
    getInfo();
  }, []);
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
                    href="/notice"
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
            <div>
              <h2 className="board-title">문의사항</h2>
              <table class="table" id="inquiryBoard">
                <tbody>
                  <tr>
                    <td className="writer">작성자</td>
                    <td>
                      <input
                        class="form-control input-sm"
                        value={userInfo.name}
                        readonly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="title">제목</td>
                    <td>
                      <input
                        class="form-control input-sm"
                        name="title"
                        id="title"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="content">내용</td>
                    <td>
                      <textarea
                        class="form-control"
                        rows="10"
                        name="content"
                        id="content"
                        type="text"
                        maxlength="300"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                className="button-58"
                id="regist-btn"
                style={{ float: "right" }}
              >
                등록
              </button>
              <a href="/inquiryBoard">
                <button className="button-58-1" style={{ float: "right" }}>
                  취소
                </button>
              </a>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default BoardRegist;
