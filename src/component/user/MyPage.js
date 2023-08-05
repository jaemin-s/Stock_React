import React, { useCallback, useEffect, useState } from "react";
import "./MyPage.scss";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RequsetHeader } from "../../config/apikey";
import { useNavigate, useParams } from "react-router-dom";

import Update from "./Update";
import Delete from "./Delete";
import MyPageViewInfo from "./MyPages/MyPageViewInfo";
import { number } from "echarts";
import { API_BASE_URL } from "../../config/host-config";
import HavingInfo from "./MyPages/HavingInfo";
import LikeInfo from "./MyPages/LikeInfo";
import MySideBar from "./MyPages/MySideBar";
import MyHeader from "./MyPages/MyHeader";
import MyAsset from "./MyPages/MyAsset";
// Doughnut 차트 import(npm install chart.js react-chartjs-2)

// Doughnut 차트 등록
Chart.register(ArcElement, Tooltip, Legend);

function MyPage() {
  const { value } = useParams();
  const redirection = useNavigate();
  const title = value ? value.split("(", 2) : [];

  //현재가, 등락률 관리
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

  const handleLikeStockClick = (like) => {
    setSelectedLikeStock(like);
    transition(like.stockCode);
  };

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

  // 수정 showModal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [here, setHere] = useState("info");
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

  const [historyInfo, setHistoryInfo] = useState([]);

  async function getInfo() {
    const res = await fetch(
      API_BASE_URL +
        "/api/user/myInfo/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
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
  async function getHistory() {
    const res = await fetch(
      API_BASE_URL +
        "/api/trade/history/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const history = await res.json();
    setHistoryInfo(history);
  }

  async function getFavoriteInfo() {
    const res = await fetch(
      API_BASE_URL +
        "/api/user/favorite/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );

    if (res.status === 200) {
      const favorite = await res.json();
      setFavoriteInfo(favorite);
    }
  }

  useEffect(() => {
    getInfo();
    getHistory();
    getFavoriteInfo();
  }, []);

  const detailHandler = (e) => {
    redirection("/detail/" + e.target.textContent);
  };

  const transition = async (stockId) => {
    // const res = await fetch(
    //   "/quotations/inquire-daily-itemchartprice?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" +
    //     stockId +
    //     "&FID_INPUT_DATE_1=" +
    //     startDate +
    //     "&FID_INPUT_DATE_2=" +
    //     currentDate +
    //     "&FID_PERIOD_DIV_CODE=M&FID_ORG_ADJ_PRC=1",
    //   {
    //     headers: {
    //       ...RequsetHeader,
    //       tr_id: "FHKST03010100",
    //     },
    //   }
    // );
    const res = await fetch(
      "https://kq53e0bc8b.execute-api.ap-northeast-2.amazonaws.com/b2w-api1/dailyitemchart/" +
        stockId +
        "/" +
        startDate +
        "/" +
        currentDate +
        "",
      {
        headers: {
          authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      //필요한 값만 추출
      let values = [];
      let dates = [];

      data.output2.forEach((x) => {
        const {
          stck_bsop_date: date,
          prdy_vrss: than,
          stck_clpr: close,

          acml_vol: deal,
        } = x;
        dates.unshift(dateFormat(date));

        values.unshift([parseInt(close), parseInt(than), parseInt(deal)]);
      });

      setInfoData({ categoryData: dates, values });
      return { categoryData: dates, values };
    }
  };
  const toggleModifyModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  useEffect(() => {}, [showUpdateModal]);

  return (
    <>
      <div id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <MySideBar
            toggleModifyModal={toggleModifyModal}
            userInfo={userInfo}
            handleLikeStockClick={handleLikeStockClick}
            handleStockClick={handleStockClick}
            favoriteInfo={favoriteInfo}
            here={here}
          />

          <div className="container-fluid">
            <MyHeader setHere={setHere} setInfoData={setInfoData} />

            {here === "info" && <MyPageViewInfo />}
            {here === "asset" && (
              <MyAsset
                userInfo={userInfo}
                historyInfo={historyInfo}
                detailHandler={detailHandler}
                getFormattedDate={getFormattedDate}
              />
            )}
            {here === "havingInfo" && (
              <HavingInfo selectedStock={selectedStock} infoData={infoData} />
            )}
            {here === "likeInfo" && (
              <LikeInfo selectedStock={selectedStock} infoData={infoData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
