import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";

const MarketInfo = () => {
  const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    return { hour: currentHour, minute: currentMinute, second: currentSecond };
  };

  const isMarketAvailable = () => {
    const currentTime = getCurrentTime();
    const currentDay = new Date().getDay();
    const isWeekday = currentDay >= 1 && currentDay <= 5; // 월 ~ 금
    return (
      isWeekday &&
      currentTime.hour >= 9 &&
      (currentTime.hour < 15 ||
        (currentTime.hour === 15 && currentTime.minute < 30))
    );
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime);
  const [isMarketOpen, setIsMarketOpen] = useState(isMarketAvailable());

  const availableStyle = { color: "green", fontWeight: "600" };
  const unavailableStyle = { color: "red", fontWeight: "600" };

  const icon = isMarketOpen ? faCheckCircle : faXmarkCircle;

  // 장이 개장되는 시간과 마감되는 시간을 설정합니다.
  const openTime = new Date();
  openTime.setHours(9, 0, 0, 0);
  const closeTime = new Date();
  closeTime.setHours(15, 30, 0, 0);

  // 장이 개장되는 시간까지 남은 시간 계산 함수
  const getTimeUntilOpen = () => {
    const now = new Date();
    if (now > openTime) {
      const nextDayOpenTime = new Date(now);
      nextDayOpenTime.setDate(now.getDate() + 1);
      nextDayOpenTime.setHours(9, 0, 0, 0);
      return nextDayOpenTime - now;
    }
    return openTime - now;
  };

  // 장이 마감되는 시간까지 남은 시간 계산 함수
  const getTimeUntilClose = () => {
    const now = new Date();
    if (!isMarketOpen) {
      if (now > closeTime) {
        const nextDayCloseTime = new Date(now);
        nextDayCloseTime.setDate(now.getDate() + 1);
        nextDayCloseTime.setHours(15, 30, 0, 0);
        return nextDayCloseTime - now;
      }
      return closeTime - now;
    }

    const endOfTrading = new Date(now);
    endOfTrading.setHours(15, 30, 0, 0);
    return endOfTrading - now;
  };

  // 시간을 시:분 형식의 문자열로 변환하는 함수
  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
      setIsMarketOpen(isMarketAvailable());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            ...(isMarketOpen ? availableStyle : unavailableStyle),
            marginBottom: "13px",
          }}
        >
          <FontAwesomeIcon
            icon={icon}
            style={{
              fontSize: "16px",
              marginRight: "5px",
            }}
          />
          {isMarketOpen
            ? `장이 마감까지 ${formatTime(getTimeUntilClose())} 남았습니다.`
            : `장이 개장까지 ${formatTime(getTimeUntilOpen())} 남았습니다.`}
        </p>
      </div>
    </>
  );
};

export default MarketInfo;
