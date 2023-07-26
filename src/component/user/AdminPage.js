import React from 'react'

const AdminPage = () => {
    

    





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
                      {/* <div className="list-assets">
                        <a
                          className="nav-link"
                          href="#2"
                          style={{ padding: "0px 16px" }}
                        >
                          <i className="fas fa-fw fa-tachometer-alt"></i>
                          <span>내 자산 정보</span>
                        </a>
                        <a
                          className="nav-link"
                          href="#0"
                          style={{ padding: "0px 16px" }}
                        >
                          <i className="fas fa-fw fa-tachometer-alt"></i>
                          <span>자산 변동</span>
                        </a>
                        
                      </div> */}
                      <hr className="sidebar-divider my-0"></hr>
    
                      <div className="sidebar-heading">거래 내역</div>
                      {/* <a
                        className="nav-link"
                        href="#3-1"
                        style={{ padding: "0px 16px", margin: "0 0 0 20px" }}
                      >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>상세 내역</span>
                      </a> */}
                    
    
                  
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
                            추가할거
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
                            추가할거
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
                            id="like-info"
                            href="#"
                            style={{ fontWeight: 700, fontSize: 25 }}
                          >
                            추가할거
                          </a>
                        </li>
                      </ul>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </body>
        </>
      );
    }

export default AdminPage