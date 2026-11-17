// 탭과 아코디언 컴포넌트
import { lazy, Suspense, useState } from "react";

// 각 탭을 lazy()로 선언
const Overview = lazy(() => import("./tabs/Overview"));
const Analytics = lazy(() => import("./tabs/Analytics"));
const Reports = lazy(() => import("./tabs/Reports"));
const Settings = lazy(() => import("./tabs/Settings"));

// 현재 선택된 탭을 상태로 관리
function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="tabs">
        {/* 버튼 클릭 시 탭 변경 */}
        <button onClick={() => setActiveTab("overview")}>개요</button>
        <button onClick={() => setActiveTab("analytics")}>분석</button>
        <button onClick={() => setActiveTab("reports")}>리포트</button>
        <button onClick={() => setActiveTab("settings")}>설정</button>
      </div>

      {/* 선택된 탭만 렌더링*/}
      <Suspense fallback={<div>탭 로딩 중...</div>}>
        {activeTab === "overview" && <Overview />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "settings" && <Settings />}
      </Suspense>
    </div>
  );
}
