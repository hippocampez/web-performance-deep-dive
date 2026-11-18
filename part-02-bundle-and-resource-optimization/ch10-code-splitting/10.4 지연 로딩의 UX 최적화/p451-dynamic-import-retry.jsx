// 동적 import에 재시도 로직 추가

// importFn : 청크를 불러오는 함수
// retries : 남은 재시도 횟수
// delay : 재시도 전 기다릴 시간
function retryImport(importFn, retries = 3, delay = 1000) {
  // Promise : 비동기 작업 결과를 나중에 알려주는 객체
  // resolve() : 작업 성공
  // reject() : 작업 실패
  return new Promise((resolve, reject) => {
    importFn() // 전달받은 함수 실행
      .then(resolve) // Dashboard 청크 다운로드 성공 시 -> resolve 호출
      // 에러시 catch문 실행
      .catch((error) => {
        if (retries === 0) {
          reject(error); // 최종 실패
          return; // 현재 함수 실행 종료
        }

        // 1초 기다렸다가 재시도
        setTimeout(() => {
          console.log(`Retrying import... (${retries} attempts left)`);
          // 재귀 호출
          retryImport(importFn, retries - 1, delay).then(resolve, reject);
        }, delay);
      });
  });
}

// 사용
// Dashboard를 불러오고, 만약 실패하면 최대 3번 더 시도하도록 만들어짐
const Dashboard = lazy(() => retryImport(() => import("./Dashboard")));

const Settings = lazy(() => retryImport(() => import("./Settings")));
