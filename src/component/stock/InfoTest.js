
import React, { useEffect, useState } from 'react'


const InfoTest = () => {
 
    const [info, setInfo] = useState([]);

 const corpInfo = async() => {
    const res =  await fetch('/getCorpOutline_V2?serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=1&numOfRows=5&resultType=json');

    const data = await res.json();
    
    let infoList = [];

    data.response.body.items.item.forEach(list => {
        const {
            corpNm : corpNm,
            enpBsadr : enpBsadr,
            enpTlno : enpTlno,
            enpEstbDt : enpEstbDt ,
            fssCorpUnqNo : fssCorpUnqNo
             } = list;
             infoList.push({
                corpNm,
                enpBsadr,
                enpTlno,
                enpEstbDt,
                fssCorpUnqNo
             });
            //  console.log(infoList);
             setInfo(infoList);
             console.log("기업이름: " + list.corpNm);
             console.log("기본주소: " + list.enpBsadr);
             console.log("전화번호: " + list.enpTlno);
             console.log("설립일자: " + list.enpEstbDt);
             console.log("고유번호: " + list.fssCorpUnqNo);
             
            });
            
            
        };
        
        
            
 
 
 
 
 
 
        return (
            <div>
              {info.map((item, index) => (
                <div key={index}>
                  <p>법인명: {item.corpNm}</p>
                  <p>기업기본주소: {item.enpBsadr}</p>
                  <p>기업의 전화번호: {item.enpTlno}</p>
                  <p>기업의 설립일자: {item.enpEstbDt}</p>
                  <p>금융감독원에서 관리하는 법인의 고유번호: {item.fssCorpUnqNo}</p>
                </div>
              ))}
              <div onClick={corpInfo}>test</div>
            </div>

  )
}

export default InfoTest;









