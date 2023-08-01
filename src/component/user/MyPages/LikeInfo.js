import React from "react";

const LikeInfo = ({ selectedLikeStock, infoData }) => {
  return (
    <>
      {/* 관심 종목 */}
      <ul>
        <h4>조회하고 싶은 주식을 왼쪽 사이드바에서 선택해 주세요.</h4>
        {selectedLikeStock && (
          <div>
            <h4>
              주식 정보: {"  "}
              {selectedLikeStock.stockName}
            </h4>
          </div>
        )}
      </ul>
      <table className="responsive-table" style={{ fontSize: "20px" }}>
        <thead>
          <tr>
            <th scope="col" style={{ maxWidth: "100px", textAlign: "center" }}>
              날짜
            </th>
            <th scope="col">종가</th>
            <th scope="col">대비</th>
            <th scope="col">거래량</th>
          </tr>
        </thead>
        <tbody>
          {!!infoData &&
            !!infoData.categoryData &&
            infoData.categoryData
              .map((date, index) => ({
                date,
                values: infoData.values[index],
              }))
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  {item.values.map((value, innerIndex) => (
                    <td key={innerIndex}>
                      {innerIndex === 4 ? (
                        <span>{value}</span>
                      ) : (
                        value.toLocaleString()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </>
  );
};

export default LikeInfo;
