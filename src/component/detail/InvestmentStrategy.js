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
        "모험과 스릴을 추구하고 자본증감과 매출액이 상위에 위치합니다.";
      break;
    case "INFJ":
    case "ENFJ":
    case "INFP":
    case "ENFP":
      strategyText = 
      "장기적인 투자 선호와 분할 매수 전략을 채택하는 다양한 투자 성향입니다.";
      break;
    case "INTJ":
    case "ENTJ":
    case "INTP":
    case "ENTP":
      strategyText = 
      "창의적이고 끈질긴 투자, 안전마진을 고려하며 다양한 분산 투자 성향입니다.";
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
