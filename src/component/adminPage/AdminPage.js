import React, { useState } from "react";
import "./AdminPage.scss";
import Paging from "../board/Paging";
import { Modal, ModalBody } from "reactstrap";
import AdminSidebar from "./AdminSidebar";
import AdminTopMenu from "./AdminTopMenu";
import AdminSearchBar from "./AdminSearchBar";
import UserInfoTable from "./UserInfoTable";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 표시 및 닫기를 위한 핸들러 함수
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const controlModal = (
    <Modal>
      <ModalBody>
        <div className="roll-box">
          <div>dd</div>
        </div>
      </ModalBody>
    </Modal>
  );

  const Search = ({ size = 25, color = "#fcf9f9" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

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
        {isModalOpen && controlModal}
      </div>
    </>
  );
};

export default AdminPage;
