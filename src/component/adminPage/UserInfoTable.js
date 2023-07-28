import React, { useState } from "react";
import Paging from "../board/Paging";
import AdminSearchBar from "./AdminSearchBar";

const UserInfoTable = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <AdminSearchBar />
      <div className="user-info-box">
        <table className="table">
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
                이름
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#3385ff",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                닉네임
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#3385ff",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                이메일
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#3385ff",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                전화번호
              </th>
              <th
                scope="col"
                style={{
                  backgroundColor: "#3385ff",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>춘식이</td>
              <td>hong@gmail.com</td>
              <td>01024093845</td>
              <td>
                <button
                  //   onClick={toggleModal}
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  ↪
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paging page={page} count={1} setPage={setPage} />
    </>
  );
};

export default UserInfoTable;
