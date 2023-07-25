import React, { useEffect, useState } from "react";

const RegistFrame = ({ boardType }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const REQUEST_URL = "http://localhost:8181/api/";
  async function getInfo() {
    const res = await fetch(
      REQUEST_URL + "user/myInfo/" + localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
    // console.log("myInfo: ", myInfo);
    setUserInfo({
      name: myInfo.name,
      email: myInfo.email,
    });
  }

  useEffect(() => {
    getInfo();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const title = formData.get("title");
    const content = formData.get("content");
    const writer = userInfo.name;
    const email = userInfo.email;
    const type = formData.get("type");

    const res = await fetch(REQUEST_URL, +"/board", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, content, writer, email, type: boardType }),
    });
    // const submitInfo = await res.json();
    // console.log("submitInfo: ", submitInfo);
    // setSubmit({
    //   email: submitInfo.email,
    //   name: submitInfo.name,
    //   title: submitInfo.title,
    //   content: submitInfo.content,
    // });
    const responseJson = await res.json();
    console.log("responseJson: ", responseJson);
  }

  const [selectedItem, setSelectedItem] = useState("선택");
  function handleDropdownSelect(eventKey) {
    setSelectedItem(eventKey);
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
        >
          등록
        </button>
        <a href="/inquiryBoard">
          <button className="button-58-1" style={{ float: "right" }}>
            취소
          </button>
        </a>
      </div>
    </div>
  );
};

export default RegistFrame;
