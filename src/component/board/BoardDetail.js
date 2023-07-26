import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const BoardDetail = ({ boardType, id }) => {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [inputTitle, setInputTitle] = useState();
  const [inputContent, setInputContent] = useState();
  const navigate = useNavigate();

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

  async function fetchDelete() {
    const res = await fetch("http://localhost:8181/api/board/" + boardType, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        email: email,
      }),
    });
    const data = await res.text();
    if (res.status === 200) {
      navigate(-1);
    }
    console.log(data);
  }

  function deleteHandler() {
    fetchDelete();
  }

  async function fetchUpdate() {
    const res = await fetch("http://localhost:8181/api/board/" + boardType, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: inputTitle,
        content: inputContent,
        writer: writer,
        email: localStorage.getItem("LOGIN_USEREMAIL"),
      }),
    });
    const data = res.text();
    if (res.status === 200) {
      setTitle(inputTitle);
      setContent(inputContent);
    }
  }

  function updateHandler() {
    if (updateMode) {
      fetchUpdate();
    } else {
      setInputTitle(title);
      setInputContent(content);
    }
    setUpdateMode(!updateMode);
  }

  function titleHandler(e) {
    setInputTitle(e.target.value);
  }
  function contentHandler(e) {
    setInputContent(e.target.value);
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
              {updateMode ? (
                <input
                  className="form-control input-sm"
                  value={writer}
                  readOnly
                />
              ) : (
                <p>{writer}</p>
              )}
            </td>
          </tr>
          <tr>
            <td className="title">제목</td>
            <td>
              {updateMode ? (
                <input
                  className="form-control input-sm"
                  name="title"
                  id="title"
                  onChange={(e) => titleHandler(e)}
                  value={inputTitle}
                />
              ) : (
                <p>{title}</p>
              )}
            </td>
          </tr>
          <tr>
            <td className="content">내용</td>
            {updateMode ? (
              <textarea
                className="form-control"
                rows="10"
                name="content"
                id="content"
                type="text"
                onChange={(e) => contentHandler(e)}
                value={inputContent}
              />
            ) : (
              <td>
                <p>{content}</p>
              </td>
            )}
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
              onClick={updateHandler}
            >
              수정하기
            </button>
            <button
              type="submit"
              className="button-58"
              style={{ float: "right" }}
              onClick={deleteHandler}
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
