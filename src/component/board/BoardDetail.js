import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../../config/host-config";
const BoardDetail = ({ boardType, id, savedPage }) => {
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const navigate = useNavigate();
  console.log("savedPage in detail", savedPage);
  async function getDetail() {
    const res = await fetch(
      API_BASE_URL + "/api/board/" + boardType + "/" + id
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
  }

  // 삭제 confirm 커스텀
  const deleteConfirm = () => {
    Swal.fire({
      title: "문의사항을 삭제하시겠습니까?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "지우기",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        // 지우기 클릭시
        fetchDelete();
        Swal.fire("삭제되었습니다!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the action when "Cancel" is clicked
        Swal.fire("취소되었습니다", "", "error");
      }
    });
  };

  // 수정 confirm 커스텀
  const updateConfirm = () => {
    Swal.fire({
      title: "변경사항을 수정하시겠습니까?",
      // text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        // 지우기 클릭시
        fetchUpdate();
        Swal.fire("수정되었습니다!", "", "success");
        setUpdateMode(!updateMode);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the action when "Cancel" is clicked
        Swal.fire("취소되었습니다", "", "error");
      }
    });
  };

  function deleteHandler() {
    deleteConfirm();
    // fetchDelete();
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
      if (inputTitle.replace(/\s/g, "") === "") {
        alert("제목은 필수 사항입니다.");
        return;
      } else if (inputContent.replace(/\s/g, "") === "") {
        alert("내용은 필수 사항입니다.");
        return;
      }
      updateConfirm();
      // fetchUpdate();
    } else {
      setInputTitle(title);
      setInputContent(content);
      setUpdateMode(!updateMode);
    }
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

    console.log(content.replaceAll("\n","<br>"));

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
                width: "200px",
              }}
            >
              작성자
            </td>
            <td>
              <p style={{ textAlign: "left", marginLeft: "10px" }}>{writer}</p>
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
              {updateMode ? (
                <input
                  className="form-control input-sm"
                  name="title"
                  id="title"
                  onChange={(e) => titleHandler(e)}
                  value={inputTitle}
                />
              ) : (
                <p style={{ textAlign: "left", marginLeft: "10px" }}>{title}</p>
              )}
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
            {updateMode ? (
              <textarea
                className="form-control"
                rows="10"
                name="content"
                id="content"
                type="text"
                onChange={(e) => contentHandler(e)}
                onPaste={(e) => contentHandler(e)}
                value={inputContent}
                style={{ resize: "none", minHeight: "400px" }}
              />
            ) : (
              <td>
                <p style={{ textAlign: "left", marginLeft: "10px" }}>
                  <pre style={{fontFamily:'system-ui, -apple-system, "Segoe UI"'}}>{content}</pre>
                </p>
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
            {!updateMode && (
              <button
                type="submit"
                className="button-58"
                style={{ float: "right" }}
                onClick={deleteHandler}
              >
                삭제하기
              </button>
            )}
          </>
        )}
        <NavLink
          to={"/" + boardType}
          state={{ boardType: boardType, savedPage: savedPage }}
        >
          <button className="button-58-1" style={{ float: "right" }}>
            뒤로가기
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default BoardDetail;
