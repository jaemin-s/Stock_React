import React, { useState } from "react";
import "./AdminPage.scss";
import Paging from "../board/Paging";
import { Modal, ModalBody } from "reactstrap";
import AdminSidebar from "./AdminSidebar";
import AdminTopMenu from "./AdminTopMenu";
import AdminSearchBar from "./AdminSearchBar";
import UserInfoTable from "./UserInfoTable";

const AdminPage = () => {


  return (
    <>
      <div id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
        <div id="wrapper">
          <AdminSidebar />

          <div className="container-fluid">
            <AdminTopMenu />
            <AdminSearchBar />
            <UserInfoTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
