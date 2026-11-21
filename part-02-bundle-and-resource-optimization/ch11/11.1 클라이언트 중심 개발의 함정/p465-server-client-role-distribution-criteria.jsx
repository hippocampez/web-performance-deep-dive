// 서버: 데이터 필터링과 가공 처리

import { useState } from "react";

// GET /api/products?category=electronics&sort=price&page=1
app.get("/api/products", async (req, res) => {
  const { category, sort, page = 1 } = req.query;

  // 서버에서 필터링, 정렬, 페이지네이션 수행
  const products = await db.products
    .where("category", category)
    .orderBy(sort, "asc")
    .paginate(page, 20);

  // 필요한 필드만 선택해 응답 크기를 최소화
  const simplified = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.thumbnail_url,
    inStock: p.stock > 0,
  }));

  res.json({
    products: simplified,
    total: products.total,
    hasMore: products.hasMore,
  });
});

// 클라이언트: 받은 데이터를 UI에 표시하고 상호작용을 처리
function ProductList() {
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [page, setPage] = useState(1);

  // 서버에서 이미 처리된 데이터를 받아옴
  const { data, isLoading } = useQuery(
    ["products", category, sortBy, page],
    () =>
      fetch(
        `/api/products?category=${category}&sort=${sortBy}&page=${page}`,
      ).then((r) => r.json()),
  );

  // 클라이언트는 UI 상태 관리와 렌더링에만 집중
  return (
    <div>
      <CategoryFilter value={category} onChange={setCategory} />
      <SortSelect value={sortBy} onChange={setSortBy} />
      {isLoading ? <Spinner /> : <ProductGrid products={data.products} />}
      {data?.hasMore && (
        <button onClick={() => setPage((p) => p + 1)}>더보기</button>
      )}
    </div>
  );
}
