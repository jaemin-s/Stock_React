import React, { useContext, useEffect, useState } from 'react';
import { KI_BASE_DOMAIN, KI_DOMESTIC_STOCK_URL, KI_TOKEN_URL } from '../../config/host-config';
import { KI_APP_KEY,KI_SECRET_KEY } from '../../config/apikey';
import * as echarts from 'echarts';
import NewsTest from '../news/NewsTest';
import Detail from '../detail/Detail';
import './StockTemplate.scss';
import '../bootstrap/css/sb-admin-2.min.css';
import './StockTemplate.scss';
import MoveStockInfo from './MoveStockInfo';
import InfoTest from './InfoTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel  from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

function StockTemplate (){

    //네이버 코스피 요청
    const getKospiPrice = async () => {
        const res = await fetch('/finance/chart/%5EKS11?symbol=%5EKS11&period1=1672066800&period2=1688555030&useYfid=true&interval=1d&includePrePost=true&events=div%7Csplit%7Cearn&lang=en-US&region=US&crumb=D%2FJfM5MOHw2&corsDomain=finance.yahoo.com');
        const data = await res.json();
        console.log(data);
    }
    

    //호출용 고정 헤더
    const requestHeader = {
        'content-type':'application/json; charset=utf-8',
        'authorization' : localStorage.getItem('ACCESS_TOKEN'),
        'appkey' : KI_APP_KEY,
        'appsecret' : KI_SECRET_KEY
    };

    //토큰 발급
    const getKIAccessToken = async() =>{
        const res = await fetch(KI_TOKEN_URL,{
            method: 'POST',
            body: JSON.stringify({
                'grant_type':'client_credentials',
                'appkey':KI_APP_KEY,
                'appsecret':KI_SECRET_KEY
            })
        });
        if(res.status === 200){
            const data = await res.json();
            localStorage.setItem('ACCESS_TOKEN','Bearer '+data.access_token);
        }
    }
    
    //처음 렌더링시 실행
    useEffect(()=>{
        getKIAccessToken(); //토큰 발급
        getKospiPrice();//코스피 시세 
    },[]);

    // 8자리 날짜를 yyyy-MM-dd로 변환
    const dateFormat = date => {
        return date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8);
    };

    const format = () => {
    
        return 
    }

    //일자별 시세
    const currentPrice = async e => {
        const params = e.target.dataset.stockId;
        const res = await fetch('/quotations/inquire-daily-price?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD='+params+'&FID_PERIOD_DIV_CODE=D&FID_ORG_ADJ_PRC=1',
        { headers : {
            ...requestHeader,
            'tr_id' : 'FHKST01010400'
        }});

        if(res.status === 200){
            const data = await res.json();
            console.log( data );
            console.log( data.output[0] );
            //필요한 값만 추출
            let values = [];
            let dates = [];
            data.output.forEach( x => {
                const { stck_bsop_date : date,
                        stck_oprc : openPrice,
                        stck_clpr : closePrice,
                        stck_hgpr : highPrice,
                        stck_lwpr : lowPrice,
                         } = x;
                dates.push(dateFormat(date));
                values.push([
                    parseInt(openPrice),
                    parseInt(closePrice),
                    parseInt(highPrice),
                    parseInt(lowPrice)
                ]);
            });
        }
    }


    return (
        <>
            <MoveStockInfo/>
            <div className="margin-wrapper">
                <div className="main-chart card shadow">
                    <div className="card-header">
                        <h6 className="m-0 font-weight-bold text-primary">코스닥</h6>
                    </div>
                    <div className="card-body">코스닥 내용</div>
                </div>
                <div className="middle-content flex">
                    <div className="popular-trade card shadow">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">인기 거래</h6>
                        </div>

                        {/* 반응형 구현 예정 */}
                        <table className="collapsed" id="table">
                        <thead>
                        <tr className="high">
                            <th scope="col">종목번호</th>
                            <th scope="col">종목명</th>
                            <th scope="col">종가</th>
                            <th scope="col">변동률</th>
                            <th scope="col">거래량</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                        {/* value : 변동률
                        <span className={value >= 0 ? "positive" : "negative"}>
                            {value >= 0 && "+"}{value}%
                        </span> 
                        변동률 음수는 파란색, 양수는 빨간색 표시*/}

                            <th scope="row">086520</th>
                            <td><a href="/detail">에코프로</a></td>
                            <td>944,000</td>
                            <td>
                            <span className={+6.55 >= 0 ? "positive" : "negative"}>
                                {+6.55 >= 0 && "+"}{+6.55}%
                            </span>
                            </td>
                            <td>1.48M</td>
                        </tr>
                        <tr>
                            <th scope="row">001570</th>
                            <td><a href="/detail">금양</a></td>
                            <td>70,500</td>
                            <td>
                                <span className={+20.07 >= 0 ? "positive" : "negative"}>
                                    {+20.07 >= 0 && "+"}{+20.07}%
                                </span>
                            </td>
                            <td>8.96M</td>
                        </tr>
                        <tr>
                            <th scope="row">005930</th>
                            <td>삼성전자</td>
                            <td>72,000</td>
                            <td>
                                <span className={-1.73 >= 0 ? "positive" : "negative"}>
                                    {-1.73 >= 0 && "+"}{-1.73}%
                                </span> 
                            </td>
                            <td>9.41M</td>
                        </tr>
                        <tr>
                            <th scope="row">247540</th>
                            <td>에코프로비엠</td>
                            <td>281,500</td>
                            <td>
                                <span className={-2.55 >= 0 ? "positive" : "negative"}>
                                    {-2.55 >= 0 && "+"}{-2.55}%
                                </span>
                            </td>
                            <td>1.58M</td>
                        </tr>
                        <tr>
                            <th scope="row">001570</th>
                            <td>루닛</td>
                            <td>70,500</td>
                            <td>
                                <span className={+20.07 >= 0 ? "positive" : "negative"}>
                                    {+20.07 >= 0 && "+"}{+20.07}%
                                </span>
                            </td>
                            <td>8.96M</td>
                        </tr>
                        <tr>
                            <th scope="row">005930</th>
                            <td>포스코인터내셔널</td>
                            <td>72,000</td>
                            <td>
                                <span className={-3.73 >= 0 ? "positive" : "negative"}>
                                    {-3.73 >= 0 && "+"}{-3.73}%
                                </span>
                            </td>
                            <td>9.41M</td>
                        </tr>
                        </tbody>
                    </table>
                    </div> 
                    <div className="sub-info card shadow">
                        <div className="card-header">
                            <h6 className="m-0 font-weight-bold text-primary">뉴스</h6>
                        </div>
                        {/* <div className="card-body">뉴스 내용</div> */}
                        <Carousel className="Carousel">
                            <Carousel.Item style={{ width: '100%' }}>
                            <img src={require('./image/light-gray.png')} alt="@" className="center-image" />
                            <Carousel.Caption>
                                <h3>뉴스</h3>
                                <p>'코스피 지수 3000 돌파!'는 사라진 꿈이었나.. 잃어버린 우리의 코스피를 찾아서</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item style={{ width: '100%' }}>
                            <img src={require('./image/light-gray.png')} alt="@" className="center-image" />
                            <Carousel.Caption>
                                <h3>사진사진</h3>
                                <p>여의도 증권가는 오늘도 정신없다.</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item style={{ width: '100%' }}>
                            <img src={require('./image/light-gray.png')} alt="@" className="center-image" />
                            <Carousel.Caption>
                                <h3>인기 거래표</h3>
                                <p>(23.07.04 기준) <br />에코프로 (086520), 에코프로비엠(247540), 삼성전자(005930)</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        </div>
                </div>
                <div className='flex bottom-content'>
                    <div className="simulated-rank card shadow">
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">
                                모의 투자 랭킹
                            </h6>
                        </div>
                        <table className="collapsed" id="table">
                        <thead>
                        <tr className="high" >
                            <th scope="col">랭킹</th>
                            <th scope="col">회원명</th>
                            <th scope="col">수익률</th>
                            <th scope="col">총 자산</th>
                        </tr>
                        </thead>
                        {/*  value : 수익률
                        <span className={value >= 0 ? "positive" : "negative"}>
                            {value >= 0 && "+"}{value}%
                        </span> 
                        변동률 음수는 파란색, 양수는 빨간색 표시*/}
                        <tbody>
                        <tr>
                            <th scope="row"><FontAwesomeIcon icon={faCrown} style={{color: "#F9BC28", fontSize: "23px"}}/></th>
                            <td>심재민</td>
                            <td>
                                <span className={+97.5 >= 0 ? "positive" : "negative"}>
                                    {+97.5 >= 0 && "+"}{+97.5}%
                                </span> 
                            </td>
                            <td>10,000,000</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>김나영</td>
                            <td>
                                <span className={+83.2 >= 0 ? "positive" : "negative"}>
                                        {+83.2 >= 0 && "+"}{+83.2}%
                                </span>
                            </td>
                            <td>9,000,000</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>권진현</td>
                            <td>
                                <span className={+44 >= 0 ? "positive" : "negative"}>
                                        {+44 >= 0 && "+"}{+44}%
                                </span>
                            </td>
                            <td>8,000,000</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>최지혁</td>
                            <td>
                                <span className={+31 >= 0 ? "positive" : "negative"}>
                                        {+31 >= 0 && "+"}{+31}%
                                </span>
                            </td>
                            <td>7,000,000</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>오정원</td>
                            <td>
                                <span className={+5 >= 0 ? "positive" : "negative"}>
                                        {+5 >= 0 && "+"}{+5}%
                                </span>
                            </td>
                            <td>5,100,000</td>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>이준호</td>
                            <td>
                                <span className={-2 >= 0 ? "positive" : "negative"}>
                                        {-2 >= 0 && "+"}{-2}%
                                </span>
                            </td>
                            <td>4,800,000</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className='youtube-iframe card shadow'>
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">관련 영상</h6>
                        </div>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7S5ZdmnXQyU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"/>
                    </div>
                    <div className='bookmark card shadow'>
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">즐겨찾기</h6>
                        </div>
                        <div className="card-body">즐겨찾기 내용</div>
                    </div>
                </div>
            </div>
        </>
      )
    }

export default StockTemplate;