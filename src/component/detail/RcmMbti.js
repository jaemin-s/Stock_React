import { redirect, useNavigate, useParams } from "react-router-dom";
import { KI_ID, RequsetHeader } from "../../config/apikey";

import React, { useContext, useEffect, useState } from 'react'
import AuthContext from "../util/AuthContext";
import { width } from "@mui/system";

const RcmMbti = ({ value }) => {
    // const { value } = useParams();
    // 유저 mbti 저장
    const [isMbti, setIsMbti] = useState("");
    // 종목이름,코드 저장
    const [ mbtiPro, setMbitPro] = useState([]);
    const [randomItems, setRandomItems] = useState([]);
    const redirect = useNavigate();
    
    let values = [];
    const { email, mbti } =
        useContext(AuthContext);

        function getMbti(mbti) {
            console.log("mbti swithc안에 =", mbti);
            switch (mbti) {
              case "ISTJ":
              case "ISFJ":
              case "ESTJ":
              case "ESFJ":
                return 2;
              case "ISFP":
              case "ESFP":
              case "ISTP":
              case "ESTP":
                return 3;
              case "INFJ":
              case "ENFJ":
              case "INFP":
              case "ENFP":
                return 4;
              case "INTJ":
              case "ENTJ":
              case "INTP":
              case "ENTP":
                return 5;
              case "선택안함":
                return 0;
              default:
                return 0;
            }
          }

          const seq = getMbti(isMbti.mbti);

          const getUserMbti = async () => {
            const mbtiRes = await fetch("http://localhost:8181/api/user/myInfo/" + localStorage.getItem("LOGIN_USEREMAIL"));
            const mbtiData = await mbtiRes.json();
            setIsMbti({
              mbti: mbtiData.mbti
            });
          };
          console.log("seq인데 = ", seq);
          const rcmMbtiApi = async (seq) => {
            const userId = KI_ID;
            const res = await fetch("/quotations/psearch-result?user_id=" + userId + "&seq=" + seq, {
              headers: {
                ...RequsetHeader,
                tr_id: "HHKST03900400",
                custtype: "P",
              },
            });
            console.log("res인데 =" , res);
            
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
          }, [value]);
        
          useEffect(() => {
            if (isMbti && isMbti.mbti) {
              rcmMbtiApi(getMbti(isMbti.mbti));
            }
          }, [isMbti]);
        
          useEffect(() => {
            if (mbtiPro.length > 0) {
              // KODEX와 선물을 포함하지 않는 항목들만 필터링합니다.
              const filteredItems = mbtiPro.filter(item => !item.name.includes("KODEX") &&
               !item.name.includes("선물") && !item.name.includes("KRX") && !item.name.includes("QV")
               && !item.name.includes("2x"));
              const newRandomItems = getRandomItems(filteredItems, 4);
              setRandomItems(newRandomItems);
            }
          }, [mbtiPro]);
        
          const getRandomItems = (arr, count) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
          };
        
          const goDetailHandler = (item) => {
            redirect(`/detail/${item.name}(${item.code})`);
          };
        
          const mypageHandler = (e) => {
            redirect("/mypage");
          }

          if (seq === 0) {
            return (
              <div style={{width: 400}}>
                추천 종목을 보고 싶으시면 MBTI를 추가해주세요!
                <button onClick={mypageHandler} style={{width:200, height:40, marginLeft:80}}>수정하러 내정보 가기</button>
              </div>
            );
          }


          return (
            <>
              {randomItems.length > 0 && randomItems.map((item, index) => (
                <p key={index} id="mbtiBtnBox"> 
                  <button onClick={() => goDetailHandler(item)}>{item.name}({item.code})</button>
                </p>
              ))}
            </>
          );
        };
        
        export default RcmMbti;