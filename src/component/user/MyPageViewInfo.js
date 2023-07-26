import React, { useEffect, useState } from "react";

const MyPageViewInfo = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    nick: "",
    age: "",
    career: "",
    gender: "",
    mbti: "",
    myStocks: [],
    money: 0,
    return: "",
  });
  const [rank, setRank] = useState("0");

  function getAge(age) {
    switch (age) {
      case "1":
        return "입문";
      case "2":
        return "1~3년";
      case "3":
        return "4~10년";
      case "4":
        return "10년 이상";
      default:
        return age;
    }
  }

  async function getInfo() {
    const res = await fetch(
      "http://localhost:8181/api/user/myInfo/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    const myInfo = await res.json();
    // console.log("myInfo: ", myInfo);
    setUserInfo({
      email: myInfo.email,
      name: myInfo.name,
      nick: myInfo.nick,
      age: myInfo.age,
      career: myInfo.career,
      gender: myInfo.gender,
      money: myInfo.money,
      myStocks: myInfo.myStocks,
      mbti: myInfo.mbti,
    });
  }
  useEffect(() => {
    getInfo();
    getMyRank();
  }, []);

  function getGender(gender) {
    switch (gender) {
      case "man":
        return "남성";
      case "woman":
        return "여성";
    }
  }

  const getMyRank = async () => {
    const res = await fetch(
      "http://localhost:8181/api/trade/rank/" +
        localStorage.getItem("LOGIN_USEREMAIL")
    );
    if (res.status === 200) {
      const result = await res.json();
      if (result === null) {
        setRank(0);
      } else {
        setRank(result.rank);
      }
    }
  };

  return (
    <>
      {/* <!-- Page Heading --> */}
      <div className="basic-info">
        <br />
        <br />
        <br />
        <br />
        {rank === 0 ? (
          <div>
            <div id="1" style={{ marginBottom: "10px" }}>
              나의 주식실력을 알고 싶다면 모의투자를 경험해보세요!
            </div>
            {/* <div className="flex">
              <button
                className="btn btn-sm btn-user btn-primary"
                style={{ margin: "0 auto" }}
              >
                모의투자 하러가기
              </button>
            </div> */}
          </div>
        ) : (
          <div id="1">
            '{userInfo.name}' 님의 현재 등수 : {rank} 등
          </div>
        )}
      </div>
      <br />
      <br />
      {/* 회원정보 */}
      <div className="userInfo">
        <div className="info">
          <h5 className="name">
            이름
            <span className="border" style={{ textAlign: "center" }}>
              |
            </span>{" "}
            {userInfo.name}
          </h5>
          <h5 className="nick">
            닉네임<span className="border">|</span> {userInfo.nick}
          </h5>
          <h5 className="email">
            이메일<span className="border">|</span> {userInfo.email}
          </h5>
          <h5 className="gender">
            성별<span className="border">|</span> {getGender(userInfo.gender)}
          </h5>
          <h5 className="age">
            나이<span className="border">|</span> {userInfo.age}세
          </h5>
          <h5 className="career">
            경력<span className="border">|</span> {getAge(userInfo.career)}
          </h5>
          <h5 className="mbti">
            MBTI<span className="border">|</span> {userInfo.mbti}
          </h5>
        </div>
      </div>
    </>
  );
};

export default MyPageViewInfo;
