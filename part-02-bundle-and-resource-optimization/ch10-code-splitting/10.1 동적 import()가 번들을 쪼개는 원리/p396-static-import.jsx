// 정적 import 사용 시
// 파일이 실행될 때 필요한 모듈을 미리 불러옴
import React, { useState } from "react";

// Chart.js 관련 모듈도 초기 로딩 시 함께 번들에 포함됨
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// // 차트를 렌더링하기 전 Chart.js에 필요한 기능을 등록함
// 이 코드는 앱이 시작될 때 한 번 실행됨
ChartJS.register(CategoryScale, LinearScale, BarElement);

function App() {
  // showChart가 true인지에 따라 차트를 화면에 표시함
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      {/* 버튼을 클릭하면 showChart를 true로 변경 */}
      <button onClick={() => setShowChart(true)}>차트</button>

      {/* showCahrt가 true일 때만 Bar 차트를 렌더링함 */}
      {showChart && <Bar data={chartData} />}
    </div>
  );
}
