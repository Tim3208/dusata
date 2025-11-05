import MainLayOut from '@/layout/MainLayOut';
import { useNavigate } from 'react-router-dom';
import './mypage.css';

export default function MyPage() {
  const navigate = useNavigate();

  return <MainLayOut></MainLayOut>;
}
