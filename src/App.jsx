import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지 모음
import MainPage from './pages/MainPage';
import Login from './pages/Login/login.jsx';
import Register from './pages/Register/register.jsx';
import CreatePage from './pages/CreatePage/CreatePage.jsx';
import MyPage from './pages/MyPage/mypage.jsx';
import NotificationPage from './pages/NotificationPage/NotificationPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/profile" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
