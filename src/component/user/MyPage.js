import React, { useContext, useEffect, useState } from "react";
import "./MyPage.scss";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AuthContext from "../util/AuthContext";
import { RequsetHeader } from "../../config/apikey";
import { useParams } from "react-router-dom";

// Doughnut 차트 import(npm install chart.js react-chartjs-2)

// Doughnut 차트 등록
Chart.register(ArcElement, Tooltip, Legend);

function MyPage() {
  const { value } = useParams();
  const title = value ? value.split("(", 2) : [];
  const [currentLivePrice, setCurrentLivePrice] = useState([]);

  const dailyPrice = async (e) => {
    // ㅇㅇㅇ(000000) 값 자르기

    //const params = title[1].slice(0, -1); //종목 코드
    userInfo.myStocks.forEach(async (element) => {
      const res = await fetch(
        "/quotations/inquire-daily-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" +
          element.stockId +
          "&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=1",
        {
          headers: {
            ...RequsetHeader,
            tr_id: "FHKST01010400",
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        // console.log(data);
        //필요한 값만 추출
        let values = [];
        let dates = [];
        data.output.forEach((x) => {
          const { stck_clpr: close } = x;
          values.unshift([parseInt(close)]);
        });

        // 현재가
        if (values[values.length - 1][0] !== undefined) {
          setCurrentLivePrice((prevArray) => [
            ...prevArray,
            { stockId: element.stockId, price: values[values.length - 1][0] },
          ]);
        }
      } else {
        // console.log("res인데 말이야 = ",res);
      }
    });
  };

  useEffect(() => {
    dailyPrice();
  }, []);
  console.log("currentLivePrice:  ", currentLivePrice);
  console.log("현재주가");
  // console.log(currentLivePrice[0].stockId, currentLivePrice[0].price);

  // 주식 수익률 계싼
  function returnPercent() {
    const returnPercentArray = [];
    for (let i = 0; i < currentLivePrice.length; i++) {
      const stockData = currentLivePrice[i];
      const { stockId, price } = stockData;
      const purchasedStock = userInfo.myStocks.find(
        (stock) => stock.stockId === stockId
      );
      if (purchasedStock) {
        const { price: purchasePrice, quantity } = purchasedStock;
        const returnPercent = (
          (price / (purchasePrice / quantity)) * 100 -
          100
        ).toFixed(2);
        returnPercentArray.push({ stockId, returnPercent });
      }
      // (currentLivePrice[i].price / userInfo.myStocks[i].(price/quntity)) * 100 - 100
    }
    let totalReturnPercent = 0;
    returnPercentArray.forEach((item) => {
      totalReturnPercent += parseFloat(item.returnPercent);
    });
    const averageReturnPercent = (
      totalReturnPercent / returnPercentArray.length
    ).toFixed(2);
    return averageReturnPercent;
  }

  // 주식 평가금액 계산
  function estimate() {
    let totalEstimate = 0;
    if (Array.isArray(userInfo.myStocks) && userInfo.myStocks.length > 0) {
      for (let i = 0; i < userInfo.myStocks.length; i++) {
        totalEstimate += userInfo.myStocks[i].price;
      }
    }
    return totalEstimate;
  }

  // 날짜 형식 변환(거래 일자)
  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  const { userName, userNick, email, gender, age, career } =
    useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const options = {};

  const [info, setInfo] = useState(true);
  const [asset, setAsset] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    nick: "",
    age: "",
    career: "",
    gender: "",
    myStocks: [],
    money: 0,
  });

  // console.log("userInfo.myStocks: ", userInfo.myStocks);

  const [historyInfo, setHistoryInfo] = useState([]);

  const showInfo = () => {
    setInfo(true);
    setAsset(false);
  };

  const showAsset = () => {
    setInfo(false);
    setAsset(true);
  };

  const rank = 3;

  //도넛 안에 넣기 위한 labels
  const stockNames = Array.isArray(userInfo.myStocks)
    ? userInfo.myStocks.map((stock) => stock.stockName)
    : [];

  const stockPrice = Array.isArray(userInfo.myStocks)
    ? userInfo.myStocks.map((stock) => stock.price)
    : [];

  // Doughnut 차트에 들어갈 내용
  const data = {
    labels: [...stockNames],

    // 주식 종목 / 현금
    datasets: [
      {
        label: "금액",
        data: stockPrice,
        backgroundColor: [
          "blue",
          "red",
          "skyblue",
          "orange",
          "purple",
          "green",
        ],
        // 순서대로 금액과 색깔 설정
      },
    ],
  };
  console.log(stockPrice);
  async function getInfo() {
    const res = await fetch(
      "http://localhost:8181/api/user/myInfo/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
    // console.log("myInfo: ", myInfo);
    setUserInfo({
      email: myInfo.email,
      name: myInfo.name,
      nick: myInfo.nick,
      age: myInfo.age,
      career: myInfo.career,
      gender: myInfo.gender,
      money: myInfo.money,
      myStocks: myInfo.myStocks,
    });
  }
  console.log(userInfo.money);
  async function getHistory() {
    const res = await fetch(
      "http://localhost:8181/api/trade/history/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const history = await res.json();
    // console.log("history: ", history);
    setHistoryInfo(history);
  }
  useEffect(() => {
    getInfo();
    getHistory();
  }, []);

  function getAge(age) {
    switch (age) {
      case "1":
        return "입문";
      case "2":
        return "1~3년";
      case "3":
        return "4~10년";
      case "4":
        return "10년 이상";
      default:
        return age;
    }
  }

  function getTradeType(tradeType) {
    switch (tradeType) {
      case "buy":
        return "매수";
      case "sell":
        return "매도";
    }
  }

  function moreButton() {
    if (historyInfo.length > 3) {
      return (
        <div className="button">
          <button className="button-21" onClick={toggleExpanded}>
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      );
    }
    return null;
  }
  console.log("returnPercent(): ", returnPercent());
  const viewInfo = (
    <>
      {/* <!-- Page Heading --> */}
      <div className="basic-info">
        <br />
        <br />
        <br />
        <br />
        <div id="1">
          '{userInfo.name}' 님의 현재 등수 : {rank} 등
        </div>
      </div>
      <br />
      <br />
      {/* 회원정보 */}
      <div className="userInfo">
        <div className="info">
          <h5 className="name">
            이름<span className="border">|</span> {userInfo.name}
          </h5>
          <h5 className="nick">
            닉네임<span className="border">|</span> {userInfo.nick}
          </h5>
          <h5 className="email">
            이메일<span className="border">|</span> {userInfo.email}
          </h5>
          <h5 className="gender">
            성별<span className="border">|</span> {userInfo.gender}
          </h5>
          <h5 className="age">
            나이<span className="border">|</span> {userInfo.age}세
          </h5>
          <h5 className="career">
            경력<span className="border">|</span> {getAge(userInfo.career)}
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
            자산평가<span className="border">|</span> {userInfo.money} 원
          </h5>
          <h5 className="having-stock">
            보유 주식<span className="border">|</span>
            {Array.isArray(historyInfo)
              ? historyInfo.slice(0, 3).map((trade, index) => (
                  <span key={index}>
                    {trade.stockName}
                    {index === 2
                      ? " 등"
                      : index < historyInfo.length - 1
                      ? ", "
                      : null}
                  </span>
                ))
              : null}
          </h5>
          {/* <h5 className="having-cash">
            보유 현금<span className="border">|</span>
            {(5000000 - userInfo.money).toLocaleString()} 원
          </h5> */}
          <h5 className="return">
            수익률<span className="border">|</span> {returnPercent()}%
          </h5>
          {/* 수익률 : (현재주가 / 매수시 주가) * 100 - 100 */}
          <h5 className="evaluation">
            주식 평가금액<span className="border">|</span>
            {estimate().toLocaleString()} 원
          </h5>
          {/* 주식 평가금액: 주가의 움직임을 반영한 금액 
              평가금액 : 보유자산별 수량 * 현재가 
              삼성전자 * 8 + SK하이닉스 * 4 + 대한항공 * 25*/}
        </div>
        <div style={{ marginLeft: "50px" }}>
          <Doughnut data={data} options={options}></Doughnut>
        </div>
      </div>

      {/* 거래내역 테이블 */}
      <div style={{ marginBottom: "40px" }}>
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
            {Array.isArray(historyInfo)
              ? historyInfo
                  .slice(0, expanded ? historyInfo.length : 3)
                  .map((trade, index) => (
                    <tr key={index}>
                      <th scope="row">{getFormattedDate(trade.tradeDate)}</th>
                      <td>{getTradeType(trade.tradeType)}</td>
                      <td>
                        {trade.stockName}({trade.stockId})
                      </td>
                      <td>{trade.quantity}</td>
                      <td>{trade.price.toLocaleString()}</td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
      {moreButton()}
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
