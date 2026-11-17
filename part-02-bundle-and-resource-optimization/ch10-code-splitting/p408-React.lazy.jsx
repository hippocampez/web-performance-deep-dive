// React.lazy()의 단순화된 구현
function lazy(loadComponent) {
  let status = "pending";
  let result;
  let promise = loadComponent().then(
    (module) => {
      status = "success";
      result = module.default;
    },
    (error) => {
      status = "error";
      result = error;
    },
  );

  return function LazyComponent(props) {
    if (status === "pending") {
      // 컴포넌트가 아직 로드되지 않음 - Promise를 throw
      throw promise;
    }
    if (status === "error") {
      // 로딩 실패 - 에러를 throw
      throw result;
    }
    if (status === "success") {
      // 로딩 성공 - 컴포넌트 렌더링
      const Component = result;
      return <Component {...props} />;
    }
  };
}
