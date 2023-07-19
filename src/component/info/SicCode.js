import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const SicCode = () => {
    
    const { value } = useParams();
    const title = value.split("(", 2);
    const [info, setInfo] = useState([]);
    const [idstNm, setIdstNm] = useState([]);
    const [noData, setNodata] = useState(true);

    useEffect(() => {
        const sCodeInfo = async () => {
          try {
            const res = await fetch(
              "/getCorpOutline_V2?serviceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=1&numOfRows=1&resultType=json&enpPbanCmpyNm=" +
                title[0]
            );
    
            const data = await res.json();
            if (data.response.body.totalCount === 0) {
              console.log("정보가 없어요");
              setNodata(false);
            } else {
              const infoList = [];
              const sicList = [];
              let sicNb;
    
              // 기업 정보
              data.response.body.items.item.forEach((list) => {
                const { sicNm } = list;
                infoList.push({
                  sicNm
                });
                sicNb = sicNm;
              });
    
              setInfo(infoList);
    
              const sicRes = await fetch(
                "/getCorpOutline_V2?ServiceKey=1KP%2F74OKGakEjZuUJc6YTkn5UTLRHtfug6BKkunpBqx3owk%2BrrquqsAG7hl7NqMbb5qqQYWVrkVKn7fnYfvXtQ%3D%3D&pageNo=1&numOfRows=20&resultType=json&sicNm=" +
                  sicNb
              );
              const sicData = await sicRes.json();
              sicData.response.body.items.item.forEach((list) => {
                const { enpPbanCmpyNm } = list;
                sicList.push({
                  enpPbanCmpyNm
                });
              });
    
              setIdstNm([...new Set(sicList.map((item) => item.enpPbanCmpyNm))]);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        setIdstNm([]);

        sCodeInfo();
      }, [value]);
    
      if (idstNm.length === 0) {
        return (
          <div id="spinner-image" style={{overflow: "hidden"}}>
            <img
              src={require("../layout/guideline/image/spiner2.gif")}
              alt="Loading..."
              style={{overflow: "hidden", height: 100}}></img>
          </div>
        );
      }
      const limitedIdstNm = idstNm.slice(0, 4);

      return (
        <>
          {limitedIdstNm.map((item, sicIndex) => (
            <div key={sicIndex}>
              <button>{item}</button>
            </div>
          ))}
        </>
      );
    };
    
    export default SicCode;