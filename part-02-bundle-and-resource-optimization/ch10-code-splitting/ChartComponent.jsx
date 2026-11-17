import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// 차트를 렌더링하기 전 Chart.js에 필요한 기능을 등록함
// 이 코드는 앱이 시작될 때 한 번 실행됨
ChartJS.register(CategoryScale, LinearScale, BarElement);

const chartData = {
  labels: ["1월", "2월", "3월"],
  datasets: [{ data: [10, 20, 30] }],
};

export default function ChartComponent() {
  return <Bar data={chartData} />;
}
