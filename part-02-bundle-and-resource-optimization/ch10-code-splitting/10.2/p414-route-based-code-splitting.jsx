import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>페이지 로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
