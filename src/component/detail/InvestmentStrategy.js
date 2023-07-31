import React from "react";
import MbtiTip from "./MbtiTip";

const InvestmentStrategy = ({ personalityType }) => {
  let strategyText = "";
  switch (personalityType) {
    case "ISTJ":
    case "ISFJ":
    case "ESTJ":
    case "ESFJ":
      strategyText = "안정적이고 보수적인 투자 성향을 가지고 있습니다."
      break;
    case "ISFP":
    case "ESFP":
    case "ISTP":
    case "ESTP":
      strategyText =
        "모험, 스릴 추구, 리스크 과다 -> 3 자본증감+매출액증가 상위";
      break;
    case "INFJ":
    case "ENFJ":
    case "INFP":
    case "ENFP":
      strategyText = "이상주의자 -> 4 저평가";
      break;
    case "INTJ":
    case "ENTJ":
    case "INTP":
    case "ENTP":
      strategyText = "퀀트투자 -> 5 영업이익률+EPS";
      break;
    default:
      strategyText = "투자 전략이 없습니다.";
  }

  return (
    <MbtiTip text={strategyText}>
      <span>{personalityType}</span>
    </MbtiTip>
  );
};

export default InvestmentStrategy;
