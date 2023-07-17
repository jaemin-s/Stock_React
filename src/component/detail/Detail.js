import React, { useEffect, useRef, useState } from "react";
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

const Detail = () => {
  const { value } = useParams();
  const title = value.split("(", 2);
  // console.log(title[0]); //검색어의 회사명
  // console.log(title[1].slice(0, -1)); // 검색어의 종목 코드

  const redirection = useNavigate();

  // 즐겨찾기 별표 채우기
  const [filled, setFilled] = useState(false);

  const toggleStar = () => {
    setFilled(!filled);
  };

  // 8자리 날짜를 yyyy-MM-dd로 변환
  const dateFormat = (date) => {
    return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
  };

  //일자별 시세
  const dailyPrice = async (e) => {
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
    // console.log(res);

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
        } = x;
        dates.unshift(dateFormat(date));
        values.unshift([
          parseInt(open),
          parseInt(close),
          parseInt(lowest),
          parseInt(highest),
        ]);
      });
      // console.log({ categoryData: dates, values });
      return { categoryData: dates, values };
    } else {
      // console.log("res인데 말이야 = ",res);
    }
  };
  const [selectedValue, setSelectedValue] = useState(null);

  function selectedValueHandler(value) {
    // console.log("selectedValueHandler : " + value);
    setSelectedValue(value, () => {
      // console.log("selectedValue : " + selectedValue);
    });
  }
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

  //const [selected, setSelected] = useState('호가');

  const toggleModal = (e) => {
    setIsModalOpen(!isModalOpen);
    // console.log(e);
  };

  const sellModal = () => {
    setModalType(!modalType);
  };

  const [order, setOrder] = useState("");

  const orderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setOrder(value);
    }
  };

  useEffect(() => {
    console.log("selectedValue!!!: " + selectedValue);
  }, [selectedValue]);

  const currentPrice = selectedValue;

  const totalOrder = order * currentPrice;

  const currentAsset = 5000000;

  const afterAsset = currentAsset - totalOrder; //매매 후 자산

  const currentHavingStock = 3;

  const totalPrice = currentHavingStock * currentPrice;

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
                <div style={{ textAlign: "right" }}>{selectedValue}원</div>
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
                onChange={orderChange}
                style={{ textAlign: "right" }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleModal}>
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
                <div>총 주문금액</div>
              </div>
              <div className="box2">
                <div style={{ textAlign: "right" }}>{currentHavingStock}</div>
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
                min="1"
                max={currentHavingStock}
                value={order}
                onChange={orderChange}
                style={{ textAlign: "right" }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sellModal}>
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
          <AskingPrice selectedValueHandler={selectedValueHandler} />
        </div>
      </div>
      <div className="flex">
        <button
          className="btn btn-sm btn-user btn-danger"
          onClick={toggleModal}
        >
          매수
        </button>
        <button className="btn btn-sm btn-user btn-primary" onClick={sellModal}>
          매도
        </button>
      </div>
    </>
  );

  // 종목 정보
  const viewInfo = (
    // <Carousel>
    // <div className="card-body" id='viewInfoId'>1
    //     <p> 법인번호: 0287364849484 </p>
    //     <hr />
    //     <p> 법인명: 오늘내일 </p>
    //     <hr />
    //     <p> 기업매출액 : 34,357,098,222 </p>
    //     <hr />
    //     <p> 기업영업이익: 53,363,644 </p>
    //     <hr />
    //     <p> 기업총자본금액 : 5,525,645,723 </p>
    //     <hr />
    //     <p> 재무제표부채비율: 24</p>
    // </div>
    // </Carousel>
    <>
      <InfoTest />
    </>
  );

  const viewMyStock = (
    <>
      <div className="card-body">
        <div className="info">
          <table className="myTable">
            <tbody>
              <tr>
                <td className="mine">1주 평균금액</td>
                <td>{selectedValue}원</td>
                {/* 일단 '호가'에서 선택된 금액으로 설정하겠습니다. 불필요하다고 판단되면 삭제해도 좋습니다.  */}
              </tr>
              <tr>
                <td className="mine">보유 수량</td>
                <td>{currentHavingStock}</td>
              </tr>
              <tr>
                <td className="mine">총 금액</td>
                <td class="total-amount">
                  {(selectedValue * currentHavingStock).toLocaleString()}원
                  <div style={{ fontSize: "15px" }}>
                    <span>+2,640</span>
                    <span class="positive">(+8.1%)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="mine">투자 원금</td>
                <td>{totalPrice.toLocaleString()}원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const [data, setData] = useState(null); // 결과를 저장할 상태
  let corps = value;
  const getCode = async (e) => {
    try {
      //   corps = e.target.dataSet.stockId;
      const res = await fetch(
        "https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2/getCorpOutline_V2?pageNo=1&resultType=json&serviceKey=" +
          DATA_GO_KR_KEY +
          "&numOfRows=20&corpNm=" +
          corps +
          ""
      );

      if (res.status === 200) {
        const data = await res.json();
        setData(data.response.body.items.item); // 결과를 상태에 저장
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data === null) {
      getCode();
    }
  }, [data]);

  // data 상태가 null인 경우 로딩 상태 표시
  if (data === null) {
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

  return (
    <>
      <body id="page-top" style={{ width: "80%" }}>
        <div id="wrapper">
          <div id="container">
            <h1>
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
              {value}
              {stockCode}
            </h1>

            <div className="margin-wrapper">
              <div className="middle-content  flex">
                <div id="first-box" className="popular-trade card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      즐겨찾기
                    </h6>
                  </div>
                  {filled && (
                    <div className="card-body">
                      <div className="like-content">
                        <a href={`/detail/${value}`}>{value}</a>
                      </div>
                    </div>
                  )}
                  {/* {filled && (
                            <div className="card-body">
                            <div className='like-content'><a href="/detail/{종목명}">{종목명}</a> </div>
                            </div>
                        )} */}
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
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">
                      관련종목 추천
                    </h6>
                  </div>
                  <div className="card-body">
                    <button onClick={research}>카카오페이</button>
                    <button onClick={research}>카카오뱅크</button>
                    <button onClick={research}>카카오화재</button>
                    <button onClick={research}>카카오게임즈</button>
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
