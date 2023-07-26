import React, { useEffect, useState } from "react";

const BoardContent = ({ boardData, titleClickHandler }) => {
  function dateFormat(date) {
    let temp = new Date(date);
    return temp.toISOString().replace("T", " ").slice(0, 16);
  }

  return (
    <table className="table" style={{ marginTop: "60px" }}>
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: "#3385ff",
              color: "white",
              fontWeight: "600",
            }}
            scope="col"
          >
            번호
          </th>
          <th
            scope="col"
            style={{
              backgroundColor: "#3385ff",
              color: "white",
              fontWeight: "600",
            }}
          >
            작성일
          </th>
          <th
            scope="col"
            style={{
              backgroundColor: "#3385ff",
              color: "white",
              fontWeight: "600",
            }}
          >
            제목
          </th>
          <th
            scope="col"
            style={{
              backgroundColor: "#3385ff",
              color: "white",
              fontWeight: "600",
            }}
          >
            작성자
          </th>
        </tr>
      </thead>
      <tbody>
        {!!boardData &&
          boardData.content.map((item, index) => (
            <tr key={index}>
              <td>{boardData.totalElements - boardData.offset - index}</td>
              <td
                onClick={() => {
                  titleClickHandler(item.id);
                }}
              >
                {item.title}
              </td>
              <td>{item.writer}</td>
              <td>{dateFormat(item.date)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BoardContent;
