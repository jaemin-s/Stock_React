import React, { useState } from "react";
import Paging from "../board/Paging";

const TotalTradeHistory = () => {
  const [page, setPage] = useState(1);
  const [totalHistory, setTotalHistory] = useState([
    {
      name: "",
      email: "",
      stockName: "",
      tradeMoney: "",
      tradeQuantity: "",
      tradeType: "",
      tradeDate: "",
      profit: "",
    },
  ]);
  async function fetchTradeHistory() {
    const res = await fetch("url");
    if (res.status === 200) {
      const historyData = await res.json();
      const tempArr = [];
      historyData.forEach((item) => {
        tempArr.push({
          name: item.name,
          email: item.email,
          stockName: item.stockName,
          tradeMoney: item.tradeMoney,
          tradeQuantity: item.tradeQuantity,
          tradeType: item.tradeType,
          tradeDate: item.tradeDate,
        });
      });
      setTotalHistory(tempArr);
    }
  }
  return (
    <>
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">거래내역</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>종목명</th>
                  <th>거래 금액</th>
                  <th>거래 수량</th>
                  <th>거래 유형</th>
                  <th>거래 일자</th>
                </tr>
              </thead>
              <tbody>
                {totalHistory.forEach((item) => {
                  <>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.stockName}</td>
                    <td>{item.tradeMoney}</td>
                    <td>{item.tradeQuantity}</td>
                    <td>{item.tradeType}</td>
                    <td>{item.tradeDate}</td>
                  </>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Paging page={page} count={1} setPage={setPage} />
    </>
  );
};

export default TotalTradeHistory;
