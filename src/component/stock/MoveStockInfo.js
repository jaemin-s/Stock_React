import React, { useEffect, useRef, useState } from 'react'
import Ticker from 'react-ticker'
import './MoveStockInfo.scss';

const MoveStockInfo = ( {getStockRate} ) => {

  const [topResult, setTopResult] = useState([]);
  const [lowResult, setLowResult] = useState([]);

  useEffect(() => {
    (async function(){
      // getStockRate(0).then(res => {
      //   console.log(res);
      //   // res.forEach( x => {
      //   //   setTopResult(x); 
      //   // });
      //   setTopResult(res);
    // })
    const result = await getStockRate(0);
    console.log(result);
    setTopResult(result);})();
    
  },[])

  useEffect(() => {
    getStockRate(1).then(res => {
      console.log(res);
      setLowResult(res);
    })
  },[])

  useEffect(() => {
    
  }, [topResult, lowResult]);

  const viewMoveStock = () => {
    console.log(topResult);

    return (
      topResult.length !== 0 && (<>
        <Ticker mode='smooth' offset={5} speed={7}>
          {() => (
            <>
            <div className='move-stock'>
              {topResult.slice(0, 5).map((result, index) => (
                <p style={{ display: 'inline' }} key={index}>
                  {result.name} &ensp;
                  <span className={parseFloat(result.chgrate) >= 0 ? "positive" : "negative"}>
                    {parseFloat(result.chgrate) >= 0 && "▲"}
                    {result.chgrate.trim().substring(0, 5)}%
                  </span> &ensp;
                  {result.price.replace(/^0+/, '').match(/^\d+/)[0]}
                </p>
              ))}
            </div>
            </>
          )}
      </Ticker>
      <Ticker mode='smooth' offset={5} direction='toRight' speed={7}>
          {() => (
            <>
            <div className='move-stock'>
              {lowResult.slice(0, 5).map((result, index) => (
                <p style={{ display: 'inline' }} key={index}>
                  {result.name} &ensp;
                  <span className={parseFloat(result.chgrate) >= 0 ? "positive" : "negative"}>
                    {parseFloat(result.chgrate) >= 0 ? "" : "▼"}
                    {result.chgrate.trim().substring(1, 5)}%
                  </span> &ensp;
                  {result.price.replace(/^0+/, '').match(/^\d+/)[0]}
                </p>
              ))}
            </div>
            </>
          )}
      </Ticker>
      </>
      )
    )
  }
  
  return (
   <>
    {topResult.length !==0 && lowResult.length !== 0 && viewMoveStock()}
   </>
  )
}

export default MoveStockInfo