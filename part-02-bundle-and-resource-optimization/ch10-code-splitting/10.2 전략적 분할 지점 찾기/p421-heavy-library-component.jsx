// 무거운 라이브러리를 포함한 컴포넌트
import { lazy, Suspense, useState } from "react";

// Chart.js를 포함한 차트 컴포넌트
const Chart = lazy(() => import("./components/Chart"));

// Monaco Editor를 포함한 코드 에디터
const CodeEditor = lazy(() => import("./components/CodeEditor"));

// PDF.js를 포함한 PDF 뷰어
const PdfViewer = lazy(() => import("./components/PdfViewer"));

function DocumentView({ document }) {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <h1>{document.title}</h1>

      <button onClick={() => setShowChart(true)}>차트 보기</button>
      {showChart && (
        <Suspense fallback={<div>차트 로딩 중...</div>}>
          <Chart data={document.chartData} />
        </Suspense>
      )}

      <button onClick={() => setShowEditor(true)}>코드 편집</button>
      {showEditor && (
        <Suspense fallback={<div>에디터 로딩 중...</div>}>
          <CodeEditor code={document.code} />
        </Suspense>
      )}
    </div>
  );
}
