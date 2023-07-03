import React, { useContext, useEffect, useState } from 'react'
import { KI_BASE_DOMAIN, KI_DOMESTIC_STOCK_URL, KI_TOKEN_URL } from '../../config/host-config';
import { KI_APP_KEY,KI_SECRET_KEY } from '../../config/apikey';
import ECharts, { EChartsReactProps } from 'echarts-for-react';
import NewsTest from '../news/NewsTest';
import InfoTest from './InfoTest';



const StockTemplate = () => {

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
    <div>
        <div data-stock-id='000660' onClick={currentPrice}>
            click
        </div>

        <ECharts option={options}/>

        <ECharts option={options} opts={{ renderer: 'svg'}}/>
        <NewsTest />

        
        <InfoTest />
    </div>
  )
}

export default StockTemplate;