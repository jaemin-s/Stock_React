import React from "react";
// import Header from './component/layout/Header';
// import StockTemplate from './component/stock/StockTemplate';
// import Footer from './component/layout/Footer';
import './guide.scss'
const guide = ({}) => {
    return (
    <>
    <div className="side-bar">
        <ul>
            <li><a href="#">설명</a></li>
            <li><a href="#">튜토리얼</a></li>
        </ul>
    </div>
    <div className="information">
        <div>
            <h2>기본용어 설명</h2>
            <br/><br/>
	        <h3>KOSPI / KOSDAQ</h3>
		    <p>주식변동 기준시점의 주가기준과 비교하여 비교시점의 전체적인 주가의 흐름이다.
		    일반적으로 코스피(KOSPI)는 대기업, 코스닥(KOSDAQ)은 중견 중소기업의 수치를 나타낸다.</p><br/><br/><br/>
	        
            <h3>매수/매도</h3>
		    <p>매수는 주식을 구매하는 것이고, 매도는 주식을 판매하는 것이다.(호가 창에서의 빨간 버튼의 매수, 파란 버튼의 매도)</p><br/><br/><br/>
	        
            <h3>시가총액</h3>
		    <p>모든 상장주식을 시가로 평가한 총액이다.<br/>
		    -시가(하루 주식거래 최초 결정된 가격)</p><br/><br/>

            <h3>호가</h3>
            <p>매수/매도 시 구매/판매 할 가격을 미리 걸어두는 것이다.(호가 창)</p><br/><br/>
            
            <h3>양봉</h3>
            <p>종가가 시가보다 높은 것이며 빨간색으로 표현된다.(우상향 그래프 사진)</p><br/><br/>
            
            <h3>음봉</h3>
            <p>종가가 시가보다 낮은 것이며 파란색으로 표현된다.(우하향 그래프 사진)</p><br/><br/>
            
            <h3>예수금</h3>
            <p>계좌에 넣어둔 현금으로 매매 가능 금액을 나타낸다.</p><br/><br/>
            
            <h3>우선주</h3>
            <p>의결권이 없으며 보통주보다 먼저 배당을 받을 수 있는 권리가 부여된 주식이며, 보통주에 비해 높은 배당금을 받을 수 있다.
            (예: 삼성전자 / 삼성전자우)</p>
        </div>
    </div>
    
    <div className="tutorial">
        
    </div>
    </>
    )
}

export default guide