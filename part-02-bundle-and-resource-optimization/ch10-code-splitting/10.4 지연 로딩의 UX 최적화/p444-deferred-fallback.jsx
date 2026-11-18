// 지연된 폴백 표시

// custom Hook
function useDeferredFallback(Delay = 200) {
  const [showFallback, setShowFallabck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return showFallback;
}

function DeferredFallback({ childrem, fallback, delay = 200 }) {
  const showFallback = useDeferredFallback(delay);

  return (
    <Suspense
      fallback={
        showFallback ? (
          <div className="fallback-container">{fallback}</div>
        ) : null
      }
    >
      {children}
    </Suspense>
  );
}

// 사용
<DeferredFallback fallback={<DashboardSkeleton />} delay={200}>
  <Dashboard />
</DeferredFallback>;
