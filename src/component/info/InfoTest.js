import React, { useState } from 'react'


const InfoTest = () => {
  // 기업정보 관리
  const [info, setInfo] = useState([]);
  // 재무 관리
  const [resInfo, setResInfo] = useState([]);
  
  const corpInfo = async () => {
    const res = await fetch('/getCorpOutline_V2?serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=15&numOfRows=1&resultType=json&corpNm=삼성전자');
    const secRes = await fetch('getSummFinaStat_V2?numOfRows=1&pageNo=1&resultType=json&serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&crno=1301110001626');
    const data = await res.json();
    const resData = await secRes.json();
    let infoList = [];
    let resList = [];
    console.log(data);
    // 기업 정보 
    data.response.body.items.item.forEach(list => {
      const {
        crno: crno,
        corpNm: corpNm
      } = list;
      infoList.push({
        crno,
        corpNm
      });

      setInfo(infoList);
      console.log("법인번호: " + infoList[0].crno);

      // 기업정보 crno 값
      const cno = infoList[0].crno;

      console.log(resData);
      // 재무정보
      resData.response.body.items.item.forEach(secList => {
        const {
          enpSaleAmt : enpSaleAmt,
          enpBzopPft : enpBzopPft,
          enpTcptAmt : enpTcptAmt,
          fnclDebtRto : fnclDebtRto
        } = secList;
        // 값 소수점 단위 만들기
        const enpS = secList.enpSaleAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const enpB = secList.enpBzopPft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const enpT = secList.enpTcptAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const fncL = secList.fnclDebtRto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        resList.push({
          enpS,
          enpB,
          enpT,
          fncL
        });
        setResInfo(resList);
        
        
        

      })  
    });


  };
  
  return ( 
    <div> 
      { info.map((item, index) => ( 
        <div key = { index } >
          <p> 법인번호: { item.crno } </p> 
          <p> 법인명: { item.corpNm } </p>
        </div>
      ))} 
        { resInfo.map((item, resIndex) => (
      <div key={ resIndex }>
          <p> 기업매출액 : { item.enpS } </p>
          <p> 기업영업이익: { item.enpB } </p>
          <p> 기업총자본금액 : { item.enpT } </p>
          <p> 재무제표부채비율: { item.fncL } </p>
      </div>
        ))}
      <div onClick = { corpInfo } > test </div>
    </div>

  )
}

export default InfoTest;