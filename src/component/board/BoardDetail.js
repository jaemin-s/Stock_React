import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./BoardDetail.scss";
const BoardDetail = ({ boardType, id }) => {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [updateMode, serUpdateMode] = useState(false);

  async function getDetail() {
    const res = await fetch(
      "http://localhost:8181/api/board/" + boardType + "/" + id
    );
    if (res.status === 200) {
      const data = await res.json();
      setWriter(data.writer);
      setTitle(data.title);
      setContent(data.content);
      setEmail(data.email);
    } else {
      const data = await res.text();
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <table
        className="table"
        id="inquiryBoard"
        style={{ textAlign: "center", margin: "0 auto", lineHeight: "1.3" }}
      >
        <tbody>
          <tr>
            <td
              className="writer"
              style={{
                backgroundColor: "#3385ff",
                color: "white",
                fontWeight: "600",
              }}
            >
              작성자
            </td>
            <td>
              <p>{writer}</p>
            </td>
          </tr>
          <tr>
            <td
              className="title"
              style={{
                backgroundColor: "#3385ff",
                color: "white",
                fontWeight: "600",
              }}
            >
              제목
            </td>
            <td>
              <p>{title}</p>
            </td>
          </tr>
          <tr>
            <td
              className="content"
              style={{
                backgroundColor: "#3385ff",
                color: "white",
                fontWeight: "600",
                height: "400px",
                lineHeight: "20",
              }}
            >
              내용
            </td>
            <td>
              <p>{content}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        {email === localStorage.getItem("LOGIN_USEREMAIL") && (
          <>
            <button
              type="submit"
              className="button-58"
              style={{ float: "right" }}
            >
              수정하기
            </button>
            <button
              type="submit"
              className="button-58"
              style={{ float: "right" }}
            >
              삭제하기
            </button>
          </>
        )}
        <NavLink to={-1}>
          <button className="button-58-1" style={{ float: "right" }}>
            뒤로가기
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default BoardDetail;
