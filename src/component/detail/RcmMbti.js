import { redirect, useParams } from "react-router-dom";
import { KI_ID, RequsetHeader } from "../../config/apikey";

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../util/AuthContext";

const RcmMbti = () => {
    // const { value } = useParams();
    // 유저 mbti 저장
    const [isMbti, setIsMbti] = useState();
    // 종목이름,코드 저장
    const [ mbtiPro, setMbitPro] = useState([]);
    let values = [];
    const { email, mbti } =
        useContext(AuthContext);

        function getMbti(mbti) {
            switch (mbti) {
              case "ISTJ", "ISFJ", "ESTJ", "ESFJ":
                return 2;
              case "ISFP", "ESFP", "ISTP", "ESTP":
                return 3;
              case "INFJ", "ENFJ", "INFP", "ENFP":
                return 4;
              case "INTJ", "ENTJ", "INTP", "ENTP":
                return 5;
               
                
            }
          }

        const seq = getMbti(mbti);
        console.log("seq 인데 = ", getMbti(mbti));
        const getUserMbti = async () => {
        const mbtiRes = await fetch("http://localhost:8181/api/user/myInfo/" +
          localStorage.getItem("LOGIN_USEREMAIL"));
        const mbtiData = await mbtiRes.json();
        setIsMbti({
          mbti: mbtiData.mbti
        });
        console.log("mbtiRes인데 말이야 = ", mbtiRes);
      };
      console.log("isMbti란 말이지 = ", isMbti);
      
        const rcmMbtiApi = async (seq) => {
        const userId = KI_ID;
        const res = await fetch(
          "/quotations/psearch-result?user_id=" + userId + "&seq=" + seq,
          {
            headers: {
              ...RequsetHeader,
              tr_id: "HHKST03900400",
              custtype: "P",
            },
          }
        );
        console.log("res인데 말이야 = ", res);
        if (res.status === 200) {
          const data = await res.json();
          data.output2.forEach((x) => {
            const { code, name } = x;
            values.push({ code, name });
          });
          setMbitPro(values);
        }
      };
      
      useEffect(() => {
          getUserMbti();
        }, []);
        
        useEffect(() => {
            if (isMbti && isMbti.mbti) {
                rcmMbtiApi(getMbti(isMbti.mbti));
            }
        }, [isMbti]);
        // console.log("name란 말이야 = ", mbtiPro.map((item) => item[0].name));
        //   console.log("code란 말이야 = ", mbtiPro.map((item) => item[0].code));
    
    //   const goDetailHandler = () => {
    //     if (mbtiPro.length > 0) {
    //     //   redirect(`/detail/${mbtiPro[0].name}(${mbtiPro[0].code})`);
    //     return null;
    //     }
    //   };
  
  return(
    <>
    {mbtiPro.length > 0 && mbtiPro.map((item, index) => (
        <p key={index} id="mbtiBtnBox"> 
        {/* <button onClick={goDetailHandler()}>{item.name}({item.code})</button> */}
        <button>{item.name}({item.code})</button>
        </p>
    ))}
    </>
  );
}

export default RcmMbti;
