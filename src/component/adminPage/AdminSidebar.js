import React from "react";
import "./AdminSidebar.scss";

const AdminSidebar = ({ categoryData, categoryActivateHandler }) => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion admin-side-bar"
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
      {categoryData.map((item, index) => (
        <li className="nav-item" key={index} onClick={categoryActivateHandler}>
          <div
            className={
              item.isActivate
                ? "sidebar-heading activate-item"
                : "sidebar-heading "
            }
          >
            {item.name}
          </div>
          <hr className="sidebar-divider my-0"></hr>
        </li>
      ))}
    </ul>
  );
};

export default AdminSidebar;
