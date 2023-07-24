import React, { useContext, useEffect, useState } from "react";
import {
  KI_BASE_DOMAIN,
  KI_DOMESTIC_STOCK_URL,
  KI_TOKEN_URL,
} from "../../config/host-config";
import {
  KI_APP_KEY,
  KI_SECRET_KEY,
  KI_ID,
  RequsetHeader,
} from "../../config/apikey";
import * as echarts from "echarts";
import NewsTest from "../news/NewsTest";
import Detail from "../detail/Detail";
import "./StockTemplate.scss";
import "../bootstrap/css/sb-admin-2.min.css";
import MoveStockInfo from "./MoveStockInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Kospi from "./Kospi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faUpLong } from "@fortawesome/free-solid-svg-icons";
import Kosdaq from "./Kosdaq";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../util/login-utils";

function StockTemplate() {
  // 토큰 발급이 최우선이기 때문에 토큰 발급 시 관리할 변수
  const [haveToken, setHaveToken] = useState(false);
  // 관심종목 목록 관리
  const [favoriteList, setFavoriteList] = useState([]);

  const redirection = useNavigate();

  const detailHandler = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    const query = e.target.textContent;
    redirection(`/Detail/${query}`);
  };

  //토큰 발급
  const getKIAccessToken = async () => {
    const res = await fetch(KI_TOKEN_URL, {
      method: "POST",
      body: JSON.stringify({
        grant_type: "client_credentials",
        appkey: KI_APP_KEY,
        appsecret: KI_SECRET_KEY,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("ACCESS_TOKEN", "Bearer " + data.access_token);
      setHaveToken(!haveToken);
    }
  };
  useEffect(() => {
    getKIAccessToken(); //토큰 발급
    // loadFavorite(); //관심종목 리스트 불러오기
  }, []);

  //처음 렌더링시 실행
  useEffect(() => {
    getRank(); //거래량 순위 불러오기
  }, [haveToken]);

  //등락률 상위(0),하위(1) 종목
  const fluctuationRate = async (seq) => {
    const userId = KI_ID; //아이디 숨겨야함.
    const res = await fetch(
      "/quotations/psearch-result?user_id=" + userId + "&seq=" + seq,
      {
        headers: {
          ...RequsetHeader,
          tr_id: "HHKST03900400",
          custtype: "P",
        },
      }
    );
    let values = [];
    if (res.status === 200) {
      const data = await res.json();
      // console.log( data.output2 );
      data.output2.forEach((x) => {
        const { code, name, price, chgrate } = x;
        values.push({ code, name, price, chgrate });
      });
      // console.log(values[0]);
    }
    return values;
  };

  //관심종목 목록 불러오기 로직
  const loadFavorite = async () => {
    const loginEmail = localStorage.getItem("LOGIN_USEREMAIL");
    console.log(loginEmail);
    if (loginEmail !== null) {
      const res = await fetch(
        "http://localhost:8181/api/user/favorite/" + loginEmail,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      if (res.status === 200) {
        const list = await res.json();
        setFavoriteList(list);
      }
    }
  };

  const [data, setData] = useState(null); // 결과를 저장할 상태

  //거래량 순위
  const getRank = async () => {
    try {
      const res = await fetch(
        "/quotations/volume-rank?FID_COND_MRKT_DIV_CODE=J&FID_COND_SCR_DIV_CODE=20171&FID_INPUT_ISCD=0000&FID_DIV_CLS_CODE=0&FID_BLNG_CLS_CODE=0&FID_TRGT_CLS_CODE=111111111&FID_TRGT_EXLS_CLS_CODE=000000&FID_INPUT_PRICE_1=&FID_INPUT_PRICE_2&FID_VOL_CNT=&FID_INPUT_DATE_1",
        {
          headers: {
            tr_id: "FHPST01710000",
            custtype: "P",
            ...RequsetHeader,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setData(data.output); // 결과를 상태에 저장
        loadFavorite(); //관심종목 리스트 불러오기
      } else if (res.status === 500) {
        redirection("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  function abbreviateNumber(acml_vol) {
    const SI_SYMBOLS = ["", "", "K", "M", "G"]; // 약어 표기에 사용할 심볼 배열
    const tier = (Math.log10(Math.abs(acml_vol)) / 3) | 0; // 숫자의 크기를 기준으로 심볼을 선택하기 위한 계산
    if (tier === 0) return acml_vol.toLocaleString(); // 1,000 미만의 수는 그대로 표기
    const suffix = SI_SYMBOLS[tier]; // 선택된 심볼
    const scale = Math.pow(10, tier * 3); // 해당 심볼에 대한 크기 조정
    const scaledNumber = acml_vol / scale; // 크기 조정된 숫자
    return scaledNumber.toFixed(2) + suffix; // 소수점 첫째 자리까지 표기하고 심볼을 추가하여 반환
  }

  //로그인하러 가기 로직
  const loginHandler = () => {
    redirection(`/login`);
  };

  //관심종목 클릭 이벤트
  function favoriteClickHandler(index) {
    console.log(index);
    console.log(favoriteList[index].stockCode);
    redirection(
      `/detail/${favoriteList[index].stockName}(${favoriteList[index].stockCode})`
    );
  }
  return (
    <>
      <MoveStockInfo getStockRate={fluctuationRate} />
      <div className="margin-wrapper">
        <div className="main-chart card shadow">
          <div className="card-header">
            <h6 className="m-0 font-weight-bold text-primary">국내지수</h6>
          </div>
          <div className="card-body flex kospi-kosdaq">
            <div>
              <Kospi />
            </div>
            <div style={{ flex: 1 }}>
              <Kosdaq />
            </div>
          </div>
        </div>
        <div className="middle-content flex">
          <div className="popular-trade card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">
                인기 거래량 순위
              </h6>
            </div>

            {/* 반응형 구현 예정 */}

            {/* value : 변동률
                        <span className={value >= 0 ? "positive" : "negative"}>
                            {value >= 0 && "+"}{value}%
                        </span> 
                        변동률 음수는 파란색, 양수는 빨간색 표시*/}
            <div className="table-container">
              <table className="collapsed" id="table">
                <thead style={{ position: "sticky", top: 0 }}>
                  <tr className="high">
                    <th scope="col">종목번호</th>
                    <th scope="col">종목명</th>
                    <th scope="col">현재 주가</th>
                    <th scope="col">변동률</th>
                    <th scope="col">거래량</th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    .filter(
                      (x) =>
                        !x.hts_kor_isnm.includes("KODEX") &&
                        !x.hts_kor_isnm.includes("선물") &&
                        !x.hts_kor_isnm.includes("스팩")
                    ) // 특정 단어를 포함하지 않는 항목만 필터링
                    .map((x, index) => (
                      <tr key={index}>
                        <th scope="row">{x.mksc_shrn_iscd}</th> {/* 종목코드 */}
                        <td>
                          <p className="stock-name" onClick={detailHandler}>
                            {x.hts_kor_isnm}
                            <span style={{ display: "none" }}>
                              ({x.mksc_shrn_iscd})
                            </span>
                          </p>
                        </td>{" "}
                        {/* 종목명 */}
                        <td>{x.stck_prpr}원</td> {/* 주식 현재가 */}
                        <td>
                          <span
                            className={
                              x.prdy_ctrt >= 0 ? "positive" : "negative"
                            }
                          >
                            {x.prdy_ctrt >= 0 && "+"}
                            {x.prdy_ctrt}% {/* 전일 대비율 */}
                          </span>
                        </td>
                        <td>{abbreviateNumber(x.acml_vol)}</td>{" "}
                        {/* 누적 거래량 */}
                        {/* 약어 표기로 표시 */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sub-info card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">
                오늘의 증시 뉴스
              </h6>
            </div>
            <NewsTest />
          </div>
        </div>
        <div className="flex bottom-content">
          <div className="simulated-rank card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">
                모의 투자 랭킹
              </h6>
            </div>
            <table className="collapsed" id="table">
              <thead>
                <tr className="high">
                  <th scope="col">랭킹</th>
                  <th scope="col">회원명</th>
                  <th scope="col">수익률</th>
                  <th scope="col">총 자산</th>
                </tr>
              </thead>
              {/*  value : 수익률
                        <span className={value >= 0 ? "positive" : "negative"}>
                            {value >= 0 && "+"}{value}%
                        </span> 
                        변동률 음수는 파란색, 양수는 빨간색 표시*/}
              <tbody>
                <tr>
                  <th scope="row">
                    <FontAwesomeIcon
                      icon={faCrown}
                      style={{ color: "#F9BC28", fontSize: "23px" }}
                    />
                  </th>
                  <td>심재민</td>
                  <td>
                    <span className={+97.5 >= 0 ? "positive" : "negative"}>
                      {+97.5 >= 0 && "+"}
                      {+97.5}%
                    </span>
                  </td>
                  <td>10,000,000</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>김나영</td>
                  <td>
                    <span className={+83.2 >= 0 ? "positive" : "negative"}>
                      {+83.2 >= 0 && "+"}
                      {+83.2}%
                    </span>
                  </td>
                  <td>9,000,000</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>권진현</td>
                  <td>
                    <span className={+44 >= 0 ? "positive" : "negative"}>
                      {+44 >= 0 && "+"}
                      {+44}%
                    </span>
                  </td>
                  <td>8,000,000</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>최지혁</td>
                  <td>
                    <span className={+31 >= 0 ? "positive" : "negative"}>
                      {+31 >= 0 && "+"}
                      {+31}%
                    </span>
                  </td>
                  <td>7,000,000</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>오정원</td>
                  <td>
                    <span className={+5 >= 0 ? "positive" : "negative"}>
                      {+5 >= 0 && "+"}
                      {+5}%
                    </span>
                  </td>
                  <td>5,100,000</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>이준호</td>
                  <td>
                    <span className={-2 >= 0 ? "positive" : "negative"}>
                      {-2 >= 0 && "+"}
                      {-2}%
                    </span>
                  </td>
                  <td>4,800,000</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>이경민</td>
                  <td>
                    <span className={-52 >= 0 ? "positive" : "negative"}>
                      {-52 >= 0 && "+"}
                      {-52}%
                    </span>
                  </td>
                  <td>2,800,000</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>유승현</td>
                  <td>
                    <span className={-28 >= 0 ? "positive" : "negative"}>
                      {-28 >= 0 && "+"}
                      {-28}%
                    </span>
                  </td>
                  <td>14,800,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="youtube-iframe card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">관련 영상</h6>
            </div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/7S5ZdmnXQyU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
          <div className="bookmark card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">관심종목</h6>
            </div>
            {isLogin() ? (
              favoriteList.length === 0 ? (
                <div className="no-info">
                  <p>관심종목이 없습니다.</p>
                </div>
              ) : (
                <div className="card-body">
                  <div className="like-content favorite-box">
                    {favoriteList.map((item, index) => (
                      <p
                        className="btn btn-success btn-icon-split btn-favorite"
                        key={index}
                        onClick={(e) => favoriteClickHandler(index)}
                        style={{ display: "block", fontWeight: "bold" }}
                      >
                        {item.stockName}
                      </p>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="card-body">
                로그인 후 관심종목 기능을 이용해 보세요!
                <p
                  onClick={loginHandler}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  로그인 하러가기!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StockTemplate;
