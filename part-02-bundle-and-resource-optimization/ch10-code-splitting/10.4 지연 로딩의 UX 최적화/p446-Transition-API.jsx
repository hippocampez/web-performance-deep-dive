import { useTransition } from "react"; // React 기능
import { useNavigate } from "react-router-dom"; // React Router 기능

function Navigation() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = (path) => {
    // React에게 이 안에서 발생하는 상태 업데이트를 긴급하지 않은 전환 작업으로 처리하도록 요청함
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <nav>
      {/* disabled : 버튼 클릭 비활성화 */}
      <button onClick={() => handleNavigate("/dashboard")} disabled={isPending}>
        Dashboard {isPending && "(로딩 중...)"}
      </button>
      <button onClick={() => handleNavigate("/settings")}>Settings</button>
    </nav>
  );
}
