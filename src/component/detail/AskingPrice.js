import React, { useEffect, useState } from "react";
import Echarts from "echarts-for-react";
import { KI_APP_KEY, KI_SECRET_KEY } from "../../config/apikey";
import "./AskingPrice.scss";
import Header from "../layout/Header";
import { useParams } from "react-router-dom";

const AskingPrice = ({ selectedValueHandler }) => {
  const { value } = useParams();
  const title = value.split("(", 2);
  // console.log("title[0]" + title[0]); //검색어의 회사명
  // console.log("title[1].slice(0, -1))" + title[1].slice(0, -1)); // 검색어의 종목 코드

  const [selectedRow, setSelectedRow] = useState(null);

  const [searchValue, setSearchValue] = useState(value);

  const requestHeader = {
    authorization: localStorage.getItem("ACCESS_TOKEN"),
    appkey: KI_APP_KEY,
    appsecret: KI_SECRET_KEY,
  };

  const [data, setData] = useState(null);

  const [time, setTime] = useState(new Date());

  const [selectedValue, setSelectedValue] = useState(null);

  const getHoga = async () => {
    const code = title[1].slice(0, -1); //일단 삼전
    try {
      const res = await fetch(
        "/quotations/inquire-asking-price-exp-ccn?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" +
          code +
          "",
        {
          headers: {
            tr_id: "FHKST01010200",
            ...requestHeader,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        setData(data); // 결과를 상태에 저장
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    console.log("selectedValue : " + selectedValue);
    selectedValueHandler(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    // getHoga();
    const timer = setInterval(() => {
      getHoga();
      // console.log('1초지남');
      setTime(new Date());
    }, 500); // 1초마다 렌더링
    return () => {
      clearInterval(timer);
    };
  }, [searchValue]);

  if (data === null) {
    return (
      <div id="spinner-image">
        <img
          src={require("../layout/guideline/image/spiner.gif")}
          alt="Loading..."
        ></img>
      </div>
    );
  }

  const handleClick = (rowIndex) => {
    setSelectedRow(rowIndex);
    if (rowIndex < 5) {
      // askp5부터 askp1까지
      setSelectedValue(data.output1[`askp${5 - rowIndex}`]);
    } else {
      // bidp1부터 bidp5까지
      setSelectedValue(data.output1[`bidp${rowIndex - 4}`]);
    }
    // console.log("setSelectedValue : " + setSelectedValue);
    // console.log("setSelectedRow : " + setSelectedValue);
    // console.log("selectedValue : " + selectedValue);
  };
  return (
    <>
      <div className="table-container" style={{ verticalAlign: "middle" }}>
        <table className="collapsed" id="table">
          <thead style={{ top: 0, padding: "0px" }}>
            <tr className="high">
              <th style={{ padding: 0 }}>매도 잔량</th>
              <th style={{ textAlign: "center", minWidth: "20px" }}>호가</th>
              <th>매수 잔량</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  className="hoga-bar blue"
                  style={{
                    width: `${data.output1.askp_rsqn5 / 1300}px`,
                    maxWidth: "180px",
                    marginLeft: "auto",
                    marginRight: "5px",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {data.output1.askp_rsqn5}
                  </span>
                </div>
              </td>
              <td
                className={`rest hoga ${selectedRow === 0 ? "clicked" : ""}`}
                onClick={() => handleClick(0)}
                style={{
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.output1.askp5}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="rest">
                <div
                  className="hoga-bar blue"
                  style={{
                    width: `${data.output1.askp_rsqn4 / 1300}px`,
                    maxWidth: "180px",
                    marginLeft: "auto",
                    marginRight: "5px",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {data.output1.askp_rsqn4}
                  </span>
                </div>
              </td>
              <td
                className={`rest hoga ${selectedRow === 1 ? "clicked" : ""}`}
                onClick={() => {
                  handleClick(1);
                }}
              >
                {data.output1.askp4}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="rest">
                <div
                  className="hoga-bar blue"
                  style={{
                    width: `${data.output1.askp_rsqn3 / 1300}px`,
                    maxWidth: "180px",
                    marginLeft: "auto",
                    marginRight: "5px",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {data.output1.askp_rsqn3}
                  </span>
                </div>
              </td>
              <td
                className={`rest hoga ${selectedRow === 2 ? "clicked" : ""}`}
                onClick={() => handleClick(2)}
              >
                {data.output1.askp3}
              </td>
              <td></td>
            </tr>

            <tr>
              <td className="rest">
                <div
                  className="hoga-bar blue"
                  style={{
                    width: `${data.output1.askp_rsqn2 / 1300}px`,
                    maxWidth: "180px",
                    marginLeft: "auto",
                    marginRight: "5px",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {data.output1.askp_rsqn2}
                  </span>
                </div>
              </td>
              {/* <td className='hoga' style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.output1.askp2}</td> */}
              <td
                className={`rest hoga ${selectedRow === 3 ? "clicked" : ""}`}
                onClick={() => handleClick(3)}
              >
                {data.output1.askp2}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="rest">
                <div
                  className="hoga-bar blue"
                  style={{
                    width: `${data.output1.askp_rsqn1 / 1300}px`,
                    maxWidth: "180px",
                    marginLeft: "auto",
                    marginRight: "5px",
                    textAlign: "right",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      right: 0,
                    }}
                  >
                    {data.output1.askp_rsqn1}
                  </span>
                </div>
              </td>
              <td
                className={`rest hoga ${selectedRow === 4 ? "clicked" : ""}`}
                onClick={() => handleClick(4)}
              >
                {data.output1.askp1}
              </td>
              <td></td>
            </tr>

            {/* 매도잔량 / 매수잔량 */}

            <tr>
              <td></td>
              <td
                className={`rest hoga ${selectedRow === 5 ? "clicked" : ""}`}
                onClick={() => handleClick(5)}
              >
                {data.output1.bidp1}
              </td>
              <td className="rest">
                <div
                  className="hoga-bar red"
                  style={{
                    width: `${data.output1.bidp_rsqn1 / 1500}px`,
                    maxWidth: "180px",
                    marginRight: "auto",
                    marginLeft: "5px",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {data.output1.bidp_rsqn1}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td
                className={`rest hoga ${selectedRow === 6 ? "clicked" : ""}`}
                onClick={() => handleClick(6)}
              >
                {data.output1.bidp2}
              </td>
              <td className="rest">
                <div
                  className="hoga-bar red"
                  style={{
                    width: `${data.output1.bidp_rsqn2 / 1500}px`,
                    maxWidth: "180px",
                    marginRight: "auto",
                    marginLeft: "5px",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {data.output1.bidp_rsqn2}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td
                className={`rest hoga ${selectedRow === 7 ? "clicked" : ""}`}
                onClick={() => handleClick(7)}
              >
                {data.output1.bidp3}
              </td>
              <td className="rest">
                <div
                  className="hoga-bar red"
                  style={{
                    width: `${data.output1.bidp_rsqn3 / 1500}px`,
                    maxWidth: "180px",
                    marginRight: "auto",
                    marginLeft: "5px",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {data.output1.bidp_rsqn3}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td
                className={`rest hoga ${selectedRow === 8 ? "clicked" : ""}`}
                onClick={() => handleClick(8)}
              >
                {data.output1.bidp4}
              </td>
              <td className="rest">
                <div
                  className="hoga-bar red"
                  style={{
                    width: `${data.output1.bidp_rsqn4 / 1500}px`,
                    maxWidth: "180px",
                    marginRight: "auto",
                    marginLeft: "5px",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {data.output1.bidp_rsqn4}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td
                className={`rest hoga ${selectedRow === 9 ? "clicked" : ""}`}
                onClick={() => handleClick(9)}
              >
                {data.output1.bidp5}
              </td>
              <td className="rest">
                <div
                  className="hoga-bar red"
                  style={{
                    width: `${data.output1.bidp_rsqn5 / 1500}px`,
                    maxWidth: "180px",
                    marginRight: "auto",
                    marginLeft: "5px",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      position: "absolute",
                      left: 0,
                    }}
                  >
                    {data.output1.bidp_rsqn5}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AskingPrice;
