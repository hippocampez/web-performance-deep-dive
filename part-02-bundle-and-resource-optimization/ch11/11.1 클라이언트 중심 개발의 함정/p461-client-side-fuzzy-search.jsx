// 클라이언트에서 퍼지 검색을 구현하는 방식
import Fuse from "fuse.js"; // 약 20KB(gzip 후)

function SearchBox() {
  // 검색어와 전체 상품 데이터 관리
  const [query, setQuery] = useState("");
  const { data: allProducts } = useQuery("allProducts", () =>
    fetch("/api/products/all").then((r) => r.json()),
  );

  // Fuse 검색 객체 생성
  const fuse = useMemo(
    () =>
      new Fuse(allProducts, {
        keys: ["name", "description", "tags"],
        threshold: 0.3,
      }),
    [allProducts],
  );

  // 검색 결과 계산
  const results = useMemo(() => {
    if (!query) return [];
    return fuse.search(query).slice(0, 10);
  }, [query, fuse]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색..."
      />
      <ul>
        {results.map((results) => (
          <li key={results.item.id}>{results.item.name}</li>
        ))}
      </ul>
    </div>
  );
}

{
  /*
    이 접근 방식은 여러 문제 야기
    1. 5,000개의 상품 데이터를 모두 다운로드 -> 약 2MB의 네트워크 전송 필요
    2. Fuse.js 라이브러리(약 20KB)가 번들에 포함됨.
    3. 퍼지 검색 알고리즘은 데이터가 많을수록 연산이 무거워져 타이핑할 때마다
        UI가 매끄럽게 동작하지 않을 수 있음.
    4. 검색 인덱스를 메모리에 유지해야 하므로 메모리 사용량이 증가함.
    */
}
