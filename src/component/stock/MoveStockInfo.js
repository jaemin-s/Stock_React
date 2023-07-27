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
      const result = await getStockRate(0);
      const refinedResult = result.filter(
        (x) =>
          !x.name.includes("KODEX") && //삼성자산운용의 ETF
          !x.name.includes("선물") &&
          !x.name.includes("옥수수") &&
          !x.name.includes("스팩") &&
          !x.name.includes("인버스") &&
          !x.name.includes("TIGER") && //미래에셋자산운용의 ETF
          !x.name.includes("HANARO") &&
          !x.name.includes("KOSEF") &&
          !x.name.includes("SOL") &&
          !x.name.includes("KBSTAR") && //국민
          !x.name.includes("KTOP") &&
          !x.name.includes("TIMEFOLIO") &&
          !x.name.includes("ARIRANG") &&
          !x.name.includes("200") &&
          !x.name.includes("Fn") &&
          !x.name.includes("ACE") &&
          !x.name.includes("KRX") &&
          !x.name.includes("BNK") &&
          !x.name.includes("WOORI") && //우리
          !x.name.includes("KOREA") &&
          !x.name.includes("TREX") &&
          !x.name.includes("KOSEF") &&
          !x.name.includes("옥수수") &&
          !x.name.includes("레버리지")
      );
      setTopResult(refinedResult);
    })();
  }, []);

  useEffect(() => {
    getStockRate(1).then((res) => {
      const refinedResult = res.filter(
        (x) =>
          !x.name.includes("KODEX") && //삼성자산운용의 ETF
          !x.name.includes("선물") &&
          !x.name.includes("옥수수") &&
          !x.name.includes("스팩") &&
          !x.name.includes("인버스") &&
          !x.name.includes("TIGER") && //미래에셋자산운용의 ETF
          !x.name.includes("HANARO") && //하나
          !x.name.includes("KOSEF") &&
          !x.name.includes("SOL") && //신한
          !x.name.includes("KBSTAR") && //국민
          !x.name.includes("KTOP") &&
          !x.name.includes("TIMEFOLIO") &&
          !x.name.includes("ARIRANG") &&
          !x.name.includes("200") &&
          !x.name.includes("Fn") &&
          !x.name.includes("ACE") &&
          !x.name.includes("KRX") &&
          !x.name.includes("BNK") &&
          !x.name.includes("WOORI") && //우리
          !x.name.includes("KOREA") &&
          !x.name.includes("TREX") &&
          !x.name.includes("KOSEF") &&
          !x.name.includes("옥수수") &&
          !x.name.includes("레버리지")
      );
      setLowResult(refinedResult);
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
