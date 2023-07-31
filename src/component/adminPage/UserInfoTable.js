import React, { useEffect, useState } from "react";
import Paging from "../board/Paging";
import Dropdown from "./Dropdown";
import AdminSearchBar from "./AdminSearchBar";
import { API_BASE_URL } from "../../config/host-config";
const UserInfoTable = () => {
  const [page, setPage] = useState(1);
  const [totalInfo, setTotalInfo] = useState([]);
  const [count, setCount] = useState(1);
  async function getUserAll() {
    const res = await fetch(
      API_BASE_URL + "/api/user/userAll" + "?size=" + 8 + "&page=" + (page - 1)
    );

    if (res.status === 200) {
      const infoData = await res.json();
      setTotalInfo(infoData.content);
      console.log("infoData: ", infoData);
      console.log("infoData.content: ", infoData.content);
      setCount(infoData.totalElements);
    } else {
      console.error("fail");
    }
  }
  useEffect(() => {
    getUserAll();
  }, [page]);

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return phoneNumber;
  };

  // toggleHandler 함수
  const [isToggle, setIsToggle] = useState(false);
  const toggleHandler = () => {
    setIsToggle(!isToggle);
    console.log(isToggle);
  };
  // <Dropdown toggleHandler={toggleHandler} /> 관리 쪽 dropdown 

  return (
    <>
      <AdminSearchBar />

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">사용자 조회</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>이름</th>
                  <th>닉네임</th>
                  <th>이메일</th>
                  <th>전화번호</th>
                  <th>등급</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {totalInfo
                  .filter(
                    (x) => !x.role.includes("ADMIN")
                    // 역할이 ADMIN인 사람 제외시키기
                  )
                  .map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.nick}</td>
                      <td>{item.email}</td>
                      <td>{formatPhoneNumber(item.phoneNumber)}</td>
                      <td>{item.role}</td>
                      <td>
                        <button
                          //   onClick={toggleModal}
                          style={{ border: "none", backgroundColor: "white" }}
                        >
                          ↪
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Paging page={page} count={count} setPage={setPage} />
    </>
  );
};

export default UserInfoTable;
