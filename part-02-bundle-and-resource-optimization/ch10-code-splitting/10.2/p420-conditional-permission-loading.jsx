// 조건부 기능과 권한 기반 로딩
import { lazy, Suspense } from "react";

const AdminPanel = lazy(() => import("./components/AdminPanel"));
const PremiumFeatures = lazy(() => import("./components/PremiumFeatures"));

function App({ user }) {
  return (
    <div>
      <h1>대시보드</h1>

      {/* 관리자에게만 어드민 패널 로드 */}
      {user.isAdmin && (
        <Suspense fallback={<div>관리자 패널 로딩 중...</div>}>
          <AdminPanel />
        </Suspense>
      )}

      {/* 프리미엄 사용자에게만 고급 기능 로드*/}
      {user.isPremium && (
        <Suspense fallback={<div>프리미엄 기능 로딩 중...</div>}>
          <PremiumFeatures />
        </Suspense>
      )}
    </div>
  );
}
