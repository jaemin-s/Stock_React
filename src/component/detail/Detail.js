import React, { useContext, useEffect, useRef, useState } from "react";
import InfoTest from "../info/InfoTest";
import "./Detail.scss";
import { KI_APP_KEY, KI_SECRET_KEY, DATA_GO_KR_KEY } from "../../config/apikey";
import {
  KI_BASE_DOMAIN,
  KI_DOMESTIC_STOCK_URL,
  KI_TOKEN_URL,
} from "../../config/host-config";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Carousel,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import NewsTest from "../news/NewsTest";
import { RequsetHeader } from "../../config/apikey";
import Candle from "./Candle";
import AskingPrice from "./AskingPrice";
import { elements } from "chart.js";
import { red } from "@mui/material/colors";
import { isLogin } from "../util/login-utils";
import AuthContext from "../util/AuthContext";
import RcmMbti from "./RcmMbti";
import Swal from "sweetalert2";
import InvestmentStrategy from "./InvestmentStrategy";

const Detail = () => {
  const [infoData, setInfoData] = useState({
    categoryData: [],
    values: [],
  });

  const { value } = useParams();
  const title = value.split("(", 2);
  // console.log(title[0]); //종목 이름
  // console.log(title[1].slice(0, -1)); //종목 코드
  //로그인한 유저의 mbti
  const [myMbti, setMyMbti] = useState("");

  //현재가, 등락률 관리
  const [livePrice, setLivePrice] = useState();
  const [fluctuationRate, setFluctuationRate] = useState();
  const [isRise, setIsRise] = useState(true);

  //로딩 관리
  const [loadSuccess, setLoadSuccess] = useState(false);

  const redirection = useNavigate();

  // 즐겨찾기 별표 채우기
  const [filled, setFilled] = useState(false);

  const REQUEST_URL = "http://localhost:8181/api/user/favorite";
  const { email, isLoggedIn } = useContext(AuthContext);
  // 관심종목 목록
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    getMyInfo();
  }, []);

  // 관심종목(별 모양 클릭시) 백 연결 로직
  const toggleStar = async () => {
    setFilled(!filled);

    const res = await fetch(REQUEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        stockCode: title[1].slice(0, -1),
        stockName: title[0],
        userEmail: email,
      }),
    });
    if (res.status === 200) {
      const favoriteData = await res.json();
      let results = [];
      favoriteData.forEach((x) => {
        const { stockCode, stockName } = x;
        results.push({ stockCode, stockName });
      });
      setFavoriteList(results);
    }
  };
  // console.log(favoriteList[0].stockName);
  // 관심종목 백 연결 로직 끝

  useEffect(() => {
    loadFavorite();
    getMyInfo();
  }, [value]);

  // 관심종목 목록 불러오기
  const loadFavorite = async () => {
    const loginEmail = localStorage.getItem("LOGIN_USEREMAIL");
    // console.log("email: ", loginEmail);
    const res = await fetch(
      "http://localhost:8181/api/user/favorite/" + loginEmail,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    if (res.status === 200) {
      const list = await res.json();
      // console.log(list);
      setFavoriteList(list);

      let flag = false;
      list.forEach((x) => {
        if (x.stockName === title[0]) {
          setFilled(true);
          flag = true;
        }
      });
      if (!flag) {
        setFilled(false);
      }
    }
  };

  //로그인 한 유저의 남은 보유 금액 관리 변수
  const [currentAsset, setCurrentAsset] = useState(5000000);
  //로그인 한 유저의 보유주식 정보 관리 변수
  const [userStockInfo, setUserStockInfo] = useState([]);
  //검색한 주식의 보유 개수
  const [currentHavingStock, setCurrentHavingStock] = useState();
  //샀을 당시 주식 가격
  const [pastStock, setPastStock] = useState(0);
  //내정보 불러오기 로직
  const getMyInfo = async () => {
    const res = await fetch(
      "http://localhost:8181/api/user/myInfo/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    if (res.status === 200) {
      const result = await res.json();
      console.log(result);
      setMyMbti(result.mbti);
      setCurrentAsset(result.money); // 로그인 한 유저의 남은 보유 금액
      // console.log("result.myStocks: ", result.myStocks);
      let flag = false;

      result.myStocks.forEach((x) => {
        console.log(x.stockName);
        if (x.stockName === title[0]) {
          setCurrentHavingStock(x.quantity);
          setPastStock(x.price);
          flag = true;
        }
      });
      if (!flag) setCurrentHavingStock(0);

      setUserStockInfo(result.myStocks); // 로그인 한 유저의 보유주식 정보
    }
  };

  // 8자리 날짜를 yyyy-MM-dd로 변환
  const dateFormat = (date) => {
    if (!date) return ""; // date가 undefined인 경우 빈 문자열 반환
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
  };

  //일자별 시세
  const dailyPrice = async () => {
    // ㅇㅇㅇ(000000) 값 자르기

    const params = title[1].slice(0, -1); //종목 코드

    const res = await fetch(
      "/quotations/inquire-daily-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" +
        params +
        "&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=1",
      {
        headers: {
          ...RequsetHeader,
          tr_id: "FHKST01010400",
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
      data.output.forEach((x) => {
        const {
          stck_bsop_date: date,
          stck_oprc: open,
          stck_clpr: close,
          stck_hgpr: highest,
          stck_lwpr: lowest,
          prdy_ctrt: percent,
        } = x;
        dates.unshift(dateFormat(date));
        values.unshift([
          parseInt(open),
          parseInt(close),
          parseInt(lowest),
          parseInt(highest),
          parseFloat(percent),
        ]);
      });

      // 현재가
      if (values[values.length - 1][1] !== undefined) {
        setLivePrice(values[values.length - 1][1]);
      }

      //등락률
      if (values[values.length - 1][4] >= 0) {
        setIsRise(true);
      } else {
        setIsRise(false);
      }

      if (values[values.length - 1][4] !== undefined) {
        setFluctuationRate(values[values.length - 1][4]);
      } else {
        setFluctuationRate(0);
      }

      return { categoryData: dates, values };
    } else {
      // console.log("res인데 말이야 = ",res);
    }
  };

  const [paramsState, setParamsState] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await dailyPrice(paramsState);
    };
    fetchData();
  }, [paramsState]);

  const [selectedValue, setSelectedValue] = useState(null);

  // function selectedValueHandler(value) {
  //   // console.log("selectedValueHandler : " + value);
  //   setSelectedValue(value);
  // }
  //모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false); //매수
  const [modalType, setModalType] = useState(false); //매도
  //호가, 뉴스, 종목정보, 내주식 관리
  const [stockPrice, setShowPrice] = useState(true);
  const [news, setNews] = useState(false);
  const [info, setInfo] = useState(false);
  const [myStock, setMyStock] = useState(false);

  const showMyStock = () => {
    setShowPrice(false);
    setNews(false);
    setInfo(false);
    setMyStock(true);
  };

  const showInfo = () => {
    setShowPrice(false);
    setNews(false);
    setInfo(true);
    setMyStock(false);
  };

  const showNews = () => {
    setShowPrice(false);
    setNews(true);
    setInfo(false);
    setMyStock(false);
  };

  const showPrice = () => {
    setShowPrice(true);
    setNews(false);
    setInfo(false);
    setMyStock(false);
  };

  const toggleModal = (e) => {
    console.log(livePrice);
    console.log(currentAsset);
    if (livePrice > currentAsset) {
      setOrder(0);
    } else {
      setOrder(1);
    }
    setIsModalOpen(!isModalOpen);
    getMyInfo();
  };

  async function buyRequest() {
    if (order <= 0) {
      toastAlertHandler(-2);
      return;
    }
    const res = await fetch("http://localhost:8181/api/trade/buy", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("LOGIN_USEREMAIL"),
        stockName: title[0],
        stockId: title[1].slice(0, -1),
        price: totalOrder,
        quantity: order,
      }),
    });
    if (res.status === 200) {
      const buyResponse = await res.text();
      console.log(buyResponse);
      if (buyResponse === "success") {
        toastAlertHandler(1); //매수 시 띄울 알림창
      } else {
        toastAlertHandler(-2); //에러 시
      }
    }
    toggleModal();
  }

  async function sellRequest() {
    if (order <= 0) {
      toastAlertHandler(-11);
      return;
    }
    const res = await fetch("http://localhost:8181/api/trade/sell", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("LOGIN_USEREMAIL"),
        stockName: title[0],
        stockId: title[1].slice(0, -1),
        price: totalOrder,
        quantity: order,
      }),
    });
    if (res.status === 200) {
      const sellResponse = await res.text();
      console.log(sellResponse);
      if (sellResponse === "success") {
        toastAlertHandler(0); //매도 시 띄울 알림창
      } else {
        toastAlertHandler(-1); //에러 시
      }
    }
    sellModal();
  }

  const sellModal = () => {
    if (currentHavingStock === 0) {
      setOrder(0);
    } else {
      setOrder(1);
    }
    setModalType(!modalType);
    getMyInfo();
  };

  const [order, setOrder] = useState("");

  const buyOrderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      //보유금액보다 구매하려는 주식이 적을때만 매수 할 수 있게 검사
      if (value * currentPrice <= currentAsset) {
        setOrder(value);
      } else {
        setOrder(parseInt(currentAsset / currentPrice));
      }
    }
  };
  const sellOrderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      //보유금액보다 구매하려는 주식이 적을때만 매수 할 수 있게 검사
      if (value <= currentHavingStock) {
        setOrder(value);
      } else {
        setOrder(currentHavingStock);
      }
    }
  };

  const toastAlertHandler = (num) => {
    //1 => 매수 , 0=> 매도
    let content = "";
    let icons = "";
    if (num === 1) {
      content = "매수가 성공적으로 체결되었습니다.";
      icons = "success";
    } else if (num === 0) {
      content = "매도가 성공적으로 체결되었습니다.";
      icons = "success";
    } else if (num === -1) {
      content = "매도 수량이 보유주식보다 많습니다.";
      icons = "error";
    } else if (num === -11) {
      content = "매도 수량이 0개입니다.";
      icons = "error";
    } else if (num === -2) {
      content = "매수 수량이 0개입니다.";
      icons = "error";
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icons,
      title: content,
    });
  };

  const currentPrice = livePrice; //보고있는 주식의 현재가

  const totalOrder = order * currentPrice; // 주문 수량 * 현재가 = 총 주문금액

  const afterAsset = currentAsset - totalOrder; //매매 후 자산

  const totalPrice = currentHavingStock * currentPrice; // 보유 주식 * 현재가

  const profit = livePrice * currentHavingStock - pastStock; //내가 산 주식 - 현재가격 = 손익 금액

  const dateFormatJ = (date) => {
    const [year, month, day] = date.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  };

  // console.log("title[1].slice(0, -1): ", title[1].slice(0, -1));
  const transition = async (title) => {
    const stockId = Array.isArray(title) ? title.join("") : title;
    let today = new Date();
    let currentDate = today.toISOString().slice(0, 10).replaceAll("-", "");
    let startDate = new Date(today.setDate(today.getDate() - 150))
      .toISOString()
      .slice(0, 10)
      .replaceAll("-", "");
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
        // console.log(typeof deal);
        dates.unshift(dateFormat(date));

        values.unshift([parseInt(close), parseInt(than), parseInt(deal)]);
      });

      setInfoData({ categoryData: dates, values });
      return { categoryData: dates, values };
    }
  };

  const [stockId, setStockId] = useState("");
  useEffect(() => {
    const extractedStockId = title[1].slice(0, -1);
    setStockId(extractedStockId);
  }, [title[1]]); //값이 변경될 때마다 useEffect가 실행

  useEffect(() => {
    const fetchData = async () => {
      const data = await transition(stockId);
    };
    fetchData();
  }, [stockId]);

  useEffect(() => {
    const title = value.split("(", 2);

    if (title && title.length >= 2) {
      transition(title[1].slice(0, -1));
    }
  }, []);
  const modalBuy = (
    <>
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        style={{ maxWidth: 2000, width: 600, marginTop: 200 }}
      >
        <ModalHeader toggle={toggleModal}>매수하기</ModalHeader>
        <ModalBody>
          {/* 여기에 모달 컨텐츠를 추가하세요 */}
          <div id="modal-detail" className="flex">
            <div className="flex">
              <div className="box1">
                <div>주문단가</div>
                <div>총 주문금액</div>
                <div>매수 후 잔액</div>
              </div>
              <div className="box2">
                <div style={{ textAlign: "right" }}>{livePrice}원</div>
                <div className="won">{totalOrder.toLocaleString()}원</div>
                <div className="won">{afterAsset.toLocaleString()}원</div>
              </div>
            </div>
            <div className="box3">
              <h5>주문수량</h5>
              <input
                className="form-control bg-light border-0 small"
                placeholder="주"
                type="number"
                min="1"
                value={order}
                onChange={buyOrderChange}
                style={{ textAlign: "right" }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={buyRequest}>
            매수
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

  const modalSell = (
    <>
      <Modal
        isOpen={modalType}
        toggle={sellModal}
        style={{ maxWidth: 2000, width: 600, marginTop: 200 }}
      >
        <ModalHeader toggle={sellModal}>매도하기</ModalHeader>
        <ModalBody>
          {/* 여기에 모달 컨텐츠를 추가하세요 */}
          <div id="modal-detail" className="flex">
            <div className="flex">
              <div className="box1">
                <div>현재 보유 주</div>
                <div>주문단가</div>
                <div>총 매도금액</div>
              </div>
              <div className="box2">
                <div style={{ textAlign: "right" }}>{currentHavingStock}주</div>
                <div style={{ textAlign: "right" }}>{currentPrice}원</div>
                <div className="won">{totalOrder}원</div>
              </div>
            </div>
            <div className="box3">
              <h5>주문수량</h5>
              <input
                className="form-control bg-light border-0 small"
                placeholder="주"
                type="number"
                min="0"
                max={currentHavingStock}
                value={order}
                onChange={sellOrderChange}
                style={{ textAlign: "right" }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sellRequest}>
            매도
          </Button>
          <Button color="secondary" onClick={sellModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

  const viewNews = (
    <>
      <NewsTest />
    </>
  );

  const viewPrice = (
    <>
      <div className="card-body" style={{ padding: "0" }}>
        <div>
          <AskingPrice />
        </div>
      </div>
      {isLoggedIn ? (
        <div className="flex">
          <button
            className="btn btn-sm btn-user btn-danger"
            onClick={toggleModal}
          >
            매수
          </button>
          <button
            className="btn btn-sm btn-user btn-primary"
            onClick={sellModal}
          >
            매도
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );

  // 종목 정보
  const viewInfo = (
    <>
      <table
        className="responsive-table"
        style={{
          width: "100%",
          fontWeight: "550",
          margin: "0",
          height: "350px",
        }}
      >
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
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
                <td>{dateFormatJ(item.date)}</td>
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
      <InfoTest />
    </>
  );

  const viewMyStock = (
    <>
      <div className="card-body">
        {currentHavingStock === 0 ? (
          <div className="stock-notice">
            <p>해당 주식의 보유 수량은 0개입니다.</p>
          </div>
        ) : (
          <div className="info">
            <table className="myTable">
              <tbody>
                <tr>
                  <td className="mine">1주 평균금액</td>
                  <td>
                    {currentHavingStock === 0
                      ? 0
                      : Math.floor(
                          pastStock / currentHavingStock
                        ).toLocaleString()}
                    원
                  </td>
                  {/* 일단 '호가'에서 선택된 금액으로 설정하겠습니다. 불필요하다고 판단되면 삭제해도 좋습니다.  */}
                </tr>
                <tr>
                  <td className="mine">보유 수량</td>
                  <td>{currentHavingStock}주</td>
                </tr>
                <tr>
                  <td className="mine">총 금액</td>
                  <td class="total-amount">
                    {(livePrice * currentHavingStock).toLocaleString()}원
                    {currentHavingStock === 0 ? (
                      <div></div>
                    ) : (
                      <div
                        style={{
                          fontSize: "15px",
                          color: profit >= 0 ? "red" : "blue",
                        }}
                      >
                        <span>{profit}원 </span>
                        <span>
                          ({parseFloat((profit / pastStock) * 100).toFixed(2)}
                          %)
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="mine">투자 원금</td>
                  <td>
                    {currentHavingStock === 0 ? 0 : pastStock.toLocaleString()}
                    원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
  const [data, setData] = useState(null); // 결과를 저장할 상태
  const [loadingFail, setLoadingFail] = useState(false); // 로딩실패시 재렌더링을 위한 상태관리
  let corps = value;
  const getCode = async (e) => {
    try {
      //   corps = e.target.dataSet.stockId;
      const res = await fetch(
        "/getCorpOutline_V2?pageNo=1&resultType=json&serviceKey=" +
          DATA_GO_KR_KEY +
          "&numOfRows=20&corpNm=" +
          corps +
          ""
      );

      if (res.status === 200) {
        const data = await res.json();
        setData(data.response.body.items.item); // 결과를 상태에 저장
      }
      if (res.status === 500 || 504) {
        setLoadingFail(!loadingFail);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data === null) {
      getCode();
    }
  }, [loadingFail]);

  // data 상태가 null인 경우 로딩 상태 표시
  if (data === null || livePrice === null) {
    return (
      <div id="spinner-image">
        <img
          src={require("../layout/guideline/image/spiner.gif")}
          alt="Loading..."
        ></img>
      </div>
    );
  }

  const findStockCode = (stockName) => {
    const stock = data.find((item) => item.corpNm === stockName); //이름
    if (stock && stock.fssCorpUnqNo !== "") {
      return stock.fssCorpUnqNo; // 코드
    } else {
      return null;
    }
  };

  //   const stockName = value;
  const stockCode = findStockCode(value);
  //관련종목 추천 버튼 클릭 시 이벤트 로직
  const research = (e) => {
    redirection(`/Detail/${e.target.textContent}`);
  };

  //관심종목 클릭 이벤트
  function favoriteClickHandler(index) {
    redirection(
      `/detail/${favoriteList[index].stockName}(${favoriteList[index].stockCode})`
    );
  }

  return (
    <>
      <body id="page-top" style={{ width: "80%" }}>
        <div id="wrapper">
          <div id="container">
            <h1 className="flex">
              {isLogin() ? (
                <span className="star-icon" onClick={toggleStar}>
                  <FontAwesomeIcon
                    icon={filled ? filledStar : emptyStar}
                    style={{
                      color: filled ? "#F9BC28" : "black",
                      marginBottom: "4px",
                    }}
                  />
                  &nbsp;
                </span>
              ) : (
                <span></span>
              )}
              {value}
              {stockCode}
              <span className="live-price">
                {livePrice !== undefined
                  ? livePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    "원 "
                  : "      "}

                <span style={isRise ? { color: "red" } : { color: "blue" }}>
                  {fluctuationRate === undefined
                    ? "      "
                    : isRise
                    ? `▲${fluctuationRate}%`
                    : `▼${fluctuationRate}%`}
                  {}
                </span>
              </span>
            </h1>

            <div className="margin-wrapper">
              <div className="middle-content  flex">
                <div id="first-box" className="popular-trade card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      관심종목
                    </h6>
                  </div>
                  {
                    <div className="card-body">
                      <div className="like-content">
                        {favoriteList.map((item, index) => (
                          <p
                            className="btn btn-success btn-icon-split"
                            onClick={(e) => favoriteClickHandler(index)}
                            key={index}
                            style={{ display: "block", fontWeight: "bold" }}
                          >
                            {item.stockName}
                          </p>
                        ))}
                      </div>
                    </div>
                  }
                </div>
                <div id="second-box" className="popular-trade card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      그래프
                    </h6>
                  </div>
                  <div className="card-body graph-box">
                    <Candle dailyPrice={dailyPrice} />
                  </div>
                </div>
                <div id="third-box" className="popular-trade card shadow mb-4">
                  <div className="card-header">
                    <h6
                      className="m-0 font-weight-bold text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        id="price"
                        className="border-bottom-primary"
                        onClick={showPrice}
                      >
                        호가
                      </span>
                      <span
                        id="news"
                        className="border-bottom-primary"
                        onClick={showNews}
                      >
                        뉴스
                      </span>
                      <span
                        id="info"
                        className="border-bottom-primary"
                        onClick={showInfo}
                      >
                        종목정보
                      </span>
                      <span
                        id="myStock"
                        className="border-bottom-primary"
                        onClick={showMyStock}
                      >
                        내주식
                      </span>
                    </h6>
                  </div>
                  {stockPrice && viewPrice}
                  {news && viewNews}
                  {info && viewInfo}
                  {myStock && viewMyStock}
                </div>
              </div>
              <hr />
              <div className="flex bottom-content">
                <div id="last-box" className="simulated-rank card shadow mb-4">
                  <div className="card-header flex">
                    <h6 className="m-0 font-weight-bold text-primary">
                      MBTI별 추천
                    </h6>
                    <InvestmentStrategy personalityType={myMbti} />
                  </div>
                  <div className="card-body" id="sic-body">
                    <RcmMbti value={value} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      {isModalOpen && modalBuy}
      {modalType && modalSell}
    </>
  );
};

export default Detail;
