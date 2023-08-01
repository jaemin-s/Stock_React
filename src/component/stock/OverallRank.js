import {
  faCrown,
  faRecycle,
  faRefresh,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./OverallRank.scss";
import { API_BASE_URL } from "../../config/host-config";
import Swal from "sweetalert2";
const OverallRank = () => {
  //유저 랭킹 정보 관리
  const [rankingTable, setRankingTable] = useState();
  useEffect(() => {}, [rankingTable]);
  //모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  //클릭한 이름 저장 관리
  const [clickName, setClickName] = useState("");
  //클릭한 유저의 주식 정보 관리
  const [userTradeInfo, setUserTradeInfo] = useState([]);
  //유저 등급
  const [roll, setRoll] = useState("common");
  //아이콘 회전
  const [rotation, setRotation] = useState(false);
  // 전체 랭킹 불러오기
  async function getRankInfo() {
    const res = await fetch(API_BASE_URL + "/api/trade/rank");
    const rankData = await res.json();
    console.log(rankData);
    setRankingTable(rankData);
  }
  if (!rankingTable) getRankInfo();

  const rankingBody = () => {
    return rankingTable.map((item) => (
      <tr>
        <th scope="row">
          {item.rank === 1 ? (
            <FontAwesomeIcon
              icon={faCrown}
              style={{ color: "#F9BC28", fontSize: "23px" }}
            />
          ) : (
            item.rank
          )}
        </th>
        <td>
          <p
            onClick={(e) => getInfoHandler(item.email, e)}
            style={{ cursor: "pointer" }}
          >
            {item.userName}
          </p>
        </td>
        <td>
          <span className={item.profit >= 0 ? "positive" : "negative"}>
            {item.profit >= 0 ? "+" : ""}
            {item.profit.toLocaleString()}
          </span>
        </td>
      </tr>
    ));
  };

  const getInfoHandler = async (email, e) => {
    const res = await fetch(API_BASE_URL + "/api/trade/history/" + email);
    const result = await res.json();
    console.log(result);
    setUserTradeInfo(result);

    console.log(email);
    console.log(e.target.textContent);
    setClickName(e.target.textContent);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setExpanded(false);
  };

  // 날짜 형식 변환(거래 일자)
  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  //매수,매도 변환
  function getTradeType(tradeType) {
    switch (tradeType) {
      case "buy":
        return "매수";
      case "sell":
        return "매도";
    }
  }

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    if (roll === "common") {
      alert("프리미엄 회원만 추가조회가 가능합니다.");
    } else {
      setExpanded(!expanded);
    }
  };

  //더보기 버튼
  function moreButton() {
    // if (roll === "common") {
    //   return null;
    // }
    if (userTradeInfo.length > 3) {
      return (
        <div className="btn-more">
          <button className="button-21" onClick={toggleExpanded}>
            {expanded ? "접기" : "더보기"}
          </button>
        </div>
      );
    }
    return null;
  }

  const tradeInfoModal = (
    <>
      <Modal
        isOpen={isModalOpen}
        style={{ maxWidth: 2000, width: 600, marginTop: 100 }}
      >
        <ModalHeader>{clickName}님의 주식정보</ModalHeader>
        <ModalBody style={{ overflow: "auto" }}>
          <div>
            <table className="collapsed" id="table">
              <thead>
                <tr className="high">
                  <th scope="col">거래 일자</th>
                  <th scope="col">매수 / 매도 (수량)</th>
                  <th scope="col">종목</th>
                  {/* <th scope="col">매매 수량</th>
                  <th scope="col">매매 금액</th> */}
                </tr>
              </thead>
              <tbody>
                {userTradeInfo
                  .slice(0, expanded ? userTradeInfo.length : 3)
                  .map((item, index) => (
                    <tr key={index}>
                      <th>{getFormattedDate(item.tradeDate)}</th>
                      <td>
                        {getTradeType(item.tradeType)} ({item.quantity}주)
                      </td>
                      <td>{item.stockName}</td>
                      {/* <td>2</td>
                    <td>2</td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
            {moreButton()}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            취소
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

  const refreshCHandler = () => {
    setRotation(true);
    setTimeout(() => {
      setRotation(false);
    }, 2000);
    Swal.fire({
      title: "랭킹을 초기화 하시겠습니까??",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (resetRank()) {
          setRankingTable();
          Swal.fire("초기화 되었습니다!", "", "success");
        } else {
          Swal.fire("초기화에 실패힜습니다!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("취소 되었습니다.", "", "info");
      }
    });
  };

  async function resetRank() {
    if (localStorage.getItem("LOGIN_USERROLE") !== "ADMIN") {
      return;
    }
    const res = await fetch(API_BASE_URL + "/api/trade/ranking/reset", {
      method: "PUT",
    });
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      <div className="simulated-rank card shadow">
        <div className="card-header">
          <h6 className="m-0 font-weight-bold text-primary">
            모의 투자 랭킹
            <FontAwesomeIcon
              icon={faRefresh}
              style={{
                color: "black",
                fontSize: "17px",
                cursor: "pointer",
                animation: rotation ? "rotate360 3s linear" : "none",
              }}
              onClick={refreshCHandler}
            />
          </h6>
        </div>
        <table className="collapsed" id="table">
          <thead>
            <tr className="high">
              <th scope="col">랭킹</th>
              <th scope="col">회원명</th>
              <th scope="col">총 수익 (원)</th>
            </tr>
          </thead>
          <tbody>{!!rankingTable && rankingBody()}</tbody>
        </table>
      </div>
      {isModalOpen && tradeInfoModal}
    </>
  );
};

export default OverallRank;
