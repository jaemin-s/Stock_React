import React, { useContext, useEffect, useState } from 'react'
import { KI_BASE_DOMAIN, KI_DOMESTIC_STOCK_URL, KI_TOKEN_URL } from '../../config/host-config';
import { KI_APP_KEY,KI_SECRET_KEY } from '../../config/apikey';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import NewsTest from '../news/NewsTest';
import Detail from '../detail/Detail';
import './StockTemplate.scss';
import '../bootstrap/css/sb-admin-2.min.css';
import './StockTemplate.scss';
import MoveStockInfo from './MoveStockInfo';
import InfoTest from './InfoTest';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel  from 'react-bootstrap/Carousel';


function StockTemplate (){

    //그래프
    const [options, setOptions] = useState({
        xAxis: {
            type: 'category', // 고정
            data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
        },
        yAxis: {},
        series: [{
            type: 'candlestick', //고정
            data: [
                [20, 34, 10, 38],
                [40, 35, 30, 50],
                [31, 38, 33, 44],
                [38, 15, 5, 42]]
        }]
    });

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
            console.log(data.access_token);
        }
    }
    
    //처음 렌더링시 실행
    useEffect(()=>{
        getKIAccessToken(); //토큰 발급
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
            console.log(dates);
            console.log(values);
            setOptions({
                xAxis: {
                    type: 'category', // 고정
                    data: dates
                },
                yAxis: {},
                series: [{
                    type: 'candlestick', //고정
                    data: values
                }]
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
                        <div className="card-body">인기거래 내용</div>
                    </div>
                    <div className="sub-info card shadow" >
                        <div className="card-header ">
                        <h6 className="m-0 font-weight-bold text-primary">뉴스</h6>
                        </div>
                            {/* <div className="card-body">뉴스 내용</div> */}
                            <Carousel>
                                <Carousel.Item style={{width: "100%"}}>
                                <img src={require('./image/light-gray.png')} alt="@" className="center-image" ></img>
                                    <Carousel.Caption>
                                    <h3>뉴스</h3>
                                    <p>'코스피 지수 3000 돌파!'는 사라진 꿈이었나.. 잃어버린 우리의 코스피를 찾아서</p>
                                    </Carousel.Caption>
                                </Carousel.Item >
                                <Carousel.Item style={{width: "100%"}}>
                                    <img src={require('./image/light-gray.png')} alt="@" className="center-image"></img>

                                    <Carousel.Caption>
                                    <h3>사진사진</h3>
                                    <p>여의도 증권가는 오늘도 정신없다.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item style={{width: "100%"}}>
                                <img src={require('./image/light-gray.png')} alt="@" className="center-image"></img>
                                    <Carousel.Caption>
                                    <h3>인기 거래표</h3>
                                    <p>
                                        (23.07.04 기준) <br/>
                                        에코프로 (086520), 에코프로비엠(247540), 삼성전자(005930)
                                    </p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                </Carousel>
                    </div>
                </div>
                <div className='flex bottom-content'>
                    <div className="simulated-rank card shadow">
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">모의 투자 랭킹</h6>
                        </div>
                        <div className="card-body">모의 투자 내용</div>
                    </div>
                    <div className='youtube-iframe card shadow'>
                        <div className='card-header'>
                            <h6 className="m-0 font-weight-bold text-primary">관련 영상</h6>
                        </div>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7S5ZdmnXQyU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen/>
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