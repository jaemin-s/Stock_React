import React, { useContext, useEffect, useState } from "react";
import "./MyPage.scss";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AuthContext from "../util/AuthContext";
import { RequsetHeader } from "../../config/apikey";
import { useParams } from "react-router-dom";

import Update from "./Update";
import Delete from "./Delete";
import MyPageViewInfo from "./MyPageViewInfo";
// Doughnut 차트 import(npm install chart.js react-chartjs-2)

// Doughnut 차트 등록
Chart.register(ArcElement, Tooltip, Legend);

function MyPage() {
  const { value } = useParams();
  const title = value ? value.split("(", 2) : [];
  const [currentLivePrice, setCurrentLivePrice] = useState([]);

  //현재가, 등락률 관리
  const [livePrice, setLivePrice] = useState();
  const [fluctuationRate, setFluctuationRate] = useState();
  const [isRise, setIsRise] = useState(true);
  const [infoData, setInfoData] = useState({
    categoryData: [],
    values: [],
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedLikeStock, setSelectedLikeStock] = useState(null);
  const handleStockClick = (trade) => {
    setSelectedStock(trade);
    transition(trade.stockId);
  };
  const [uniqueHistoryInfo, setUniqueHistoryInfo] = useState([]);

  const [returnPercent2, setReturnPercent2] = useState([]);
  const handleLikeStockClick = (like) => {
    setSelectedLikeStock(like);
    transition(like.stockCode);
  };
  const dailyPrice = async (e) => {
    // ㅇㅇㅇ(000000) 값 자르기
    try {
      //const params = title[1].slice(0, -1); //종목 코드
      const updatedCurrentLivePrice = [];
      for (const element of userInfo.myStocks) {
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
          const { stck_clpr: close } = data.output[0];
          updatedCurrentLivePrice.push({
            stockId: element.stockId,
            price: parseInt(close),
          });
        } else {
          updatedCurrentLivePrice.push({
            stockId: element.stockId,
            price: 0,
          });
        }
      }
      setCurrentLivePrice(updatedCurrentLivePrice);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await dailyPrice();
      const averageReturnPercent = returnPercent();
      // console.log("Average Return Percent: ", averageReturnPercent);
    };

    fetchData();
  }, [currentLivePrice]);
  // console.log("현재주가 currentLivePrice:  ", currentLivePrice);
  // console.log(currentLivePrice[0].stockId, currentLivePrice[0].price);

  // 주식 수익률 계산
  const returnPercentArray = [];
  function returnPercent() {
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
    // console.log(returnPercentArray);
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

  // 8자리 날짜를 yyyy-MM-dd로 변환
  const dateFormat = (date) => {
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
  };
  let today = new Date();
  let currentDate = today.toISOString().slice(0, 10).replaceAll("-", "");
  let startDate = new Date(today.setDate(today.getDate() - 365))
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const { userName, userNick, email, gender, age, career, mbti } =
    useContext(AuthContext);

  // 수정 showModal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const options = {};

  const [info, setInfo] = useState(true);
  const [asset, setAsset] = useState(false);
  const [havingInfo, setHavingInfo] = useState(false);
  const [likeInfo, setLikeInfo] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    nick: "",
    age: "",
    career: "",
    gender: "",
    mbti: "",
    myStocks: [],
    money: 0,
    return: "",
  });
  const [favoriteInfo, setFavoriteInfo] = useState({
    stockCode: [],
    stockName: [],
  });
  // console.log("userInfo: ", userInfo);
  // console.log("userInfo.myStocks: ", userInfo.myStocks);

  const [historyInfo, setHistoryInfo] = useState([]);

  const showInfo = () => {
    setInfo(true);
    setAsset(false);
    setHavingInfo(false);
    setLikeInfo(false);
  };

  const showAsset = () => {
    setInfo(false);
    setAsset(true);
    setHavingInfo(false);
    setLikeInfo(false);
  };

  const showHavingInfo = () => {
    setInfo(false);
    setAsset(false);
    setHavingInfo(true);
    setLikeInfo(false);
  };

  const showLikeInfo = () => {
    setInfo(false);
    setAsset(false);
    setHavingInfo(false);
    setLikeInfo(true);
  };

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
          "#007AFF", // 파랑
          "#FF9500", // 오렌지
          "#FFCC00", // 노랑
          "#FF2D55", // 핑크
          "#5856D6", // 보라
          "lightgray",
          "#FF3B30", // 빨강
        ],
        // 순서대로 금액과 색깔 설정
      },
    ],
  };
  // console.log(stockPrice);
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
      mbti: myInfo.mbti,
    });
  }
  // console.log(userInfo.money);
  async function getHistory() {
    const res = await fetch(
      "http://localhost:8181/api/trade/history/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const history = await res.json();
    // console.log("history: ", history);
    setHistoryInfo(history);
  }

  async function getFavoriteInfo() {
    const res = await fetch(
      "http://localhost:8181/api/user/favorite/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );

    if (res.status === 200) {
      const favorite = await res.json();
      setFavoriteInfo(favorite);
      // console.log("favorite: ", favorite);
    }
  }

  useEffect(() => {
    getInfo();
    getHistory();
    getFavoriteInfo();
  }, []);

  useEffect(() => {
    const uniqueStocks = Array.isArray(historyInfo)
      ? [...new Set(historyInfo.map((trade) => trade.stockId))]
      : [];
    const uniqueHistory = uniqueStocks.map((stockId) =>
      historyInfo.find((trade) => trade.stockId === stockId)
    );
    setUniqueHistoryInfo(uniqueHistory);
  }, [historyInfo]);

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
  // console.log("returnPercent(): ", returnPercent());

  const viewInfo = (
    <>
      <MyPageViewInfo />
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
            자산평가<span className="border">|</span>{" "}
            {userInfo.money.toLocaleString()} 원
          </h5>
          <h5 className="having-stock">
            보유 주식<span className="border">|</span>
            {/* {Array.isArray(historyInfo)
              ? historyInfo.slice(0, 3).map((trade, index) => ( */}
            {uniqueHistoryInfo
              ? uniqueHistoryInfo.slice(0, 3).map((trade, index) => (
                  <span key={index}>
                    {trade.stockName}
                    {index === 2
                      ? " 등"
                      : index < historyInfo.length - 1
                      ? ", "
                      : null}
                    {}
                  </span>
                ))
              : null}
          </h5>
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
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        종목명(종목 코드)열을 클릭하면 해당 주식의 상세 페이지로 이동합니다.
      </p>
      <h4 id="2" className="assetInfo">
        보유 종목 정보
      </h4>
      <br />

      <table
        className="responsive-table"
        id="table"
        style={{ marginBottom: "150px" }}
      >
        <thead>
          <tr className="high">
            <th scope="col" style={{ textAlign: "center" }}>
              종목명(종목 코드)
            </th>
            <th scope="col">수량</th>
            <th scope="col">주당 평균 가격</th>
            <th scope="col">금액</th>
            <th scope="col">수익률</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.myStocks.map((trade, index) => {
            const returnPercentInfo = returnPercentArray.find(
              (item) => item.stockId === trade.stockId
            );
            const returnPercentValue = returnPercentInfo
              ? parseFloat(returnPercentInfo.returnPercent)
              : null; // Parse the value to a floating-point number
            let textColor = "black";

            if (returnPercentValue !== null) {
              if (returnPercentValue > 0) {
                textColor = "red";
              } else if (returnPercentValue < 0) {
                textColor = "blue";
              }
            }

            return (
              <tr key={index}>
                <th
                  style={{
                    border: "1px solid lightgray",
                    textAlign: "center",
                  }}
                >
                  <a
                    href={`/Detail/${trade.stockName}(${trade.stockId})`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    {trade.stockName}({trade.stockId})
                  </a>
                </th>
                <td>{trade.quantity}</td>
                <td>{(trade.price / trade.quantity).toFixed(0)}원</td>
                <td>{trade.price.toLocaleString()}원</td>
                <td style={{ fontWeight: "600", color: textColor }}>
                  {returnPercentValue !== null ? `${returnPercentValue}%` : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 거래내역 테이블 */}
      <div style={{ marginBottom: "40px" }}>
        <h4 id="3-1" style={{ flex: 1, textAlign: "center", fontSize: "40px" }}>
          거래 내역
        </h4>
        <br />
        <br />
        <table className="responsive-table" id="table">
          <thead>
            <tr className="high">
              <th scope="col" style={{ textAlign: "center" }}>
                거래 일자
              </th>
              <th scope="col">매수 / 매도</th>
              <th scope="col">종목명(종목 코드)</th>
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
                      <th scope="row" style={{ textAlign: "center" }}>
                        {getFormattedDate(trade.tradeDate)}
                      </th>
                      <td>{getTradeType(trade.tradeType)}</td>
                      <td>
                        <a
                          href={`/Detail/${trade.stockName}(${trade.stockId})`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "600",
                          }}
                        >
                          {trade.stockName}({trade.stockId})
                        </a>
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

  const viewHavingInfo = (
    <>
      {/* 보유 종목 */}
      <ul>
        <h4>조회하고 싶은 주식을 왼쪽 사이드바에서 선택해 주세요.</h4>
        {selectedStock && (
          <div>
            <h4>
              주식 정보: {"  "}
              {selectedStock.stockName}
              {/* {"  "}({selectedStock.stockId}) */}
            </h4>
          </div>
        )}
      </ul>
      <table className="responsive-table" style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <th scope="col" style={{ maxWidth: "100px", textAlign: "center" }}>
              날짜
            </th>
            <th scope="col">종가</th>
            <th scope="col">대비</th>
            <th scope="col">거래량</th>
          </tr>
        </thead>
        <tbody>
          {infoData.categoryData
            .map((date, index) => ({
              date,
              values: infoData.values[index],
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                {item.values.map((value, innerIndex) => (
                  <td key={innerIndex}>
                    {innerIndex === 4 ? (
                      <div>{value}</div>
                    ) : (
                      value.toLocaleString()
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

  const viewLikeInfo = (
    <>
      {/* 관심 종목 */}
      <ul>
        <h4>조회하고 싶은 주식을 왼쪽 사이드바에서 선택해 주세요.</h4>
        {selectedLikeStock && (
          <div>
            <h4>
              주식 정보: {"  "}
              {selectedLikeStock.stockName}
            </h4>
          </div>
        )}
      </ul>
      <table className="responsive-table" style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <th scope="col" style={{ maxWidth: "100px", textAlign: "center" }}>
              날짜
            </th>
            <th scope="col">종가</th>
            <th scope="col">대비</th>
            <th scope="col">거래량</th>
          </tr>
        </thead>
        <tbody>
          {infoData.categoryData
            .map((date, index) => ({
              date,
              values: infoData.values[index],
            }))
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                {item.values.map((value, innerIndex) => (
                  <td key={innerIndex}>
                    {innerIndex === 4 ? (
                      <span>{value}</span>
                    ) : (
                      value.toLocaleString()
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );

  const transition = async (stockId) => {
    //  const params = title[1].slice(0, -1); //종목 코드
    //  console.log("stockId: ", stockId);
    const res = await fetch(
      "/quotations/inquire-daily-itemchartprice?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" +
        stockId +
        "&FID_INPUT_DATE_1=" +
        startDate +
        "&FID_INPUT_DATE_2=" +
        currentDate +
        "&FID_PERIOD_DIV_CODE=M&FID_ORG_ADJ_PRC=1",
      {
        headers: {
          ...RequsetHeader,
          tr_id: "FHKST03010100",
        },
      }
    );
    // console.log("res: ", res);

    if (res.status === 200) {
      const data = await res.json();
      // console.log(data);
      //필요한 값만 추출
      let values = [];
      let dates = [];
      // console.log(data);

      data.output2.forEach((x) => {
        const {
          stck_bsop_date: date,
          prdy_vrss: than,
          stck_clpr: close,

          acml_vol: deal,
        } = x;
        console.log(typeof deal);
        dates.unshift(dateFormat(date));

        values.unshift([parseInt(close), parseInt(than), parseInt(deal)]);
      });

      setInfoData({ categoryData: dates, values });
      return { categoryData: dates, values };
    }
  };
  // console.log("transition: ", transition());
  const toggleModifyModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  useEffect(() => {}, [showUpdateModal]);

  return (
    <>
      <body id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
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
              {info ? (
                <>
                  <div className="sidebar-heading ">내 정보</div>
                  <div className="list-info">
                    <Update toggleModifyModal={toggleModifyModal} />

                    <a
                      className="nav-link"
                      href="#0"
                      style={{ padding: "0px 16px" }}
                    >
                      <i className="fas fa-fw fa-tachometer-alt"></i>
                      <span>탈퇴</span>
                      <Delete />
                    </a>
                  </div>
                </>
              ) : null}

              <hr className="sidebar-divider my-0"></hr>

              {asset ? (
                <>
                  <div className="sidebar-heading">자산 관리</div>
                  <div className="list-assets">
                    <a
                      className="nav-link"
                      href="#2"
                      style={{ padding: "0px 16px" }}
                    >
                      <i className="fas fa-fw fa-tachometer-alt"></i>
                      <span>내 자산 정보</span>
                    </a>
                    <a
                      className="nav-link"
                      href="#0"
                      style={{ padding: "0px 16px" }}
                    >
                      <i className="fas fa-fw fa-tachometer-alt"></i>
                      <span>자산 변동</span>
                    </a>
                    <a
                      className="nav-link"
                      href="#0"
                      style={{ padding: "0px 16px" }}
                    >
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

              {havingInfo ? (
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
                        {/* ({trade.stockId}) */}
                      </div>
                    ))}
                  </ul>
                  <hr className="sidebar-divider my-0"></hr>
                </>
              ) : null}

              {likeInfo ? (
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
                          {/* ({like.stockCode}) */}
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
                        style={{ fontWeight: 700, fontSize: 25 }}
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
                        style={{ fontWeight: 700, fontSize: 25 }}
                      >
                        자산관리
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
                        id="having-info"
                        href="#"
                        onClick={showHavingInfo}
                        style={{ fontWeight: 700, fontSize: 25 }}
                      >
                        보유 종목 주가 추이
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
                        id="like-info"
                        href="#"
                        onClick={showLikeInfo}
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

            {info && viewInfo}
            {asset && viewAsset}
            {havingInfo && viewHavingInfo}
            {likeInfo && viewLikeInfo}
          </div>
        </div>
      </body>
    </>
  );
}

export default MyPage;
