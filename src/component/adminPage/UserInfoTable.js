import React, { useEffect, useState } from "react";
import Paging from "../board/Paging";
import Dropdown from "./Dropdown";
import "./UserInfoTable.scss";
import AdminSearchBar from "./AdminSearchBar";
import { API_BASE_URL } from "../../config/host-config";
import RollControl from "./RollControl";
import Swal from "sweetalert2";
const UserInfoTable = () => {
  const [page, setPage] = useState(1);
  const [totalInfo, setTotalInfo] = useState([]);
  const [searchInfo, setSearchInfo] = useState([]);
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);
  async function getUserAll() {
    const res = await fetch(
      API_BASE_URL + "/api/user/userAll" + "?size=" + 8 + "&page=" + (page - 1)
    );

    if (res.status === 200) {
      const infoData = await res.json();
      setTotalInfo(infoData.content);
      console.log(infoData.content);
      setCount(infoData.totalElements);
    } else {
      console.error("fail");
    }
  }
  useEffect(() => {
    getUserAll();
  }, [page]);

  function getUserHandler() {
    getUserAll();
  }

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
  };
  // <Dropdown toggleHandler={toggleHandler} /> 관리 쪽 dropdown

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [blackEmail, setBlackEmail] = useState("");

  const openModal = (email) => {
    setSelectedEmail(email);
    setBlackEmail(email);
    setIsModalOpen(true);
  };

  const userInfoSearch = async (searchText, type) => {
    let searchContent = "";
    totalInfo.forEach((x) => {
      if (type === "name") {
        if (x.name === searchText) {
          searchContent = x.email;
          console.log(searchContent);
        } else return;
      } else if (type === "email") {
        if (x.email === searchText) {
          searchContent = x.email;
          console.log(searchContent);
        } else return;
      }
    });

    const res = await fetch(API_BASE_URL + "/api/user/myInfo/" + searchContent);
    if (res.status === 200) {
      setFlag(true);
      const data = await res.json();
      console.log([data]);
      setSearchInfo([data]);
    } else {
      alert("검색 결과가 없습니다.");
    }
  };

  return (
    <>
      <AdminSearchBar userInfoSearch={userInfoSearch} setFlag={setFlag} />

      <div className="card shadow mb-4" id="admin-user-info">
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
                {!flag && !!totalInfo && totalInfo.length > 0
                  ? totalInfo
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
                            <Dropdown
                              onOpenModal={openModal}
                              email={item.email}
                              userGrade={item.role}
                              getUserHandler={getUserHandler}
                            />
                          </td>
                        </tr>
                      ))
                  : searchInfo.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.nick}</td>
                        <td>{item.email}</td>
                        <td>{formatPhoneNumber(item.phoneNumber)}</td>
                        <td>{item.role}</td>
                        <td>
                          <Dropdown
                            onOpenModal={openModal}
                            email={item.email}
                            userGrade={item.role}
                            getUserHandler={getUserHandler}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <RollControl
              isOpen={isModalOpen}
              toggleHandler={() => setIsModalOpen(false)}
              blackEmail={blackEmail}
            />
          </div>
        </div>
      </div>

      <Paging page={page} count={count} setPage={setPage} />
    </>
  );
};

export default UserInfoTable;
