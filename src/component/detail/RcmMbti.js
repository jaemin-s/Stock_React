import { useParams } from "react-router-dom";
import { KI_ID } from "../../config/apikey";

import React, { useState } from 'react'

const RcmMbti = () => {
const { value } = useParams();
const [mbti, setMbti] = useState();

const rcmMbtiApi = async (seq) => {
    const userId = KI_ID; //아이디 숨겨야함.
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
    let values = [];
    if (res.status === 200) {
      const data = await res.json();
      data.output2.forEach((x) => {
        const { code, name} = x;
        values.push({ code, name});
      })

    }
    
  };
}

export default RcmMbti
