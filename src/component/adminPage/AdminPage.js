import React, { useState } from 'react'
import "./AdminPage.scss"
import Paging from '../board/Paging';
import { Modal, ModalBody } from 'reactstrap';

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
   // 모달 표시 및 닫기를 위한 핸들러 함수
   const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    const controlModal = (
      <Modal>
        <ModalBody>
          <div className='roll-box'>
            <div>
              dd
            </div>
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
          <body id="page-top" style={{ width: "80%", maxWidth: "1920px" }}>
            <div id="wrapper">
              <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
                style={{ position: "sticky" }}
              >
                <div className="sidebar-brand d-flex align-items-center justify-content-center">
                  <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                  </div>
                  <div className="sidebar-brand-text mx-3">관리자 전용</div>
                </div>
                <hr className="sidebar-divider my-0"></hr>
    
                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item">

                      <div className="sidebar-heading ">유저 관리</div>
                      <div className="list-info"></div>
  
                  <hr className="sidebar-divider my-0"></hr>
    
                  
                      <div className="sidebar-heading">추가할거</div>

                      <hr className="sidebar-divider my-0"></hr>
    
                      <div className="sidebar-heading">거래 내역</div>
               
                      <div className="sidebar-heading">추가할거</div>
                      <ul style={{ padding: "0 0 0 10px" }}>
                       
                          <div
                            className="nav-link"
                            style={{
                              color: "white",
                              cursor: "pointer",
                              padding: "4px 2px",
                              fontSize: "15px",
                            }}
                          >
                       
                          </div>
                    
                      </ul>
                      <hr className="sidebar-divider my-0"></hr>
                    
                 
                      <div className="sidebar-heading">추가할거</div>
                      <ul style={{ padding: "0 0 0 10px" }}>
                        
                            <div
                              className="nav-link"
                              style={{
                                color: "white",
                                cursor: "pointer",
                                padding: "4px 2px",
                                fontSize: "15px",
                              }}
                            >
                              {/* ({like.stockCode}) */}
                            </div>
                         
                      </ul>
                      <hr className="sidebar-divider my-0"></hr>
                    
                </li>
              </ul>
    
              <div className="container-fluid">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="my-info"
                            href="#"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >
                            유저관리
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          id="border"
                          style={{ fontSize: 30 }}
                        >
                          <p>|</p>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="asset"
                            href="#"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >
                            유저통계
                          </a>
                        </li>
                        <li
                          className="nav-item"
                          id="border"
                          style={{ fontSize: 30 }}
                        >
                          <p>|</p>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="having-info"
                            href="#"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >
                           전체 거래내역 조회
                          </a>
                        </li>
                        {/* <li
                          className="nav-item"
                          id="border"
                          style={{ fontSize: 30 }}
                        >
                          <p>|</p>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="like-info"
                            href="#"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >
                            추가할거
                          </a>
                        </li> */}
                      </ul>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </nav>
                </div>
                <div style={{display: 'flex', marginLeft:490, marginTop: 50, maxWidth: 140}}>   
                    <select>
                        <option value="all">전체</option>
                        <option value="name">이름</option>      
                        <option value="email">이메일</option>
                      </select>
                        {/* 검색창 */}
                      <div
                      style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: 'center'
                      }}
                      >
                <form className="search-form-container" >
                    <div className="input-group input-group-append" style={{width: 280}}>
                    <input
                        id="searchText"
                        type="text"
                        className="form-control " //border-0 small
                        placeholder="입력해주세요."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        // ref={inputRef}
                    />
                    <button className="btn btn-primary searchBtn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <Search />
                    </button>
                    </div>
                </form>
                </div>
                </div>

                <div className='user-info-box'>
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
                          <button onClick={toggleModal}
                          style={{border:'none', backgroundColor: 'white'}}>
                            ↪
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>                   
                </div>
                <Paging />
              </div>
            </div>
            {isModalOpen && controlModal}
          </body>
        </>
      );
    }

export default AdminPage