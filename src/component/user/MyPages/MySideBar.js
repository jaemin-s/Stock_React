import React from "react";
import Update from "../Update";
import Delete from "../Delete";

const MySideBar = ({
  toggleModifyModal,
  userInfo,
  handleLikeStockClick,
  handleStockClick,
  favoriteInfo,
  here,
}) => {
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
        <div className="sidebar-brand-text mx-3">MyPage</div>
      </div>
      <hr className="sidebar-divider my-0"></hr>

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item">
        {here === "info" && !!here ? (
          <>
            <div className="sidebar-heading ">내 정보</div>
            <div className="list-info">
              <Update toggleModifyModal={toggleModifyModal} />
              <Delete />
            </div>
          </>
        ) : null}

        <hr className="sidebar-divider my-0"></hr>

        {here === "asset" && !!here ? (
          <>
            <div className="sidebar-heading">자산 관리</div>
            <div className="list-assets">
              <a className="nav-link" href="#2" style={{ padding: "0px 16px" }}>
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>내 자산 정보</span>
              </a>
              <a className="nav-link" href="#0" style={{ padding: "0px 16px" }}>
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>자산 변동</span>
              </a>
              <a className="nav-link" href="#0" style={{ padding: "0px 16px" }}>
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>총 자산</span>
              </a>
            </div>
            <hr className="sidebar-divider my-0"></hr>

            <div className="sidebar-heading">거래 내역</div>
            <a
              className="nav-link"
              href="#3-1"
              style={{ padding: "0px 16px", margin: "0 0 0 20px" }}
            >
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>상세 내역</span>
            </a>
          </>
        ) : null}

        {here === "havingInfo" && !!here ? (
          <>
            <div className="sidebar-heading">보유 종목</div>
            <ul style={{ padding: "0 0 0 10px" }}>
              {userInfo.myStocks.map((trade, index) => (
                <div
                  className="nav-link"
                  key={index}
                  onClick={() => handleStockClick(trade)}
                  style={{
                    color: "white",
                    cursor: "pointer",
                    padding: "4px 2px",
                    fontSize: "15px",
                  }}
                >
                  {trade.stockName}
                </div>
              ))}
            </ul>
            <hr className="sidebar-divider my-0"></hr>
          </>
        ) : null}

        {here === "likeInfo" && !!here ? (
          <>
            <div className="sidebar-heading">관심 종목</div>
            <ul style={{ padding: "0 0 0 10px" }}>
              {Array.isArray(favoriteInfo) && favoriteInfo.length > 0 ? (
                favoriteInfo.map((like, index) => (
                  <div
                    className="nav-link"
                    key={index}
                    onClick={() => handleLikeStockClick(like)}
                    style={{
                      color: "white",
                      cursor: "pointer",
                      padding: "4px 2px",
                      fontSize: "15px",
                    }}
                  >
                    {like.stockName}
                  </div>
                ))
              ) : (
                <p>관심 종목이 없습니다.</p> // 관심 종목이 없을 때의 문구 유지
              )}
            </ul>
            <hr className="sidebar-divider my-0"></hr>
          </>
        ) : null}
      </li>
    </ul>
  );
};

export default MySideBar;
