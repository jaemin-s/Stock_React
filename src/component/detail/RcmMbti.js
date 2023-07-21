// import { useParams } from "react-router-dom";
// import { KI_ID, RequsetHeader } from "../../config/apikey";

// import React, { useEffect, useState } from 'react'

// const RcmMbti = () => {
// const { value } = useParams();
// const [isMbti, setIsMbti] = useState();

// const { email,mbti } =
//     useContext(AuthContext);

// const userMbti = async () => {
//     const mbtiRes = await fetch("http://localhost:8181/api/user/myInfo/" + email);
//     const mbtiData = await mbtiRes.json();
// }

// const rcmMbtiApi = async (seq) => {
//     const userId = KI_ID; //아이디 숨겨야함.
//     const res = await fetch(
//       "/quotations/psearch-result?user_id=" + userId + "&seq=" + seq,
//       {
//         headers: {
//           ...RequsetHeader,
//           tr_id: "HHKST03900400",
//           custtype: "P",
//         },
//       }
//     );
//     let values = [];
//     if (res.status === 200) {
//       const data = await res.json();
//       data.output2.forEach((x) => {
//         const { code, name} = x;
//         values.push({ code, name});
//       })
//       setMbti(values);
//     }
    
//   };

//   useEffect(() => {
//     rcmMbtiApi();
//   }, [])
//   return(
//     <button>dd</button>
//   );
// }

// export default RcmMbti
