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
