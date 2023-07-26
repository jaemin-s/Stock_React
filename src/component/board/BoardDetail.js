import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

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
      <table className="table" id="inquiryBoard">
        <tbody>
          <tr>
            <td className="writer">작성자</td>
            <td>
              <p>{writer}</p>
            </td>
          </tr>
          <tr>
            <td className="title">제목</td>
            <td>
              <p>{title}</p>
            </td>
          </tr>
          <tr>
            <td className="content">내용</td>
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
