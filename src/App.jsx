import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 모음
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage/CreatePage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />
        {/* 포스트잇 생성 */}
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
