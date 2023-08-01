import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { RequsetHeader } from "../../../config/apikey";

const MyAsset = ({
  userInfo,
  historyInfo,
  detailHandler,
  getFormattedDate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentLivePrice, setCurrentLivePrice] = useState([]);

  useEffect(() => {
    dailyPrice();
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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

  function getTradeType(tradeType) {
    switch (tradeType) {
      case "buy":
        return "매수";
      case "sell":
        return "매도";
    }
  }

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
    }
    let totalReturnPercent = 0;
    returnPercentArray.forEach((item) => {
      totalReturnPercent += parseFloat(item.returnPercent);
    });
    const averageReturnPercent = (
      totalReturnPercent / returnPercentArray.length
    ).toFixed(2);
    if (isNaN(averageReturnPercent)) {
      return "0";
    }
    return averageReturnPercent;
  }

  return (
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
            {userInfo.myStocks
              ? userInfo.myStocks.slice(0, 3).map((trade, index) => (
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
          <Doughnut data={data}></Doughnut>
        </div>
      </div>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        종목명(종목 코드)열의 종목을 클릭하면 해당 주식의 상세 페이지로
        이동합니다.
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
              : null;
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
                  onClick={detailHandler}
                  style={{
                    border: "1px solid lightgray",
                    textAlign: "center",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {trade.stockName}({trade.stockId})
                </th>
                <td>{trade.quantity}주</td>
                <td>
                  {Number(
                    (trade.price / trade.quantity).toFixed(0)
                  ).toLocaleString()}
                  원
                </td>
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
                      <td>{trade.price.toLocaleString()} 원</td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
      {moreButton()}
    </>
  );
};

export default MyAsset;
