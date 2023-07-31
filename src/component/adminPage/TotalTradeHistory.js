import React, { useEffect, useState } from "react";
import Paging from "../board/Paging";
import { API_BASE_URL } from "../../config/host-config";
const TotalTradeHistory = () => {
  const [page, setPage] = useState(1);
  const [totalHistory, setTotalHistory] = useState([]);
  const [count, setCount] = useState(1);
  async function fetchTradeHistory() {
    const res = await fetch(
      API_BASE_URL +
        "/api/trade/historyAll" +
        "?size=" +
        8 +
        "&page=" +
        (page - 1)
    );

    if (res.status === 200) {
      const historyData = await res.json();
      setTotalHistory(historyData.content);
      setCount(historyData.totalElements);
    } else {
      console.error("fail");
    }
  }

  useEffect(() => {
    fetchTradeHistory();
  }, [page]);

  function getTradeType(tradeType) {
    switch (tradeType) {
      case "sell":
        return "매도";
      case "buy":
        return "매수";
    }
  }

  const dateFormat = (date) => {
    return date.slice(2, 10);
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">거래내역</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>종목명</th>
                  <th>거래 금액(원)</th>
                  <th>거래 수량</th>
                  <th>거래 유형</th>
                  <th>거래 일자</th>
                </tr>
              </thead>
              <tbody>
                {totalHistory
                  .filter(
                    (x) => !x.role.includes("ADMIN")
                    // 역할이 ADMIN인 사람 제외시키기
                  )
                  .map((item) => (
                    <tr key={item.tradeDate}>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>{item.stockName}</td>
                      <td>{item.price.toLocaleString()}</td>
                      <td>{item.quantity.toLocaleString()}</td>
                      <td>{getTradeType(item.tradeType)}</td>
                      <td>{dateFormat(item.tradeDate)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Paging page={page} count={count} setPage={setPage} />
    </>
  );
};

export default TotalTradeHistory;
