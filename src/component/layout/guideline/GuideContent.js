import React from "react";
import "../../bootstrap/css/sb-admin-2.min.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const GuideContent = () => {
  return (
    <div
      className="container-fluid"
      style={{ padding: "20px 100px 200px 100px" }}
    >
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1
          class="h4 mb-0 text-gray-800"
          style={{ fontWeight: 700, fontSize: 30 }}
        >
          기초 용어 설명
        </h1>
      </div>
      <h4 id="0">주식 차트</h4>
      <p>
        주식 시장에서 주식 가격의 변동을 시각적으로 나타내고, 주식 시장 동향을
        파악하고 예측하는 데 도움을 주는 중요한 도구이다. 차트의 가로축은
        시간을, 세로축은 주식의 가격을 나타내며 선/막대 그래프, 캔들스틱 차트
        등의 형태로 표현된다.
        <br />
        <br />
        <img
          src={require("./image/기영이.png")}
          alt="@"
          style={{ width: 400, height: 300 }}
          className="center-image"
        ></img>
      </p>
      <br />
      <br />
      <h4 id="1">KOSPI / KOSDAQ</h4>
      <p>
        주식변동 기준시점의 주가기준과 비교하여 비교시점의 전체적인 주가의
        흐름이다. 일반적으로 코스피(KOSPI)는 대기업, 코스닥(KOSDAQ)은 중견
        중소기업의 수치를 나타낸다.
        <br />
        <img
          src={require("./image/kospi_kosdaq.png")}
          alt="@"
          style={{ width: 400, height: 300 }}
          className="center-image"
        ></img>
      </p>
      <br />

      <h4 id="2">매수 / 매도</h4>
      <p>
        매수는 주식을 구매하는 것이고, 매도는 주식을 판매하는 것이다.(호가
        창에서의 빨간 버튼의 매수, 파란 버튼의 매도)
        <img
          src={require("./image/매수매도.png")}
          alt="@"
          style={{ width: 450, height: 50, marginTop: "50px" }}
          className="center-image"
        ></img>
      </p>
      <br />

      <h4 id="3">시가총액</h4>
      <p>
        모든 상장주식을 '시가'로 평가한 총액이다.
        <br />
        -시가(하루 주식거래 최초 결정된 가격)
        <br />
        <img
          src={require("./image/시가총액.png")}
          alt="@"
          className="center-image"
          style={{ width: "800px", marginTop: "50px" }}
        ></img>
      </p>
      <br />

      <h4 id="4">호가</h4>
      <p>
        매수/매도 시 구매/판매 할 가격을 미리 걸어두는 것이다.
        <br />
        <img
          className="center-image"
          src={require("./image/호가.png")}
          style={{ width: "350px", marginTop: "50px" }}
          alt="@"
        ></img>
      </p>
      <br />

      <h4 id="5">양봉</h4>
      <p>
        종가가 시가보다 높은 것이며 빨간색으로 표현된다.
        <br />
      </p>
      <br />

      <h4 id="6">음봉</h4>
      <p>
        종가가 시가보다 낮은 것이며 파란색으로 표현된다.
        <br />
        <img
          src={require("./image/양봉음봉.png")}
          alt="@"
          style={{ width: 700, height: 300 }}
          className="center-image"
        ></img>
      </p>
      <br />

      <p>
        봉의 길이는 가격 변동폭에 비례해서 길어진다. 해당 기간동안의 주가의
        상승/하락폭을 나타낸다.
        <br />본 프로그램의 차트에서는 <span>'시가'</span>가 <span>'open'</span>
        , <span>'종가'</span>가 <span>'close'</span>,<span>'저가'</span>가{" "}
        <span>'lowest'</span>, <span>'고가'</span>가 <span>'highest'</span>로
        표현된다.
      </p>
      <img
        className="center-image"
        src={require("./image/설명.png")}
        alt="@"
        style={{ width: 750, height: 300 }}
      ></img>
      <br />

      <h4 id="7">가격 제한폭</h4>
      <p>
        주식시장 및 파생상품 시장에서 개별 주식이나 종목이 일정범위 이상 거래될
        수 없도록 제한한 것이다. 주로 주식 값이 과도하게 상승했을 때나 아니면
        폭락했을 때에 시장이 심하게 충격을 받는것을 방지하는 장치로 도입되었다.
        <br />
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontWeight: "600",
          }}
        >{`<유가증권시장(KOSPI)>`}</div>
        <img
          className="center-image"
          src={require("./image/가격제한폭.jpg")}
          alt="@"
          style={{ width: 500, height: 600, marginTop: "10px" }}
        ></img>
      </p>
      <br />
      <h4 id="8">예수금</h4>
      <p>
        계좌에 넣어둔 현금으로 매매 가능 금액을 나타낸다.
        <br />
      </p>
      <br />

      <h4 id="9">우선주</h4>
      <p>
        의결권이 없으며 보통주보다 먼저 배당을 받을 수 있는 권리가 부여된
        주식이며, 보통주에 비해 높은 배당금을 받을 수 있다.
        <br />
        <img
          src={require("./image/우선주.jpg")}
          alt="@"
          style={{
            width: 450,
            height: 450,
            marginTop: "50px",
            alignContent: "center",
          }}
          className="center-image"
        ></img>
        <br />
        <div style={{ textAlign: "center" }}>{`<보통주와 우선주의 차이>`}</div>
      </p>
      <h4 id="10">상장폐지</h4>
      <p>
        주가가 앞서 말한 바와 다르게 30% 이상 하락하는 경우가 있다. 이는
        상장폐지 된 주식일 수 있으며 해당 주식은 약 일주일 간 '정리매매'기간을
        부여받는다. 그 시기에는 가격제한폭이 없고 많은 변동을 보인다. 주가
        제한폭이 없으므로 투자를 추천하지 않는다.
        <br />
        <img
          src={require("./image/상장폐지.png")}
          alt="2013년 상장폐지된 에스와이코퍼레이션"
          style={{
            width: 650,
            height: 300,
            marginTop: "50px",
            alignContent: "center",
          }}
          className="center-image"
        ></img>
      </p>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="tutorial">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1
            class="h4 mb-0 text-gray-800"
            style={{ fontWeight: 700, fontSize: 30 }}
          >
            튜토리얼
          </h1>
        </div>
        <p id="11">
          메인 화면은 종목을 검색하여 매매가 가능한 검색창, 상승주와 하락주,
          KOSPI와 KOSDAQ 지수, 당일 인기 거래량 순위, 오늘의 증시뉴스, 모의 투자
          랭킹, 관련 영상, 관심종목으로 이루어져 있다. 장은 평일 오전 9시부터
          오후 3시 30분까지 운영되고 주말엔 운영하지 않는다.
        </p>
        <img
          src={require("./image/메인1.png")}
          alt="@"
          style={{ marginTop: "50px", width: "850px" }}
          className="center-image"
        ></img>
        <img
          src={require("./image/메인2.png")}
          alt="@"
          style={{ marginBottom: "100px", width: "850px" }}
          className="center-image"
        ></img>
        <p id="12">매수나 매도를 원하는 종목 검색한다.</p>
        <img
          src={require("./image/검색창.png")}
          alt="@"
          style={{ marginBottom: "50px", width: "450px" }}
          className="center-image"
        ></img>
        <p id="13">
          종목 상세창 우측에서는 해당 종목의 호가, 관련 뉴스, 종목 정보, 내 주식
          에서는 각각 매수와 매도 잔량, 실시간으로 제공되는 종목의 관련 뉴스,
          종목의 6개월 간의 종목 추이와 기본 정보, 종목을 소유하고 있을 때 그
          수익률과 그 외의 정보들이 제공된다. 호가 창이 기본적으로 제공되며 이
          곳에서 매수나 매도를 진행할 수 있다.
        </p>
        <img
          src={require("./image/호가.png")}
          alt="@"
          style={{
            margin: "50px 100px 100px 0",
            width: "400px",
          }}
        ></img>
        <img
          src={require("./image/뉴스.png")}
          alt="@"
          style={{ margin: "50px 0 100px 0", width: "400px" }}
        ></img>
        <img
          src={require("./image/종목정보.png")}
          alt="@"
          style={{ margin: "50px 100px 50px 0", width: "400px" }}
        ></img>
        <img
          src={require("./image/내주식.png")}
          alt="@"
          style={{ margin: "50px 0", width: "400px" }}
        ></img>
        <p>
          호가, 뉴스, 종목정보를 기반으로 차트를 참조하여 호가 파트에서 매수
          혹은 매도를 진행한다.
        </p>
        <img
          src={require("./image/매수.png")}
          alt="@"
          style={{ margin: "50px 0", width: "450px" }}
        ></img>
        <img
          src={require("./image/매도.png")}
          alt="@"
          style={{ margin: "50px 0", width: "450px" }}
        ></img>
        <p id="14">
          종목 상세창에서 즐겨찾기 버튼으로 관심종목에 추가할 수 있으며 목록은
          메인 화면의 우측 하단이나, 종목 상세창 좌측에서 확인할 수 있다.
        </p>
        <img
          src={require("./image/즐겨찾기1.png")}
          alt="@"
          style={{ marginBottom: "50px", width: "200px" }}
          className="center-image"
        ></img>
        <p id="15">
          매수나 매도가 고민될 때, 관련주나 타 종목을 보고싶을 때 종목 상세
          페이지 아래의 mbti별 추천 종목을 참고할 수 있다.
        </p>
        <img
          src={require("./image/mbti.png")}
          alt="@"
          style={{ marginBottom: "50px", width: "900px" }}
          className="center-image"
        ></img>
        <p id="16">
          수익에 따른 랭킹이 부여된다. 랭킹은 메인 화면의 좌측 하단에서 확인할
          수 있다. 회원명을 클릭하면 사용자의 매수 / 매도 이력을 조회할 수 있고
          일반 회원은 최신 3건의 이력만 조회가 가능하다.
        </p>
        <img
          src={require("./image/랭킹.png")}
          alt="@"
          style={{ marginBottom: "50px", width: "350px", marginRight: "100px" }}
        ></img>
        <img
          src={require("./image/랭킹정보.png")}
          alt="@"
          style={{ marginBottom: "50px", width: "400px" }}
        ></img>
        <p id="17">
          마이페이지의 '자산관리' 파트에서 나의 자산 정보, 보유 종목 정보,
          거래내역을 확인할 수 있다.
          <br />
          자산 정보에서는 주식 평가금액을 포함해 보유 주식의 수익률과 함께 도넛
          그래프를 통해 자산의 현황을 확인할 수 있으며 거래 미체결 시에는
          그래프가 출력되지 않는다.
        </p>
        <img
          src={require("./image/자산관리_자산정보.png")}
          alt="@"
          style={{ margin: "50px auto 200px auto", width: "900px" }}
          className="center-image"
        ></img>
        <p>
          보유 종목 정보와 거래 내역 테이블로 매매이력과 각 주식들의 수익률을
          확인할 수 있다. 두 테이블 안의 종목명(종목 코드)의 탭을 클릭하면 해당
          주식의 상세 테이블로 이동한다.
        </p>
        <img
          src={require("./image/자산관리_보유종목정보거래내역.png")}
          alt="@"
          style={{ margin: "50px auto 200px auto", width: "900px" }}
          className="center-image"
        ></img>
        <p id="18">
          보유 종목과 관심 종목의 1년간의 주가 추이를 마이페이지에서 조회할 수
          있다.
        </p>
        <img
          src={require("./image/주가추이.png")}
          alt="@"
          style={{ margin: "50px auto 200px auto", width: "900px" }}
          className="center-image"
        ></img>
        <div style={{ backgroundColor: "lightgray" }}>
          <p id="19">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "red" }}
            />{" "}
            주의{" "}
            <FontAwesomeIcon
              icon={faCircleExclamation}
              style={{ color: "red" }}
            />
            <br />
            <br />
            <a
              href="https://www.ytn.co.kr/_ln/0102_202101222019368154"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="card-body"
                style={{
                  backgroundColor: "white",
                  width: "70%",
                  alignContent: "center",
                }}
              >
                <h5>'주식 리딩방' 들어가보니...'주린이' 노린 사기 피해 급증</h5>
                <p>
                  고수익이 나는 주식 투자 종목을 알려준다는 명목으로 운영되는
                  SNS 단체 대화방
                </p>
              </div>
            </a>
            <br />본 프로그램 제작자들은 건전한 주식투자를 지향하고 있습니다.
            안전하고 신뢰할 수 있는 투자 방법과 정보를 찾아서 안전하게
            투자하시기를 권장드립니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideContent;
