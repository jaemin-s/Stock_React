import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutMaker = ({ labels, doughnutLabel, doughnutData }) => {
  const chartData = {
    labels: !!labels
      ? labels
      : [
          "Red",
          "Blue",
          "Yellow",
          "green",
          "Red",
          "Blue",
          "Yellow",
          "green",
          "Red",
          "Blue",
          "Yellow",
          "green",
        ],
    datasets: [
      {
        label: !!doughnutLabel ? doughnutLabel : "My First Dataset",
        data: !!doughnutData
          ? doughnutData
          : [300, 50, 100, 60, 300, 50, 100, 60, 300, 50, 100, 60],
        backgroundColor: [
          "rgb(255, 99, 132)", //빨강
          "rgb(54, 162, 235)", //파랑
          "rgb(255, 205, 86)", //노랑
          "rgb(155,196,30)", //초록
          "rgb(178,170,253)", //보라
          "rgb(46,50,147)", //진한 파랑
          "rgb(243,223,0)", //노랑
          "rgb(209,235,216)", //파스텔 연두
          "rgb(255,255,225)", //
          "rgb(242,103,34)", //주황
          "rgb(1,123,105)", //진한 초록
          "rgb(255,193,204)", //파스텔 핑크
          "rgb(115,89,82)", //똥색
        ],
        hoverOffset: 4,
      },
    ],
  };
  return <Doughnut data={chartData} />;
};

export default DoughnutMaker;
