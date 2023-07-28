import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import InfoControl from "./InfoCotrol";
import AdminSidebar from "./AdminSidebar";
import AdminTopMenu from "./AdminTopMenu";
import AdminSearchBar from "./AdminSearchBar";
import UserInfoTable from "./UserInfoTable";
import UserStats from "./UserStats";
import TotalTradeHistory from "./TotalTradeHistory";


const AdminPage = () => {
  const [categoryData, setCategoryData] = useState([
    { name: "유저 관리", isActivate: true },
    { name: "유저 통계", isActivate: false },
    { name: "전체 거래내역 조회", isActivate: false },
  ]);

  //활성화 중인 메뉴 변경
  const categoryActivateHandler = (e) => {
    const newArray = [];
    categoryData.forEach((item) => {
      newArray.push({
        name: item.name,
        isActivate: e.target.textContent === item.name ? true : false,
      });
    });
    setCategoryData(newArray);
  };

  //활성화 중인 메뉴 출력
  const showActivateCategory = () => {
    if (categoryData[0].isActivate) {
      return <UserInfoTable />;
    } else if (categoryData[1].isActivate) {
      return <UserStats />;
    } else if (categoryData[2].isActivate) {
      return <TotalTradeHistory />;
    }
  };
  return (
    <>
      <div id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <AdminSidebar
            categoryData={categoryData}
            categoryActivateHandler={categoryActivateHandler}
          />

          <div className="container-fluid">
            <AdminTopMenu
              categoryData={categoryData}
              categoryActivateHandler={categoryActivateHandler}
            />

            {showActivateCategory()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
