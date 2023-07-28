import React, { useState } from "react";
import Paging from "../board/Paging";

const TotalTradeHistory = () => {
  const [page, setPage] = useState(1);
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
                  <th>손익</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>2210000</td>
                  <td>61</td>
                  <td>매도</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>1255200</td>
                  <td>63</td>
                  <td>매수</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr>
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
