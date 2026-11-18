// 모달과 다이얼로그 지연 로딩
import { lazy, Suspense, useState } from "react";

// 무거운 모달 컴포넌트를 지연 로딩
const ImageEditer = lazy(() => import("./components/ImageEditor"));
const VideoPlayer = lazy(() => import("./components/VideoPlayer"));

function ProductDetail() {
  const [showEditor, setShowEditor] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <h1>상품 상세</h1>
      <button onClick={() => setShowEditor(true)}>이미지 편집</button>
      <button onClick={() => setShowVideo(true)}>동영상 재생</button>

      {/* 조건부 렌더링 */}
      {showEditor && (
        <Suspense fallback={<div>에디터 로딩 중...</div>}>
          <ImageEditor onClose={() => setShowEditor(false)} />
        </Suspense>
      )}

      {showVideo && (
        <Suspense fallback={<div>플레이어 로딩 중...</div>}>
          <VideoPlayer onClose={() => setShowVideo(false)} />
        </Suspense>
      )}
    </div>
  );
}
