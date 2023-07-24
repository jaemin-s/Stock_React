import { redirect, useNavigate, useParams } from "react-router-dom";
import { KI_ID, RequsetHeader } from "../../config/apikey";

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../util/AuthContext";

const RcmMbti = () => {
    // const { value } = useParams();
    // 유저 mbti 저장
    const [isMbti, setIsMbti] = useState();
    // 종목이름,코드 저장
    const [ mbtiPro, setMbitPro] = useState([]);
    const redirect = useNavigate();
    
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

        const getUserMbti = async () => {
        const mbtiRes = await fetch("http://localhost:8181/api/user/myInfo/" +
          localStorage.getItem("LOGIN_USEREMAIL"));
        const mbtiData = await mbtiRes.json();
        setIsMbti({
          mbti: mbtiData.mbti
        });

      };

      
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
        
        

   // 랜덤하게 4개의 항목 선택하는 함수
   const getRandomItems = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const goDetailHandler = (item) => {
    redirect(`/detail/${item.name}(${item.code})`);
  };

  // 랜덤하게 4개의 항목 선택
  const randomItems = getRandomItems(mbtiPro, 4);
  
  return(
    <>
    {randomItems.length > 0 && randomItems.map((item, index) => (
      <p key={index} id="mbtiBtnBox"> 
        <button onClick={() => goDetailHandler(item)}>{item.name}({item.code})</button>
      </p>
    ))}
  </>
  );
}

export default RcmMbti;
