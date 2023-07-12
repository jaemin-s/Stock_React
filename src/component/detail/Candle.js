import React, { useEffect, useState } from 'react'
import ECharts from 'echarts-for-react'
const Candle = ({dailyPrice}) => {

    const [dailyResult, setDailyResult] = useState();

   

    useEffect(() => {
      
        (async function(){
            let result = await dailyPrice();
            console.log(result);
            setDailyResult(result);
        })();
    }, []);

    useEffect(()=> {
        !!dailyResult&&console.log('결과 바뀜',dailyResult);
    },[dailyResult]);

    const makeEcharts = () => {
      const upColor = '#e74a3b';
      const upBorderColor = '#e74a3b';
      const downColor = '#4e73df';
      const downBorderColor = '#4e73df';

      let options = {
                // title: {
                //     text: '종목이름',
                //     left: 0
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: dailyResult.categoryData,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                yAxis: {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 35,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: '종목이름',
                        type: 'candlestick',
                        data: dailyResult.values,
                        itemStyle: {
                          color: upColor,
                          color0: downColor,
                          borderColor: upBorderColor,
                          borderColor0: downBorderColor
                        }
                    }
                ]
            };
      return (
        <ECharts option={options} style={{width: '100%', height: '110%', marginTop: '-40px'}}/>
      );
    }

  return (
    <>
       {!!dailyResult&&makeEcharts()}
    </>
  )
}

export default Candle