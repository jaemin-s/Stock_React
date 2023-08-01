import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RequsetHeader } from "../../config/apikey";
const InfoTest = ({}) => {
  // 기업정보 관리
  const [info, setInfo] = useState([]);
  // 재무 관리
  const [resInfo, setResInfo] = useState([]);
  //api 에러 시 리렌더링 시키기
  const [fetchFail, setFetchFail] = useState(true);
  // api에 없는 정보 시 문구
  const [noData, setNodata] = useState(true);

  const { value } = useParams();
  const title = value.split("(", 2);

  const sicList = [];
  let sicNb;

  const [infoData, setInfoData] = useState({
    categoryData: [],
    values: [],
  });

  useEffect(() => {
    corpInfo();
  }, [fetchFail, value]);

  const corpInfo = async () => {
    setInfo([]);
    setResInfo([]);

    let infoList = [];
    let resList = [];
    let cno;

    const res = await fetch(
      "/getCorpOutline_V2?serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=1&numOfRows=1&resultType=json&enpPbanCmpyNm=" +
        title[0]
    );

    const data = await res.json();
    if (data.response.body.totalCount === 0) {
      setNodata(false);
    }
    // 기업 정보
    data.response.body.items.item.forEach((list) => {
      const { crno: crno, corpNm: corpNm, sicNm: sicNm } = list;
      infoList.push({
        crno,
        corpNm,
        sicNm,
      });

      setInfo(infoList);
      // 기업정보 crno 값(기업법인코드)
      cno = infoList[0].crno;
    });

    const secRes = await fetch(
      "/getSummFinaStat_V2?numOfRows=1&pageNo=1&resultType=json&serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&crno=" +
        cno
    );
    if (res.status === 504 || secRes.status === 504) {
      setFetchFail(!fetchFail);
      return;
    }

    if (res.status !== 200 && secRes.status !== 200) {
      return;
    }

    const resData = await secRes.json();

    // 재무정보
    resData.response.body.items.item.forEach((secList) => {
      const {
        enpSaleAmt: enpSaleAmt,
        enpBzopPft: enpBzopPft,
        enpTcptAmt: enpTcptAmt,
        fnclDebtRto: fnclDebtRto,
      } = secList;
      // 값 소수점 단위 만들기
      const enpS = secList.enpSaleAmt
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const enpB = secList.enpBzopPft
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const enpT = secList.enpTcptAmt
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const fncL = secList.fnclDebtRto
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      resList.push({
        enpS,
        enpB,
        enpT,
        fncL,
      });
      setResInfo(resList);
    });
  };

  if (info.length === 0 && resInfo.length === 0) {
    return (
      <div id="spinner-image">
        <img
          src={require("../layout/guideline/image/spiner.gif")}
          alt="Loading..."
          style={{ height: "130px", marginLeft: "45px" }}
        ></img>
      </div>
    );
  }
  return (
    <div style={{ margin: "20px auto", fontWeight: "600", lineHeight: "1.6" }}>
      {info.map((item, index) => (
        <div key={index}>
          <p> 법인명: {item.corpNm} </p>
          <p> 법인번호: {item.crno} </p>
        </div>
      ))}
      {/* {resInfo.map((item, resIndex) => (
        <div key={resIndex}>
          <p> 기업매출액 : {item.enpS} </p>
          <p> 기업영업이익: {item.enpB} </p>
          <p> 기업총자본금액 : {item.enpT} </p>
          <p> 재무제표부채비율: {item.fncL} </p>
        </div>
      ))} */}
      {/* <div onClick={corpInfo}> test </div> */}
      {!noData && (
        <>
          <h3>없는 정보입니다. </h3>
          <h5>빠른 시일 내에 업데이트 하겠습니다.</h5>
        </>
      )}
    </div>
  );
};

export default InfoTest;
