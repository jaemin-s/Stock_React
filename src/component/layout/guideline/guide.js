import React from "react";
// import Header from './component/layout/Header';
// import StockTemplate from './component/stock/StockTemplate';
// import Footer from './component/layout/Footer';
import './guide.scss'
import '../../bootstrap/css/sb-admin-2.min.css';
const Guide = ({}) => {
    
    return (
    <>
    <a href="/">!!!!!HOME!!!!!</a>
    <body id="page-top" style={{width:'80%'}}>
        <div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <div class="sidebar-brand d-flex align-items-center justify-content-center">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Guide</div>
        </div>
            <hr class="sidebar-divider my-0"></hr>

            {/* <!-- Nav Item - Dashboard --> */}
            <li class="nav-item ">
                <div class="sidebar-heading " >
                기초 용어 설명
                </div>
                <a class="nav-link" href="#0" >
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>주식차트</span>
                </a>
                <a class="nav-link" href="#1" >
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>KOSPI / KOSDAQ</span>
                </a>
                <a class="nav-link" href="#2">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>매수 / 매도</span>
                </a>
                <a class="nav-link" href="#3">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>시가총액</span>
                </a>
                <a class="nav-link" href="#4">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>호가</span>
                </a>
                <a class="nav-link" href="#5">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>양봉</span>
                </a>
                <a class="nav-link" href="#6">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>음봉</span>
                </a>
                <a class="nav-link" href="#7">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>예수금</span>
                </a>
                <a class="nav-link" href="#8">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>우선주</span>
                </a>
                <hr class="sidebar-divider my-0"></hr>
                <div class="sidebar-heading">
                튜토리얼
                </div>
                <a class="nav-link" href="#9">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>종목 검색</span>
                </a>
                <a class="nav-link" href="#10">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>매수 / 매도</span>
                </a>
                <a class="nav-link" href="#11">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>즐겨찾기</span>
                </a>
                <a class="nav-link" href="#12">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>관련 종목 추천</span>
                </a>
                <a class="nav-link" href="#13">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>기타</span>
                </a>
                <hr class="sidebar-divider my-0"></hr>
            </li>
        </ul>

        <div class="container-fluid">
        {/* <!-- Page Heading --> */}
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h4 mb-0 text-gray-800" style={{ fontWeight: 700, fontSize: 30 }}>기초 용어 설명</h1>
                        
                    </div>                    
                    <h4 id="0">주식 차트</h4>
                    <p>주식 시장에서 주식 가격의 변동을 시각적으로 나타내는 도구이다. 
                       주식 시장 동향을 파악하고 예측하는 데 도움을 주는 중요한 도구이다.
                       차트의 가로축은 시간을, 세로축은 주식의 가격을 나타내며 선/막대 그래프, 캔들스틱 차트 등의 형태로 표현된다.<br/>
                        <img src={require('./image/기영이.png')} alt="@" style={{width:400, height:300}}></img>
                    </p><br/>
                    <h4 id="1">KOSPI / KOSDAQ</h4>
                    <p>주식변동 기준시점의 주가기준과 비교하여 비교시점의 전체적인 주가의 흐름이다.
                    일반적으로 코스피(KOSPI)는 대기업, 코스닥(KOSDAQ)은 중견 중소기업의 수치를 나타낸다.
                        <br/>
                        <img src={require('./image/kospi_kosdaq.png')} alt="@" style={{width:400, height:300}}></img>
                    </p><br/>

                    <h4 id="2">매수 / 매도</h4>
                    <p>매수는 주식을 구매하는 것이고, 매도는 주식을 판매하는 것이다.(호가 창에서의 빨간 버튼의 매수, 파란 버튼의 매도)<br/>
                        
                    </p><br/>
                    
                    <h4 id="3">시가총액</h4>
                    <p>모든 상장주식을 시가로 평가한 총액이다.<br/>
                    -시가(하루 주식거래 최초 결정된 가격)<br/>
                        <img src={require('./image/시가총액.png')} alt="@"></img>
                    </p><br/>

                    <h4 id="4">호가</h4>
                    <p>매수/매도 시 구매/판매 할 가격을 미리 걸어두는 것이다.(호가 창)<br/>
                        {/* <img src={require('./image/kospi_kosdaq.png')} alt="@"></img> */}
                    </p><br/>
                    
                    <h4 id="5">양봉</h4>
                    <p>종가가 시가보다 높은 것이며 빨간색으로 표현된다.(우상향 그래프 사진)<br/>
                    </p><br/>
                    
                    <h4 id="6">음봉</h4>
                    <p>종가가 시가보다 낮은 것이며 파란색으로 표현된다.(우하향 그래프 사진)<br/>
                        <img src={require('./image/양봉음봉.png')} alt="@" style={{width:400, height:300}}></img>
                    </p><br/>
                    
                    <p>봉의 길이는 가격 변동폭에 비례해서 길어진다. 해당 기간동안의 주가의 상승/하락폭을 나타낸다.<br/>
                        {/* <img src={require('./image/기영이.png')} alt="@" style={{width:400, height:300}}></img> */}
                    </p><br/>
                    
                    <h4 id="7">예수금</h4>
                    <p>계좌에 넣어둔 현금으로 매매 가능 금액을 나타낸다.<br/>
                        {/* <img src={require('./image/kospi_kosdaq.png')} alt="@"></img> */}
                    </p><br/>
                    
                    <h4 id="8">우선주</h4>
                    <p>의결권이 없으며 보통주보다 먼저 배당을 받을 수 있는 권리가 부여된 주식이며, 보통주에 비해 높은 배당금을 받을 수 있다.
                    (예: 삼성전자 / 삼성전자우)<br/>
                        {/* <img src={require('./image/kospi_kosdaq.png')} alt="@"></img> */}
                    </p>

                    <br></br><br></br><br></br><br></br>
                    <div className="tutorial">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 class="h4 mb-0 text-gray-800" style={{ fontWeight: 700, fontSize: 30 }}>튜토리얼</h1>
                        </div>
                            <p id="9">매수나 매도를 원하는 종목 검색한다.(검색창 사진)</p>
                            <p id="10">호가, 뉴스, 종목정보를 기반으로 차트를 참조하여 호가 파트에서 매수 혹은 매도를 진행한다.(매수/매도 사진)</p>
                            <p id="11">투자 창에서 즐겨찾기에 추가할 수 있으며 목록은 왼쪽 사이드바에서 확인할 수 있다.(즐겨찾기 목록 몇개 추가한 사진)</p>
                            <p id="12">매수나 매도가 고민될 때, 관련주나 타 종목을 보고싶을 때 아래의 관련 종목 추천을 참고할 수 있다.(화면 하단 '관련 종목 추천' 사진)</p>
                            
                    </div>
        </div>        
            
        </div>

    </body>

    </>
    )
}

export default Guide