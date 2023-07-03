
import React, { useState } from 'react'

const InfoTest = () => {
 
 const getInfo = async() => {
    const res =  await fetch('/getCorpOutline_V2?serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=1&numOfRows=10&resultType=json');

    const [info, setInfo] = useState([]);


    const data = await res.json();
    console.log(data);
    console.log(data.response);

    let infoList = [];

    data.response.body.items.item.forEach(list => {
        const {
            corpNm : corpNm,
            enpBsadr : enpBsadr,
            enpXchgLstgDt : enpXchgLstgDt,
            enpKosdaqLstgDt : enpKosdaqLstgDt,
            enpMainBizNm : enpMainBizNm
             } = list;
             infoList.push({
                corpNm,
                enpBsadr,
                enpXchgLstgDt,
                enpKosdaqLstgDt,
                enpMainBizNm
             });
             console.log(infoList);
    });

    

 }
 
    
 
 
 
 
 
 
    return (
    <div>
    <p>법인명:  {} </p>
    <p> 기업기본주소 : {}  </p>
    <p> 기업거래소상장일자 : {}  </p>
    <p> 기업코스닥상장일자 : {} </p>
    <p> 기억주요사업명 : {} </p>
    <div onClick={getInfo}>
        test
    </div>
</div>

  )
}

export default InfoTest









