import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const RegistFrame = ({ boardType }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const navigate = useNavigate();

  const REQUEST_URL = "http://localhost:8181/api/";
  async function getInfo() {
    const res = await fetch(
      REQUEST_URL + "user/myInfo/" + localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
    setUserInfo({
      name: myInfo.name,
      email: myInfo.email,
    });
  }

  useEffect(() => {
    getInfo();
  }, []);

  function titleHandler(e) {
    setInputTitle(e.target.value);
  }
  function contentHandler(e) {
    setInputContent(e.target.value);
  }

  async function submitHandler() {
    if (inputTitle.replace(/\s/g, "") === "") {
      alert("제목은 필수 사항입니다.");
      return;
    } else if (inputContent.replace(/\s/g, "") === "") {
      alert("내용은 필수 사항입니다.");
      return;
    }

    const res = await fetch(REQUEST_URL + "board", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: inputTitle,
        content: inputContent,
        writer: userInfo.name,
        email: userInfo.email,
        type: boardType,
      }),
    });

    const responseJson = await res.text();
    console.log("responseJson: ", responseJson);
    navigate("/" + boardType);
  }

  return (
    <div>
      <table className="table" id="inquiryBoard">
        <tbody>
          <tr>
            <td className="writer">작성자</td>
            <td>
              <input
                className="form-control input-sm"
                value={userInfo.name}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="title">제목</td>
            <td>
              <input
                className="form-control input-sm"
                name="title"
                id="title"
                onChange={(e) => titleHandler(e)}
              />
            </td>
          </tr>
          <tr>
            <td className="content">내용</td>
            <td>
              <textarea
                className="form-control"
                rows="10"
                name="content"
                id="content"
                type="text"
                onChange={(e) => contentHandler(e)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          type="submit"
          className="button-58"
          id="regist-btn"
          style={{ float: "right" }}
          onClick={submitHandler}
        >
          등록
        </button>
        <NavLink to={-1}>
          <button className="button-58-1" style={{ float: "right" }}>
            취소
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default RegistFrame;
