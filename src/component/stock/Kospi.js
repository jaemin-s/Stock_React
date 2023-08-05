import React, { useEffect, useState } from "react";
import Echarts from "echarts-for-react";

const Kospi = () => {
  const [kospi, setKospi] = useState({
    date: [],
    price: [],
  });
  const [options, setOptions] = useState({
    title: {
      text: "종목이름",
      left: 0,
    },
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
      min: "2500",
      max: "2650",
    },
    series: [
      {
        data: [],
        type: "line",
      },
    ],
  });
  useEffect(() => {
    getKospi();
  }, []);
  useEffect(() => {
    setOpt();
  }, [kospi]);

  //코스피 시세 얻기
  const getKospi = async () => {
    let today = new Date();
    let curruntDate = today.toISOString().slice(0, 10).replaceAll("-", "");
    let startDate = new Date(today.setDate(today.getDate() - 30))
      .toISOString()
      .slice(0, 10)
      .replaceAll("-", "");

    //네이버 증권 요청
    // const res = await fetch(
    //   "/siseJson.naver?symbol=KOSPI&requestType=1&startTime=" +
    //     startDate +
    //     "&endTime=" +
    //     curruntDate +
    //     "&timeframe=day",
    //   {
    //     method: "POST",
    //   }
    // );
    const res = await fetch(
      "https://kq53e0bc8b.execute-api.ap-northeast-2.amazonaws.com/b2w-api1/naverstock/KOSPI/" +
        startDate +
        "/" +
        curruntDate +
        "",
      {
        method: "POST",
      }
    );
    const data = await res.text();
    const arr = data
      .replace(
        "[['날짜', '시가', '고가', '저가', '종가', '거래량', '외국인소진율'],",
        ""
      )
      .trim()
      .split(",\n\t\t\n");
    const tempDate = [];
    const tempPrice = [];
    let max = 0;
    let min = 0;
    arr.forEach((a) => {
      const temp = a.split(", ");
      tempPrice.push(parseFloat(temp[4])); // 종가
      tempDate.push(parseInt(temp[0].slice(2, 10))); //날짜
      if (max < parseFloat(temp[4])) {
        max = parseFloat(temp[4]);
      }
      if (min === 0 || min > parseFloat(temp[4])) {
        min = parseFloat(temp[4]);
      }
      //  '코스피',
      //parseFloat(temp[1]) // 시가
      //parseFloat(temp[2]) // 고가
      //parseFloat(temp[3]) // 저가
    });
    setKospi({
      date: tempDate,
      price: tempPrice,
      max: Math.ceil(max / 10) * 10,
      min: Math.floor(min / 10) * 10,
    });
  };

  const setOpt = () => {
    setOptions({
      title: {
        text: "KOSPI",
        left: 0,
      },
      xAxis: {
        type: "category",
        data: kospi.date,
      },
      yAxis: {
        type: "value",
        max: kospi.max,
        min: kospi.min,
      },
      series: [
        {
          data: kospi.price,
          showSymbol: false,
          type: "line",
        },
      ],
    });
  };

  return (
    <>
      <Echarts option={options} style={{ width: "100%", height: "299px" }} />
    </>
  );
};

export default Kospi;
