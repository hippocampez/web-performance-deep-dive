import { Suspense } from "react";

// 패턴 1 : 단일 서스펜스
// 모든 컴포넌트를 하나의 서스펜스로 감싸기
<Suspense fallback={<div>로딩 중...</div>}>
  {currentView === "home" && <Home />}
  {currentView === "dashboard" && <Dashboard />}
  {currentView === "settings" && <Settings />}
</Suspense>;

// 패턴 2 : 독립적 서스펜스
// 각 컴포넌트를 독립적인 서스펜스로 감싸기
{
  currentView === "dashboard" && (
    <Suspense fallback={<div>대시보드 로딩 중...</div>}>
      <Dashboard />
    </Suspense>
  );
}
{
  currentView === "settings" && (
    <Suspense fallback={<div>설정 로딩 중...</div>}>
      <Settings />
    </Suspense>
  );
}

// 패턴 3 : ErrorBoundary와 함께
// 에러 처리를 추가한 패턴
<ErrorBoundary fallback={<div>로딩 실패</div>}>
  <Suspense fallback={<div>로딩 중...</div>}>
    {currentView === "dashboard" && <Dashboard />}
  </Suspense>
</ErrorBoundary>;
