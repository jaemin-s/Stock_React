import React, { useState } from 'react'
import './MyPage.scss'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
// Doughnut 차트 import(npm install chart.js react-chartjs-2)

// Doughnut 차트 등록
Chart.register(
    ArcElement, Tooltip, Legend
);

// Doughnut 차트에 들어갈 내용
function MyPage(){
    const data = {
        labels: ['삼성전자', 'SK하이닉스', '대한항공', '현금'],
        // 주식 종목 / 현금
        datasets : [{
            label: '금액',
            data: [1000000, 2500000, 1000000, 500000],
            backgroundColor: ['blue', 'red', 'skyblue', 'orange']
            // 순서대로 금액과 색깔 설정
        }]
    }

    const [expanded, setExpanded] = useState(false);

            const toggleExpanded = () => {
                setExpanded(!expanded);
            };

    const options = {

    }

    
    return (
        <>
            <body id="page-top" style={{width: '80%'}}>
            
            <div id="wrapper">
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{position: "fixed"}}>
                    <div class="sidebar-brand d-flex align-items-center justify-content-center">
                        <div class="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-laugh-wink"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">MyPage</div>
                    </div>
                    <hr class="sidebar-divider my-0"></hr>

                    {/* <!-- Nav Item - Dashboard --> */}
                    <li className="nav-item" >
                        <div class="sidebar-heading " >
                        내 정보
                        </div>
                        <div className='list-info'>
                            <a className="nav-link" href="#1" style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>정보</span>
                            </a>
                            <a class="nav-link" href="#0"  style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>수정</span>
                            </a>
                            <a class="nav-link" href="#0"  style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>탈퇴</span>
                            </a>
                        </div>
                        <hr class="sidebar-divider my-0"></hr>
                        <div class="sidebar-heading">
                        자산 관리
                        </div>
                        <div className='list-assets'>
                            <a class="nav-link" href="#2" style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>내 자산 정보</span>
                            </a>
                            <a class="nav-link" href="#0"  style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>자산 변동</span>
                            </a>
                            <a class="nav-link" href="#0"  style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>총 자산</span>
                            </a>
                        </div>
                        <hr class="sidebar-divider my-0"></hr>
                        <div class="sidebar-heading">
                        거래 내역
                        </div>
                        <a class="nav-link" href="#3-1"  style={{padding: "0px 16px"}}>
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>상세 내역</span>
                            </a>
                    </li>
                </ul>

                <div className="container-fluid" style={{padding: "20px 0 0 300px"}}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/info" style={{marginRight: "100px"}}>내 정보</a>
                                    </li>
                                    <li className="nav-item" style={{ flex: 1, textAlign: "center", fontSize: "700", color: "blue" }}>
                                        <p>|</p>
                                    </li>
                                    <li className="nav-item" >
                                        <a className="nav-link" href="/asset" style={{marginLeft: "100px"}}>자산관리</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    {/* <!-- Page Heading --> */}
                    <div style={{display: "flex",justifyContent: "center", alignItems: "center",height: "10vh"}}>
                        <div style={{textAlign: "center", fontSize: "30px"}} id='1'>
                            '홍길동' 님의 현재 등수 : 45 등
                        </div>
                    </div>
                    <br/><br/>

                    {/* 회원정보 */}
                    <div className='userInfo' style={{padding: "70px 200px", display: "flex", justifyContent: "space-between"}}>
                        <div style={{padding: "80px 0", width: "500px"}} >
                            <h5 style={{marginLeft: "1.25rem"}}>이름<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 홍길동</h5>
                            <h5>닉네임<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 주식왕</h5>
                            <h5>이메일<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> abc1234@naver.com</h5>
                            <h5 style={{marginLeft: "1.25rem"}}>성별<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 여</h5>
                            <h5 style={{marginLeft: "1.25rem"}}>나이<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 25세</h5>
                            <h5 style={{marginLeft: "1.25rem"}}>경력<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 1~3년</h5>
                        </div>
                        
                        {/* 프로필사진 */}
                        <div className='profile'>
                            <img src={require('./image/profile.png')} alt="@" className="center-image"></img>
                        </div>
                    </div>
                    
                    <br/><br/><br/><br/>

                    <h4 id="2" className='assetInfo' style={{flex: 1, textAlign: "center", fontSize: "40px"}}>자산 정보</h4><br/>
                    <div className='assets' style={{ width: "600px", display: "flex", justifyContent: "space-between"}}>
                        <div className='assetsDetail'>
                            <h5 style={{marginLeft: "2.8rem",  width: "400px"}}>자산평가<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 10,028,843 원</h5>
                            <h5 style={{width: "700px", marginLeft: "0.9rem"}}>보유 주식 수<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 삼성전자 8주, SK하이닉스 4주, 대한항공 25주 외</h5>
                            <h5 style={{marginLeft: "2.5rem"}}>보유 현금<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 28,520 원</h5>
                            <h5 style={{marginLeft: "4.1rem"}}>수익률<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 18.6 %</h5>
                            <h5>주식 평가금액<span style={{margin: "0px 6rem 0px 3rem", color: "blue", fontWeight: "700"}}>|</span> 943,857 원</h5>
                        </div>
                        <div style={{marginLeft: "50px"}}>
                            <Doughnut data={data} options={options}>
                            </Doughnut>
                        </div>
                    </div>

                    <br/><br/><br/><br/><br/>
                    
                    {/* 거래내역 테이블 */}
                    <h4 id="3-1" style={{ flex: 1, textAlign: 'center', fontSize: '40px'}}>
                    거래 내역
                    </h4>
                    <br />
                    <br />
                    <table className="collapsed" id="table">
                        <thead>
                        <tr className="high">
                            <th scope="col">거래 일자</th>
                            <th scope="col">매수 / 매도</th>
                            <th scope="col">종목</th>
                            <th scope="col">매매 수량</th>
                            <th scope="col">매매 금액</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">23/07/03</th>
                            <td>매수</td>
                            <td>대한항공</td>
                            <td>25</td>
                            <td>1,000,000</td>
                        </tr>
                        <tr>
                            <th scope="row">23/06/10</th>
                            <td>매도</td>
                            <td>SK하이닉스</td>
                            <td>4</td>
                            <td>2,500,000</td>
                        </tr>
                        <tr>
                            <th scope="row">23/05/11</th>
                            <td>매수</td>
                            <td>삼성전자</td>
                            <td>8</td>
                            <td>1,000,000</td>
                        </tr>
                        {expanded && (      //더보기 누르면 추가로 나올 내용
                            <>
                        <tr>
                            <th scope="row">23/04/09</th>
                            <td>매도</td>
                            <td>현대차</td>
                            <td>1</td>
                            <td>12,3900</td>
                        </tr>
                        <tr>
                            <th scope="row">23/03/03</th>
                            <td>매도</td>
                            <td>기아차</td>
                            <td>4</td>
                            <td>500,000</td>
                        </tr>
                        <tr>
                            <th scope="row">23/02/18</th>
                            <td>매도</td>
                            <td>삼성전자</td>
                            <td>6</td>
                            <td>170,300</td>
                        </tr>
                            </>
                        )}
                        </tbody>
                    </table>

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='button' onClick={toggleExpanded}>
                            {expanded ? '접기' : '더보기'}
                        </button>
                        
                    </div>
                        
                </div>        
            </div>
            </body>
        </>
        
        );
    }

export default MyPage;