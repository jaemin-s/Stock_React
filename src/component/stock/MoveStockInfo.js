import React, { useEffect, useRef, useState } from "react";
import Ticker from "react-ticker";
import "./MoveStockInfo.scss";
import { useNavigate } from "react-router-dom";

const MoveStockInfo = ({ getStockRate }) => {
  const [topResult, setTopResult] = useState([]);
  const [lowResult, setLowResult] = useState([]);

  const redirection = useNavigate();

  useEffect(() => {
    (async function () {
      // getStockRate(0).then(res => {
      //   console.log(res);
      //   // res.forEach( x => {
      //   //   setTopResult(x);
      //   // });
      //   setTopResult(res);
      // })
      const result = await getStockRate(0);
      // console.log(result);
      setTopResult(result);
    })();
  }, []);

  useEffect(() => {
    getStockRate(1).then((res) => {
      // console.log(res);
      setLowResult(res);
    });
  }, []);

  useEffect(() => {}, [topResult, lowResult]);

  const viewMoveStock = () => {
    // console.log(topResult);

    const detailHandler = (e) => {
      console.log(e.target.textContent);
      const query = e.target.textContent;
      const code = e.target.dataset.code;
      // console.log(code);
      redirection(`/Detail/${query}(${code})`);
    };

    return (
      topResult.length !== 0 && (
        <>
          <Ticker mode="smooth" offset={5} speed={5}>
            {() => (
              <>
                <div className="move-stock">
                  {topResult.slice(0, 5).map((result, index) => (
                    <p style={{ display: "inline" }} key={index}>
                      <span
                        className="stock-name"
                        onClick={detailHandler}
                        data-code={result.code}
                      >
                        {result.name}
                      </span>{" "}
                      &ensp;
                      <span id="top">
                        {result.price
                          .replace(/^0+/, "")
                          .match(/^\d+/)[0]
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        &ensp;▲{result.chgrate.trim().substring(0, 5)}%
                      </span>
                    </p>
                  ))}
                </div>
              </>
            )}
          </Ticker>
          <Ticker mode="smooth" offset={5} direction="toRight" speed={5}>
            {() => (
              <>
                <div className="move-stock">
                  {lowResult.slice(0, 5).map((result, index) => (
                    <p style={{ display: "inline" }} key={index}>
                      <span
                        className="stock-name"
                        onClick={detailHandler}
                        data-code={result.code}
                      >
                        {result.name}
                      </span>{" "}
                      &ensp;
                      <span id="low">
                        {result.price
                          .replace(/^0+/, "")
                          .match(/^\d+/)[0]
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        &ensp;▼{result.chgrate.trim().substring(1, 5)}%
                      </span>
                    </p>
                  ))}
                </div>
              </>
            )}
          </Ticker>
        </>
      )
    );
  };

  return (
    <>{topResult.length !== 0 && lowResult.length !== 0 && viewMoveStock()}</>
  );
};

export default MoveStockInfo;
