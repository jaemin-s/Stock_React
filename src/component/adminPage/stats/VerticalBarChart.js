import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ barLabel, items }) => {
  const borderColors = [
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
  ];
  const backgroundColors = [
    "rgba(255, 99, 132, 1)", //빨강
    "rgba(54, 162, 235, 0.5)", //파랑
    "rgba(255, 205, 86, 0.5)", //노랑
    "rgba(155,196,30, 0.5)", //초록
    "rgba(178,170,253, 0.5)", //보라
    "rgba(46,50,147, 0.5)", //진한 파랑
    "rgba(243,223,0, 0.5)", //노랑
    "rgba(209,235,216, 0.5)", //파스텔 연두
    "rgba(255,255,225, 0.5)", //
    "rgba(242,103,34, 0.5)", //주황
    "rgba(1,123,105, 0.5)", //진한 초록
    "rgba(255,193,204, 0.5)", //파스텔 핑크
    "rgba(115,89,82, 0.5)", //똥색
  ];

  const dataset = [];
  !!items &&
    items.forEach((item, index) => {
      dataset.push({
        label: item.label,
        data: item.value,
        borderColor: borderColors[index],
        backgroundColor: backgroundColors[index],
      });
    });

  const data = {
    labels: barLabel,
    datasets: dataset,
  };
  return <Bar data={data} />;
};

export default BarChart;
