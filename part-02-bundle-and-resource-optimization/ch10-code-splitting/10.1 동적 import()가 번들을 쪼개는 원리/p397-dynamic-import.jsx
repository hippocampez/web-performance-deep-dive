// 동적 import() 사용 시
// Chart.js와 차트 컴포넌트를 처음부터 불러오지 않음
import React, { useState } from "react";

function App() {
  // 차트를 화면에 표시할지 여부
  const [showChart, setShowChart] = useState(false);
  // 동적으로 불러온 컴포넌트를 저장
  const [ChartComponent, setChartComponent] = useState(null);
  // 모듈을 불러오는 중인지 여부
  const [loading, setLoading] = useState(false);

  // 차트 버튼을 클릭했을 때 실행되는 함수
  const loadChart = async () => {
    // 로딩 상태 시작
    setLoading(true);

    // 버튼을 클릭한 시점에 ChartComponent 파일을 불러옴
    // Promise를 반환하므로 await를 사용함
    const module = await import("./ChartComponent");

    // module.default는 ChartComponent.jsx에서 export default한 컴포넌트
    // 함수를 상태에 저장할 때 React가 함수 자체를 상태 값으로 인식하도록 한 번 더 함수로 감싸줌
    setChartComponent(() => module.default);

    // 차트를 화면에 표시
    setShowChart(true);

    // 로딩 상태 종료
    setLoading(false);
  };

  return (
    <div>
      {/* 클릭 시 LoadChart 함수 실행, 로딩 중에는 버튼 비활성화 */}
      <button onClick={loadChart} disabled={loading}>
        {loading ? "로딩 중..." : "차트"}
      </button>

      {/* 차트를 성공적으로 불러온 경우에만 렌더링함 */}
      {showChart && ChartComponent && <ChartComponent />}
    </div>
  );
}
