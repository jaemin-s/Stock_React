import React from "react";

const GuideSideBar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        style={{ padding: "30px 20px" }}
        id="accordionSidebar"
      >
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Guide</div>
        </div>
        <hr className="sidebar-divider my-0"></hr>

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item">
          <div className="sidebar-heading ">기초 용어 설명</div>
          <a className="nav-link" href="#0" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>주식차트</span>
          </a>
          <a className="nav-link" href="#1" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>KOSPI / KOSDAQ</span>
          </a>
          <a className="nav-link" href="#2" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>매수 / 매도</span>
          </a>
          <a className="nav-link" href="#3" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>시가총액</span>
          </a>
          <a className="nav-link" href="#4" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>호가</span>
          </a>
          <a className="nav-link" href="#5" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>양봉</span>
          </a>
          <a className="nav-link" href="#6" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>음봉</span>
          </a>
          <a className="nav-link" href="#7" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>가격 제한폭</span>
          </a>
          <a className="nav-link" href="#8" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>예수금</span>
          </a>
          <a className="nav-link" href="#9" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>우선주</span>
          </a>
          <a className="nav-link" href="#10" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>상장폐지</span>
          </a>
          <hr className="sidebar-divider my-0"></hr>
          <div className="sidebar-heading">튜토리얼</div>
          <a className="nav-link" href="#11" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>메인 화면</span>
          </a>
          <a className="nav-link" href="#12" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>종목 검색</span>
          </a>
          <a className="nav-link" href="#13" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>매수 / 매도</span>
          </a>
          <a className="nav-link" href="#14" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>즐겨찾기</span>
          </a>
          <a className="nav-link" href="#15" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>mbti별 종목 추천</span>
          </a>
          <a className="nav-link" href="#16" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>랭킹</span>
          </a>
          <div className="sidebar-heading" style={{ fontSize: "15px" }}>
            자산관리 및 주가 추이
          </div>
          <a className="nav-link" href="#17" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>자산 정보</span>
          </a>
          <a className="nav-link" href="#18" style={{ padding: "5px 16px" }}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>주가 추이</span>
          </a>
          <hr className="sidebar-divider my-0"></hr>
          <a href="#19" style={{ textDecoration: "none" }}>
            <div className="sidebar-heading">주의사항</div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default GuideSideBar;
