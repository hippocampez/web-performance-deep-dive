// 청크 로딩 에러 감지와 자동 재시도
class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 어떤 에러인지 확인
  componentDidCatch(error, errorInfo) {
    // 청크 로딩 에러인지 확인
    const isChunkError =
      error.name === "ChunkLoadError" ||
      /Loading chunk [\d] + failed/.test(error.message) ||
      /Failed to fetch/.test(error.message);

    if (isChunkError) {
      console.warn("Chunk loading failed:", error);

      // 재시도 횟수가 제한 이내면 자동 재시도
      if (this.state.retryCount < 3) {
        setTimeout(() => {
          this.setState(() => ({
            hasError: false,
            error: null,
            retryCount: this.state.retryCount + 1,
          }));
        }, 1000);
      }
    } else {
      console.error("Runtime error:", error, errorInfo);
    }
  }

  // 어떤 화면을 보여줄지 결정
  render() {
    if (this.state.hasError) {
      const isChunkError =
        this.state.error?.name === "ChunkLoadError" ||
        /Loading chunk [\d] + failed/.test(this.state.error?.message);

      if (isChunkError && this.state.retryCount >= 3) {
        return (
          <div className="error-container">
            <h2>페이지를 불러올 수 없습니다.</h2>
            <p>새 버전이 배포되었을 수 있습니다.</p>
            <button onClick={() => window.location.reload()}>새로 고침</button>
          </div>
        );
      }

      return (
        this.props.fallback || (
          <div className="error-container">
            <h2>오류가 발생했습니다.</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              다시 시도
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
