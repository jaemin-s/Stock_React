import React, { useEffect, useState } from 'react'
import Echarts from 'echarts-for-react';

const Kospi = () => {
  const [kospi, setKospi] = useState({});
  const [options, setOptions] = useState({
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'line'
    }]
  });
  useEffect(() => {
    getKospi();
  },[]);
  useEffect(()=>{
    kospi&&setOpt();
  },[kospi])

  //코스피 시세 얻기
  const getKospi = async () => {
    let today = new Date();
    let curruntDate = today.toISOString().slice(0,10).replaceAll('-','');
    let startDate = new Date(today.setDate(today.getDate()-30)).toISOString().slice(0,10).replaceAll('-','');
    console.log(startDate);

    //네이버 증권 요청
    const res = await fetch('/siseJson.naver?symbol=KOSPI&requestType=1&startTime=' + startDate + '&endTime=' + curruntDate + '&timeframe=day', {
      method: 'POST'
    });
    const data = await res.text();
    const arr = data.replace("[['날짜', '시가', '고가', '저가', '종가', '거래량', '외국인소진율'],",
      '').trim().split(',\n\t\t\n');
    const tempDate = [];
    const tempPrice = [];
    arr.forEach(a => {
      const temp = a.split(", ");
      tempPrice.unshift(parseFloat(temp[4])); // 종가
      //  '코스피',
      tempDate.push(parseInt(temp[0].slice(2, 10))); //날짜
        //parseFloat(temp[1]) // 시가
        //parseFloat(temp[2]) // 고가
        //parseFloat(temp[3]) // 저가
    });
    setKospi({
      date : tempDate,
      price : tempPrice
    });
  };

  const setOpt = () => {
    setOptions({
      xAxis: {
        type: 'category',
        data: kospi.date
      },
      yAxis: {
        type: 'value',
        max: 2641,
        min: 2510
      },
      series: [{
        data: kospi.price,
        showSymbol: false,
        type: 'line'
      }]
      });
  };
    

  return ( 
    <>
      <Echarts option={options} style={{width: '50%', height: '283px'}}/>
    </>
  )
}

export default Kospi;