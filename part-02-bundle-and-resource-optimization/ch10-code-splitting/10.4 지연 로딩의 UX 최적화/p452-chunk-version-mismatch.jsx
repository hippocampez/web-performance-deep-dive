// 배포 중 청크 버전 불일치 처리
class DeploymentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // 청크 에러인지 검사
  componentDidCatch(error) {
    const isChunkError =
      error.name === "ChunkLoadError" ||
      /Loading chunk [\d] + failed/.test(error.message);

    if (isChunkError) {
      // sessionStroage로 무한 리로드 방지 - 새로고침 횟수 기억
      const reloadCount = parseInt(
        sessionStorage.getItem("chunkErrorReloadCount") || "0",
      );

      // 자동 새로고침 제한
      if (reloadCount < 1) {
        sessionStorage.setItem(
          "chunkErrorReloadCount",
          String(reloadCount + 1),
        );
        window.location.reload();
      } else {
        // 이미 한 번 리로드했으면 에러 UI 표시
        sessionStorage.removeItem("chunkErrorReloadCount");
      }
    }
  }

  // 에러 화면 표시
  rendor() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>페이지를 불러올 수 없습니다.</h2>
          <p>페이지를 수동으로 새로고침해주세요.</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      );
    }
  }
}
