import { Suspense } from "react";

class ErrorBoundary extends React.Component {
  // 컴포넌트가 생성될 때 처음 실행되는 초기화 함수
  constructor(props) {
    super(props); // 부모 클래스인 React.Component의 생성자 호출
    this.state = { hasError: false, error: null }; // 컴포넌트 내부에서 관리하는 상태(함수형 컴포넌트의 useState)
  }

  // 에러가 발생했을 때 React가 호출해 주는 함수
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 발생한 에러 기록
  // error : 어떤 에러가 발생했는지
  // errorInfo : 어느 컴포넌트에서 에러가 발생했는지 등의 정보
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary: ", error, errorInfo);
  }

  // 어떤 화면을 보여줄지 결정하는 부분
  rendor() {
    if (this.state.hasError) {
      return (
        // ||는 왼쪽 값이 없거나 falsy면 오른쪽 값 사용
        this.props.fallback || (
          <div>
            <h2>문제 발생</h2>
            <p>페이지를 새로고침 해주세요.</p>
          </div>
        )
      );
    }

    // children : <ErrorBoundary> 태그 안에 들어있는 내용 (=<Dashboard />)
    return this.props.children;
  }
}

// 사용
// 에러 처리
<ErrorBoundary>
  {/* 로딩 처리 */}
  <Suspense fallback={<DashboardSkeleton />}>
    <Dashboard />
  </Suspense>
</ErrorBoundary>;
