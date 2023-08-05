import React, { useEffect, useState } from "react";
import "./BoardContent.scss";

const BoardContent = ({ boardData, titleClickHandler }) => {
  function dateFormat(date) {
    let temp = new Date(date);
    temp.setHours(temp.getHours() + 9);
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
        </tr>
      </thead>
      <tbody>
        {!!boardData &&
          boardData.content.map((item, index) => (
            <tr key={index} className="content-tr">
              <td className="content-no">
                {boardData.totalElements - boardData.offset - index}
              </td>
              <td
                className="content-title clickable-title"
                onClick={() => {
                  titleClickHandler(item.id);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </td>
              <td className="content-writer">{item.writer}</td>
              <td className="content-date">{dateFormat(item.date)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BoardContent;
