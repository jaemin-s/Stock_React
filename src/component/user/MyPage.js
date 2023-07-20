import React, { useContext, useState } from "react";
import "./MyPage.scss";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AuthContext from "../util/AuthContext";
// Doughnut 차트 import(npm install chart.js react-chartjs-2)

// Doughnut 차트 등록
Chart.register(ArcElement, Tooltip, Legend);

function MyPage() {
  const { userName, userNick, userEmail, gender, age, career } =
    useContext(AuthContext);

  // Doughnut 차트에 들어갈 내용
  const data = {
    labels: ["삼성전자", "SK하이닉스", "대한항공", "현금"],
    // 주식 종목 / 현금
    datasets: [
      {
        label: "금액",
        data: [1000000, 2500000, 1000000, 500000],
        backgroundColor: ["blue", "red", "skyblue", "orange"],
        // 순서대로 금액과 색깔 설정
      },
    ],
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const options = {};

  const [info, setInfo] = useState(true);
  const [asset, setAsset] = useState(false);

  const showInfo = () => {
    setInfo(true);
    setAsset(false);
  };

  const showAsset = () => {
    setInfo(false);
    setAsset(true);
  };

  const viewInfo = (
    <>
      {/* <!-- Page Heading --> */}
      <div className="basic-info">
        <br />
        <br />
        <br />
        <br />
        <div id="1">'{userEmail}' 님의 현재 등수 : 45 등</div>
      </div>
      <br />
      <br />
      {/* 회원정보 */}
      <div className="userInfo">
        <div className="info">
          <h5 className="name">
            이름<span className="border">|</span> {userName}
          </h5>
          <h5 className="nick">
            닉네임<span className="border">|</span> {userNick}
          </h5>
          <h5 className="email">
            이메일<span className="border">|</span> {userEmail}
          </h5>
          <h5 className="gender">
            성별<span className="border">|</span> {gender}
          </h5>
          <h5 className="age">
            나이<span className="border">|</span> {age}세
          </h5>
          <h5 className="career">
            경력<span className="border">|</span> {career}년
          </h5>
        </div>

        {/* 프로필사진 */}
        <div className="profile">
          <img
            src={
              // profileUrl ||
              require("../user/image/anonymous.png")
            }
            alt="@"
            className="center-image"
          ></img>
        </div>
      </div>
    </>
  );

  const viewAsset = (
    <>
      <br />
      <br />
      {/* 자산 정보와 그래프 */}
      <h4 id="2" className="assetInfo">
        자산 정보
      </h4>
      <br />
      <div className="assets">
        <div className="assetsDetail">
          <h5 className="asset">
            자산평가<span className="border">|</span> 10,028,843 원
          </h5>
          <h5 className="having-stock">
            보유 주식 수<span className="border">|</span> 삼성전자 8주,
            SK하이닉스 4주, 대한항공 25주
          </h5>
          <h5 className="having-cash">
            보유 현금<span className="border">|</span> 28,520 원
          </h5>
          <h5 className="return">
            수익률<span className="border">|</span> 18.6 %
          </h5>
          <h5 className="evaluation">
            주식 평가금액<span className="border">|</span> 943,857 원
          </h5>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <Doughnut data={data} options={options}></Doughnut>
        </div>
      </div>

      {/* 거래내역 테이블 */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4 id="3-1" style={{ flex: 1, textAlign: "center", fontSize: "40px" }}>
        거래 내역
      </h4>
      <br />
      <br />
      <table className="collapsed" id="table">
        <thead>
          <tr className="high">
            <th scope="col">거래 일자</th>
            <th scope="col">매수 / 매도</th>
            <th scope="col">종목</th>
            <th scope="col">매매 수량</th>
            <th scope="col">매매 금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">23/07/03</th>
            <td>매수</td>
            <td>대한항공(003490)</td>
            <td>25</td>
            <td>1,000,000</td>
          </tr>
          <tr>
            <th scope="row">23/06/10</th>
            <td>매도</td>
            <td>SK하이닉스(000660)</td>
            <td>4</td>
            <td>2,500,000</td>
          </tr>
          <tr>
            <th scope="row">23/05/11</th>
            <td>매수</td>
            <td>삼성전자(005930)</td>
            <td>8</td>
            <td>1,000,000</td>
          </tr>
          {expanded && ( //더보기 누르면 추가로 나올 내용
            <>
              <tr>
                <th scope="row">23/04/09</th>
                <td>매도</td>
                <td>현대차(005380)</td>
                <td>1</td>
                <td>12,3900</td>
              </tr>
              <tr>
                <th scope="row">23/03/03</th>
                <td>매도</td>
                <td>기아(000270)</td>
                <td>4</td>
                <td>500,000</td>
              </tr>
              <tr>
                <th scope="row">23/02/18</th>
                <td>매도</td>
                <td>삼성전자(005930)</td>
                <td>6</td>
                <td>170,300</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="button">
        <button className="button" onClick={toggleExpanded}>
          {expanded ? "접기" : "더보기"}
        </button>
      </div>
    </>
  );
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
              <div class="sidebar-brand-text mx-3">MyPage</div>
            </div>
            <hr class="sidebar-divider my-0"></hr>

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item">
              {info ? (
                <>
                  <div class="sidebar-heading ">내 정보</div>
                  <div className="list-info">
                    <a
                      class="nav-link"
                      href="#1"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>정보</span>
                    </a>
                    <a
                      class="nav-link"
                      href="#0"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>수정</span>
                    </a>
                    <a
                      class="nav-link"
                      href="#0"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>탈퇴</span>
                    </a>
                  </div>
                </>
              ) : null}

              <hr class="sidebar-divider my-0"></hr>

              {asset ? (
                <>
                  <div class="sidebar-heading">자산 관리</div>
                  <div className="list-assets">
                    <a
                      class="nav-link"
                      href="#2"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>내 자산 정보</span>
                    </a>
                    <a
                      class="nav-link"
                      href="#0"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>자산 변동</span>
                    </a>
                    <a
                      class="nav-link"
                      href="#0"
                      className="nav-link"
                      style={{ padding: "0px 16px" }}
                    >
                      <i class="fas fa-fw fa-tachometer-alt"></i>
                      <span>총 자산</span>
                    </a>
                  </div>
                  <hr class="sidebar-divider my-0"></hr>

                  <div class="sidebar-heading">거래 내역</div>
                  <a
                    class="nav-link"
                    href="#3-1"
                    className="nav-link"
                    style={{ padding: "0px 16px", margin: "0 0 0 20px" }}
                  >
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>상세 내역</span>
                  </a>
                </>
              ) : null}
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
                        onClick={showInfo}
                        style={{ fontWeight: 700, fontSize: 40 }}
                      >
                        내 정보
                      </a>
                    </li>
                    <li
                      className="nav-item"
                      id="border"
                      style={{ fontSize: 30 }}
                    >
                      <p>|</p>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="asset"
                        href="#"
                        onClick={showAsset}
                        style={{ fontWeight: 700, fontSize: 40 }}
                      >
                        자산관리
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

            {info && viewInfo}
            {asset && viewAsset}
          </div>
        </div>
      </body>
    </>
  );
}

export default MyPage;
