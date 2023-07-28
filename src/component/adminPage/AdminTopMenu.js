import React from "react";
import "./AdminTopMenu.scss";

const AdminTopMenu = ({ categoryData, categoryActivateHandler }) => {
  return (
    <div
      className="admin-top-menu"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {categoryData.map((item, index) => (
              <li
                className={
                  item.isActivate ? "nav-item activate-item" : "nav-item"
                }
                key={index}
                style={{ width: 100 / categoryData.length + "%" }}
                onClick={categoryActivateHandler}
              >
                <a
                  className="nav-link"
                  style={{ fontWeight: 700, fontSize: 25 }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </nav>
    </div>
  );
};

export default AdminTopMenu;
