import MainLayOut from '@/layout/MainLayOut';
import { useState, useEffect } from 'react';
import PostCard from '@/components/_common/PostCard';
import PostDetailModal from '@/components/_common/PostDetailModal';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import postsApi from '@/lib/api/posts';
import authApi from '@/lib/api/auth';
import { useNavigate } from 'react-router-dom';

const getRandomRotation = () => {
  return Math.random() * 8 - 4;
};

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const list = await postsApi.list();
        if (mounted) setPosts(list);
        // Try to hydrate current user (cookie-based session)
        try {
          const me = await authApi.currentUser();
          if (mounted && me?.studentId) {
            setCurrentUserId(me.studentId);
            setIsLoggedIn(true);
          } else if (mounted) {
            setIsLoggedIn(false);
          }
        } catch (_) {
          if (mounted) setIsLoggedIn(false);
        }
      } catch (e) {
        if (mounted) setError(e?.message || 'failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handlePostClick = (post) => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
      return;
    }
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handlePostView = async (postId) => {
    // 낙관적 업데이트: 먼저 UI 증가
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? { ...post, clickCount: (post.clickCount || 0) + 1 }
          : post
      )
    );

    // 서버에 조회수 증가 요청
    try {
      const updated = await postsApi.incrementView(postId);
      if (updated) {
        // 서버 응답으로 정확한 값 반영
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.postId === postId ? updated : p))
        );
      }
    } catch (err) {
      console.error('조회수 업데이트 실패:', err);
      // 실패해도 낙관적 업데이트는 유지
    }
  };

  return (
    <MainLayOut>
      <main className="cork-board min-h-screen flex flex-col items-center bg-bg-primary">
        <div className="w-full max-w-6xl px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-brown-100 drop-shadow-sm">
              두유는 사랑을 타고
            </h1>
            <p className="text-brown-100/70">삼육대학생 전용 소개팅 커뮤니티</p>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-white/90 backdrop-blur-sm"
            >
              <Filter className="h-4 w-4" />
              재배치
            </Button>
          </div>

          {loading && (
            <div className="text-center text-sm text-gray-500">
              불러오는 중…
            </div>
          )}
          {error && !loading && (
            <div className="text-center text-sm text-red-500">
              목록을 불러오지 못했습니다.
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
              {posts.map((post) => (
                <div
                  key={post.postId}
                  className="w-full max-w-[280px] transform transition-transform hover:z-10"
                  style={{
                    transform: `rotate(${getRandomRotation()}deg)`,
                  }}
                >
                  <div className="hover:scale-105 transition-transform duration-200">
                    <PostCard
                      post={post}
                      currentUserId={currentUserId}
                      onClick={() => handlePostClick(post)}
                      onView={() => handlePostView(post.postId)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <PostDetailModal
        post={selectedPost}
        currentUserId={currentUserId}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </MainLayOut>
  );
};

export default MainPage;
