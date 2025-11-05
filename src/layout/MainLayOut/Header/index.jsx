import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Home, PlusCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const MainLayOutHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const unreadNotifications = 3; // This will come from state later

  const navItems = [
    { href: '/', icon: Home, label: '홈' },
    { href: '/create', icon: PlusCircle, label: '작성' },
    {
      href: '/notifications',
      icon: Bell,
      label: '알림',
      badge: unreadNotifications,
    },
    { href: '/profile', icon: User, label: '프로필' },
  ];

  return (
    <nav className="fixed bottom-0 shadow-sm left-0 right-0 z-50 bg-white border-t md:relative md:top-0 md:bottom-auto">
      <div className="container mx-auto max-w-[1440px] px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - desktop only */}
          <Link href="/" className="hidden md:flex items-center">
            <div className="text-2xl font-bold text-pink-100">두사타</div>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={(e) => {
                    // 보호가 필요한 라우트는 여기서 토큰 체크 후 로그인으로 리다이렉트
                    const protectedRoutes = ['/create', '/profile'];
                    if (protectedRoutes.includes(item.href)) {
                      const token = localStorage.getItem('token');
                      if (!token) {
                        alert('로그인이 필요합니다.');
                        // 기본 Link 이동 막고 로그인으로 리다이렉트
                        e.preventDefault();
                        navigate('/login');
                      }
                    }
                  }}
                  className={cn(
                    'flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-colors relative',
                    isActive
                      ? 'text-pink-100'
                      : 'text-brown-100 hover:text-pink-90'
                  )}
                >
                  <div className="relative">
                    <Icon
                      className={cn(
                        'w-6 h-6',
                        item.href === '/notification' &&
                          unreadNotifications > 0 &&
                          'animate-bell-shake'
                      )}
                    />
                    {item.badge && item.badge > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainLayOutHeader;
