import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 모음
import MainPage from "./pages/MainPage";
import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";
import Notifications from "./pages/Notifications/notifications.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />


      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
