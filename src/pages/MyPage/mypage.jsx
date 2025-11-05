import MainLayOut from '@/layout/MainLayOut';
import { useNavigate } from 'react-router-dom';
import './mypage.css';

export default function MyPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token') || 'Null';

  const handleToken = () => {
    if (token === 'Null') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  return (
    <MainLayOut>
      <div>{token}</div>
    </MainLayOut>
  );
}
