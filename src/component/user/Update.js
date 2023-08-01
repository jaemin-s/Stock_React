import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./Update.scss";
import { API_BASE_URL } from "../../config/host-config";
const Update = ({ toggleModifyModal }) => {
  const [password, setPassword] = useState("");
  const [nick, setNick] = useState("");
  const [mbti, setMbti] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const URL = API_BASE_URL + "/api/user";
  const [modifyModal, setModifyModal] = useState(false);
  const [userValue, setUserValue] = useState({
    nick: "",
    password: "",
    mbti: "",
    age: "",
    career: "",
  });

  //검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    nick: "",
    password: "",
    passwordCheck: "",
    mbti: "",
    age: "",
    career: "",
  });

  //검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    nick: false,
    password: false,
    passwordCheck: false,
    age: false,
  });

  // 모달 닫을 시 모달에 입력된 값 비우기
  const clearState = () => {
    setPassword("");
    setNick("");
    setMbti("");
    setAge("");
    setCareer("");
    setPasswordCheck("");
    setMessage("");

    setMessage({
      nick: "",
      password: "",
      passwordCheck: "",
      mbti: "",
      age: "",
      career: "",
      message: "",
    });

    setCorrect({
      nick: false,
      password: false,
      passwordCheck: false,
      mbti: false,
      age: false,
      career: false,
      message: false,
    });
  };

  //검증 데이터를 상태변수에 저장하는 함수
  const saveInputState = ({ key, inputVal, flag, msg }) => {
    inputVal !== "pass" &&
      setUserValue({
        ...userValue,
        [key]: inputVal,
      });

    setMessage({
      ...message,
      [key]: msg,
    });

    setCorrect({
      ...correct,
      [key]: flag,
    });
  };

  // 닉네임 중복체크 서버 통신 함수
  const fetchNickCheck = (nick) => {
    let msg = "",
      flag = false;
    fetch(`${URL}/checknick?nick=${nick}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (json) {
          msg = "닉네임이 중복되었습니다!";
        } else {
          msg = "사용 가능한 닉네임입니다.";
          flag = true;
        }

        setUserValue({ ...userValue, nick: nick });
        setMessage({ ...message, nick: msg });
        setCorrect({ ...correct, nick: flag });
      })
      .catch((err) => {
        console.log("서버 통신이 원활하지 않습니다.");
      });
  };

  //닉네임 입력창 체인지 이벤트 핸들러
  const nickHandler = async (e) => {
    const inputVal = e.target.value;

    let msg,
      flag = false;
    if (!inputVal) {
      msg = "닉네임은 필수값입니다.";
    } else {
      // 중복 체크
      const duplicateCheckResult = await fetchNickCheck(inputVal);
      if (duplicateCheckResult) {
        msg = "닉네임이 중복되었습니다!";
      } else if (userValue.password === inputVal) {
        msg = "현재 비밀번호와 동일합니다. 다른 비밀번호를 입력해주세요.";
        flag = false;
      } else {
        msg = "사용 가능한 닉네임입니다.";
        setNick(inputVal);
        flag = true;
      }
    }

    saveInputState({
      key: "nick",
      inputVal,
      msg,
      flag,
    });
  };

  //패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = (e) => {
    const inputVal = e.target.value;

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    //검증 시작
    let msg,
      flag = false;
    if (!inputVal) {
      //패스워드 안적음.
      msg = "비밀번호는 필수입니다.";
    } else if (!pwRegex.test(inputVal)) {
      msg = "8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.";
    } else {
      msg = "사용 가능한 비밀번호입니다.";
      flag = true;
    }

    saveInputState({
      key: "password",
      inputVal,
      msg,
      flag,
    });
  };

  const pwCheckHandler = (e) => {
    //검증 시작
    let msg,
      flag = false;
    if (!e.target.value) {
      msg = "비밀번호 확인란은 필수입니다.";
    } else if (userValue.password !== e.target.value) {
      msg = "패스워드가 일치하지 않습니다.";
    } else {
      msg = "패스워드가 일치합니다.";
      flag = true;
    }

    saveInputState({
      key: "passwordCheck",
      inputVal: "pass",
      msg,
      flag,
    });
  };

  //나이 입력창 체인지 이벤트 핸들러
  const ageHandler = (e) => {
    let inputVal = e.target.value;

    const ageRegex = /[^0-9]/;

    let msg,
      flag = false;
    if (!inputVal) {
      msg = "나이를 입력해주세요.";
    } else if (ageRegex.test(inputVal)) {
      msg = "숫자 형식이 아닙니다.";
    } else {
      msg = "";
      flag = true;
    }

    saveInputState({
      key: "age",
      inputVal,
      msg,
      flag,
    });
  };

  // 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for (const key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };

  // 모달 닫을 시 모달안에 값 비우기
  useEffect(() => {
    if (!modifyModal) {
      setPassword("");
      setMessage("");
    }
  }, [modifyModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      password,
      nick,
      mbti,
      age,
      career,
    };

    try {
      const response = await fetch("/api/user/updateInfo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updateData,
          email: localStorage.getItem("LOGIN_USEREMAIL"),
        }),
      });

      // 응답 객체의 상태 코드 확인
      if (!response.ok) {
        // 클라이언트 오류 발생
        const errorMessage = await response.text();
        console.error("클라이언트 오류:", response.status, errorMessage);
        return; // 오류 처리 여기서 진행하거나 상태 업데이트 등을 수행할 수 있습니다.
      }

      // 성공적인 응답을 받은 경우
      const data = await response.json();
      console.log("서버 응답 데이터:", data);

      // 원하는 동작 수행 (예: 회원 정보 수정 완료 메시지, 상태 업데이트 등)
    } catch (error) {
      console.error("네트워크 오류:", error);
      // 네트워크 오류 처리를 여기서 진행하거나 에러 메시지를 화면에 표시할 수 있습니다.
    }

    setModifyModal(false);
    clearState();
  };

  const fetchUpdatePost = async () => {
    console.log(age);
    console.log(career);
    try {
      const response = await fetch(
        "http://localhost:8181/api/user/updateInfo",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            nick,
            mbti,
            age,
            career,
            email: localStorage.getItem("LOGIN_USEREMAIL"),
          }),
        }
      );

      if (response.ok) {
        // 서버 응답이 성공적으로 처리되었을 때
        alert("수정이 완료되었습니다.");
        setModifyModal(false);
      } else {
        // 서버 응답이 실패하거나 오류가 발생했을 때
        alert("서버와의 통신이 원활하지 않습니다.");
      }
    } catch (error) {
      // 네트워크 오류가 발생했을 때
      console.error("네트워크 오류:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const cplBtnHandler = (e) => {
    e.preventDefault();
    // if (!userValue.mbti) {
    //   alert("MBTI를 선택해주세요.");
    //   return;
    // }
    if (isValid()) {
      fetchUpdatePost();
    } else {
      alert("입력란을 다시 확인해 주세요!");
    }
  };

  const updateModal = (
    <Modal
      isOpen={modifyModal}
      toggle={toggleModifyModal}
      style={{ margin: "110px auto", width: 500, height: 650 }}
      className="update-modal"
    >
      <form onSubmit={handleSubmit}>
        <ModalBody className="update-modal-body">
          <h3 style={{ textAlign: "center" }} className="modal-title">
            정보 수정
          </h3>
          <div className="form-group">
            <input
              type="text"
              onChange={nickHandler}
              placeholder="새로운 닉네임"
              style={{ margin: "0" }}
            />
            <span
              className="pass-msg"
              style={correct.nick ? { color: "blue" } : { color: "red" }}
            >
              {message.nick}
            </span>
          </div>

          <div className="form-group">
            <input
              type="password"
              id="passwordCheck"
              value={password} // 이 부분 추가
              onChange={(e) => {
                setPassword(e.target.value);
                passwordHandler(e); // 추가: passwordHandler 호출하여 검증 로직 트리거
              }}
              placeholder="새로운 비밀번호"
              style={{ margin: "0" }}
            />
            <span
              className="pass-msg"
              style={correct.password ? { color: "blue" } : { color: "red" }}
            >
              {message.password}
            </span>
          </div>

          <div className="form-group">
            <input
              type="password"
              onChange={pwCheckHandler}
              placeholder="비밀번호 확인"
              style={{ margin: "0" }}
            />
            <span
              id="check-span"
              className="pass-msg"
              style={
                correct.passwordCheck ? { color: "blue" } : { color: "red" }
              }
            >
              {message.passwordCheck}
            </span>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="age"
              placeholder="나이"
              required
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                console.log(e.target.value);
                ageHandler(e);
              }}
              style={{ margin: "0" }}
            />

            <span
              className="pass-msg"
              style={correct.age ? { color: "blue" } : { color: "red" }}
            >
              {message.age}
            </span>
          </div>

          <div>
            <select
              onChange={(e) => {
                setMbti(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option selected disabled hidden>
                MBTI
              </option>
              <option value="선택안함">선택안함</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFP">ISFP</option>
              <option value="ESFP">ESFP</option>
              <option value="ESTP">ESTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
              <option value="ENFP">ENFP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="ENTP">ENTP</option>
              <option value="ENTJ">ENTJ</option>
            </select>
          </div>

          <div className="form-group">
            <select
              onChange={
                (e) => setCareer(e.target.value)
                // setUserValue({ ...userValue, career: e.target.value })
              }
            >
              <option selected disabled hidden>
                주식경력
              </option>
              <option value="1">입문</option>
              <option value="2">1~3년</option>
              <option value="3">4~10년</option>
              <option value="4">10년 이상</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={cplBtnHandler}
            className="button-58 modal-footer-btn"
            type="submit"
            style={{ margin: "0 10px" }}
          >
            완료
          </button>
          <button
            type="button"
            onClick={() => setModifyModal(false)}
            className="button-58-1 modal-footer-btn"
            style={{ margin: "0 10px" }}
          >
            취소
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );

  return (
    <>
      <a
        className="nav-link"
        href="#0"
        style={{ padding: "0px 16px" }}
        onClick={() => setModifyModal(true)}
      >
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>수정</span>
      </a>

      {updateModal}
    </>
  );
};

export default Update;
