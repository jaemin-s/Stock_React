import React from "react";

const MyHeader = ({ setHere, setInfoData }) => {
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
                onClick={() => {
                  setHere("info");
                  setInfoData({
                    stockCode: [],
                    stockName: [],
                  });
                }}
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                내 정보
              </a>
            </li>
            <li className="nav-item" id="border" style={{ fontSize: 30 }}>
              <p>|</p>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="asset"
                href="#"
                onClick={() => {
                  setHere("asset");
                  setInfoData({
                    stockCode: [],
                    stockName: [],
                  });
                }}
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                자산관리
              </a>
            </li>
            <li className="nav-item" id="border" style={{ fontSize: 30 }}>
              <p>|</p>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="having-info"
                href="#"
                onClick={() => {
                  setHere("havingInfo");
                  setInfoData({
                    stockCode: [],
                    stockName: [],
                  });
                }}
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                보유 종목 주가 추이
              </a>
            </li>
            <li className="nav-item" id="border" style={{ fontSize: 30 }}>
              <p>|</p>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="like-info"
                href="#"
                onClick={() => {
                  setHere("likeInfo");
                  setInfoData({
                    stockCode: [],
                    stockName: [],
                  });
                }}
                style={{ fontWeight: 700, fontSize: 25 }}
              >
                관심 종목 주가 추이
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

export default MyHeader;
