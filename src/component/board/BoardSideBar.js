import React from "react";

const BoardSideBar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
      style={{ position: "sticky" }}
    >
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">notice & board</div>
      </div>
      <hr className="sidebar-divider my-0"></hr>

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item">
        <div className="list-info">
          <a
            href="/notice"
            className="nav-link"
            style={{ padding: "0px 16px" }}
          >
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>공지사항</span>
          </a>
          <a
            href="/inquiryboard"
            className="nav-link"
            style={{ padding: "0px 16px" }}
          >
            <i className="fas fa-fw fa-tachometer-alt"></i>

            <span>문의 게시판</span>
          </a>
        </div>
        <hr className="sidebar-divider my-0"></hr>
      </li>
    </ul>
  );
};

export default BoardSideBar;
