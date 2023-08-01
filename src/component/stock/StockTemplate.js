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
import Kosdaq from "./Kosdaq";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../util/login-utils";
import OverallRank from "./OverallRank";
import { API_BASE_URL } from "../../config/host-config";
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

  //처음 렌더링시 실행
  useEffect(() => {
    getKIAccessToken(); //토큰 발급
  }, []);

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
        API_BASE_URL + "/api/user/favorite/" + loginEmail,
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getRank();
  // }, []);

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
                        !x.hts_kor_isnm.includes("KODEX") && //삼성자산운용의 ETF
                        !x.hts_kor_isnm.includes("선물") &&
                        !x.hts_kor_isnm.includes("스팩") &&
                        !x.hts_kor_isnm.includes("인버스") &&
                        !x.hts_kor_isnm.includes("TIGER") && //미래에셋자산운용의 ETF
                        !x.hts_kor_isnm.includes("HANARO") &&
                        !x.hts_kor_isnm.includes("KOSEF") &&
                        !x.hts_kor_isnm.includes("SOL") &&
                        !x.hts_kor_isnm.includes("KBSTAR") && //국민
                        !x.hts_kor_isnm.includes("KTOP") &&
                        !x.hts_kor_isnm.includes("TIMEFOLIO") &&
                        !x.hts_kor_isnm.includes("ARIRANG") &&
                        !x.hts_kor_isnm.includes("200") &&
                        !x.hts_kor_isnm.includes("Fn") &&
                        !x.hts_kor_isnm.includes("ACE") &&
                        !x.hts_kor_isnm.includes("KRX") &&
                        !x.hts_kor_isnm.includes("BNK") &&
                        !x.hts_kor_isnm.includes("WOORI") && //우리
                        !x.hts_kor_isnm.includes("KOREA") &&
                        !x.hts_kor_isnm.includes("TREX") &&
                        !x.hts_kor_isnm.includes("KOSEF") &&
                        !x.hts_kor_isnm.includes("옥수수") &&
                        !x.hts_kor_isnm.includes("레버리지")
                    ) // 특정 단어를 포함하지 않는 항목만 필터링
                    .map((x, index) => (
                      <tr key={index}>
                        <td scope="row">{x.mksc_shrn_iscd}</td>
                        <td>
                          <p className="stock-name" onClick={detailHandler}>
                            {x.hts_kor_isnm}
                            <span style={{ display: "none" }}>
                              ({x.mksc_shrn_iscd})
                            </span>
                          </p>
                        </td>
                        <td>{x.stck_prpr}원</td>
                        <td>
                          <span
                            className={
                              x.prdy_ctrt >= 0 ? "positive" : "negative"
                            }
                          >
                            {x.prdy_ctrt >= 0 && "+"}
                            {x.prdy_ctrt}%
                          </span>
                        </td>
                        <td>{abbreviateNumber(x.acml_vol)}</td>
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
          <OverallRank />
          <div className="youtube-iframe card shadow">
            <div className="card-header">
              <h6 className="m-0 font-weight-bold text-primary">관련 영상</h6>
            </div>
            <iframe
              width="560"
              height="345"
              src="https://www.youtube.com/embed/nawUv8DcI80"
              title="최고민수의 주식 종목 고르는 10단계 방법 1부"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
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
