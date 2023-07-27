import React from "react";

const AdminSidebar = () => {
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
        <div className="sidebar-brand-text mx-3">관리자 전용</div>
      </div>
      <hr className="sidebar-divider my-0"></hr>

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item">
        <div className="sidebar-heading ">유저 관리</div>
        <div className="list-info"></div>

        <hr className="sidebar-divider my-0"></hr>

        <div className="sidebar-heading">추가할거</div>

        <hr className="sidebar-divider my-0"></hr>

        <div className="sidebar-heading">거래 내역</div>

        <div className="sidebar-heading">추가할거</div>
        <ul style={{ padding: "0 0 0 10px" }}>
          <div
            className="nav-link"
            style={{
              color: "white",
              cursor: "pointer",
              padding: "4px 2px",
              fontSize: "15px",
            }}
          ></div>
        </ul>
        <hr className="sidebar-divider my-0"></hr>
        <div className="sidebar-heading">추가할거</div>
        <ul style={{ padding: "0 0 0 10px" }}>
          <div
            className="nav-link"
            style={{
              color: "white",
              cursor: "pointer",
              padding: "4px 2px",
              fontSize: "15px",
            }}
          >
            {/* ({like.stockCode}) */}
          </div>
        </ul>
        <hr className="sidebar-divider my-0"></hr>
      </li>
    </ul>
  );
};

export default AdminSidebar;
