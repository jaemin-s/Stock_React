import React, { useEffect, useRef, useState } from "react";
import ECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useParams } from "react-router-dom";
const Candle = ({ dailyPrice }) => {
  const [dailyResult, setDailyResult] = useState();
  const [time, setTime] = useState(new Date());
  const [zoomValue, setZoomValue] = useState(50);
  // 컴포넌트 내부에서 useRef를 사용하여 ECharts 인스턴스에 접근할 ref 생성
  const echartsRef = useRef(null);

  useEffect(() => {
    const fetchDailyPrice = async () => {
      const result = await dailyPrice();
      setDailyResult(result);
    };

    const timer = setInterval(() => {
      setTime(new Date());
      if (echartsRef.current !== null) {
        //230719 장 마감 전에 줌 해놓은상태로 캔들 움직이는지 확인할 것
        setZoomValue(echartsRef.current.getOption().dataZoom[0].start);
        // console.log(echartsRef.current.getOption().dataZoom[0].start);
      }
      fetchDailyPrice();
    }, 1000); // 1초마다 렌더링

    // 컴포넌트가 언마운트되었을 때 타이머를 정리해야 합니다.
    return () => {
      clearInterval(timer);
    };
  }, [dailyPrice]);

  useEffect(() => {}, [dailyResult]);

  const { value } = useParams();
  const title = value.split("(", 2);

  const makeEcharts = () => {
    const upColor = "#e74a3b";
    const upBorderColor = "#e74a3b";
    const downColor = "#4e73df";
    const downBorderColor = "#4e73df";

    let options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "15%",
      },
      xAxis: {
        type: "category",
        data: dailyResult.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: zoomValue,
          end: 100,
        },
      ],
      series: [
        {
          name: title[0],
          type: "candlestick",
          data: dailyResult.values,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
        },
      ],
    };

    return (
      <ECharts
        ref={(e) => (echartsRef.current = e && e.getEchartsInstance())}
        option={options}
        style={{ width: "100%", height: "110%", marginTop: "-40px" }}
      />
    );
  };

  return <>{!!dailyResult && makeEcharts()}</>;
};

export default Candle;
