import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const OverallRank = () => {
  const [rankingTable, setRankingTable] = useState();
  useEffect(() => {}, [rankingTable]);

  async function getRankInfo() {
    const res = await fetch("http://localhost:8181/api/trade/rank");
    const rankData = await res.json();
    console.log(rankData);
    setRankingTable(rankData);
  }
  if (!rankingTable) getRankInfo();

  const rankingBody = () => {
    return rankingTable.map((item) => (
      <tr>
        <th scope="row">
          {item.rank === 1 ? (
            <FontAwesomeIcon
              icon={faCrown}
              style={{ color: "#F9BC28", fontSize: "23px" }}
            />
          ) : (
            item.rank
          )}
        </th>
        <td>{item.userName}</td>
        <td>
          <span className={item.profit >= 0 ? "positive" : "negative"}>
            {item.profit >= 0 ? "+" : ""}
            {item.profit.toLocaleString()}
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="simulated-rank card shadow">
      <div className="card-header">
        <h6 className="m-0 font-weight-bold text-primary">모의 투자 랭킹</h6>
      </div>
      <table className="collapsed" id="table">
        <thead>
          <tr className="high">
            <th scope="col">랭킹</th>
            <th scope="col">회원명</th>
            <th scope="col">총 수익 (원)</th>
          </tr>
        </thead>
        <tbody>{!!rankingTable && rankingBody()}</tbody>
      </table>
    </div>
  );
};

export default OverallRank;
