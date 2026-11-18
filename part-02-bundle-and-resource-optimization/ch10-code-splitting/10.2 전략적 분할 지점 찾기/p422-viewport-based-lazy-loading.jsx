// 뷰포트 기반 지연 로딩
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HeavyFooter = lazy(() => import("./components/HeavyFooter"));

function HomePage() {
  const [showFooter, setShowFooter] = useState(false);
  const footerTrigger = useRef(null); // 기준점 div를 가리킬 변수

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 기준점이 화면에 들어왔으면
        if (entries[0].isIntersecting) {
          setShowFooter(true); // 푸터를 보여줌
          observer.disconnect(); // 감시 종료
        }
      },
      { rootMargin: "100px" }, // 뷰포트에 100px 전에 미리 로드
    );

    // 기준점 연결
    if (footerTrigger.current) {
      observer.observe(footerTrigger.current);
    }

    // cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <header>...</header>
      <main>...</main>

      {/* 푸터가 가까워졌는지 감지하기 위한 기준점 */}
      <div ref={footerTrigger} />

      {showFooter && (
        <Suspense fallback={<div>Footer 로딩 중...</div>}>
          <HeavyFooter />
        </Suspense>
      )}
    </div>
  );
}
