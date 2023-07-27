import React from "react";

const AdminTopMenu = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                id="my-info"
                href="#"
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                유저관리
              </a>
            </li>
            <li className="nav-item" id="border" style={{ fontSize: 30 }}></li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="asset"
                href="#"
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                유저통계
              </a>
            </li>
            <li className="nav-item" id="border" style={{ fontSize: 30 }}></li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="having-info"
                href="#"
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                전체 거래내역 조회
              </a>
            </li>
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
