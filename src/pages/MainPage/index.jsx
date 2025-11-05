import MainLayOut from "@/layout/MainLayOut";
import { useState, useEffect } from "react";
import PostCard from "@/components/_common/PostCard";
import PostDetailModal from "@/components/_common/PostDetailModal";
// import { dummyPosts, dummyUsers } from "@/lib/dummyData";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import postsApi from "@/lib/api/posts";
import { useNavigate } from "react-router-dom";

const getRandomRotation = () => {
  return Math.random() * 8 - 4;
};

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUserId = "20201234"; // TODO: 실제 로그인 사용자 ID로 교체
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const list = await postsApi.list();
        if (mounted) setPosts(list);
      } catch (e) {
        if (mounted) setError(e?.message || "failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handlePostClick = (post) => {
    const isLoggedIn = true; // TODO: 실제 인증 상태로 교체
    if (!isLoggedIn) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return;
    }
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handlePostLike = (postId, isLiked) => {
    // 실제로는 API 호출을 통해 서버에 좋아요 상태를 업데이트
    const notification = {
      id: `notif-${Date.now()}`,
      userId: posts.find((p) => p.postId === postId)?.studentId,
      type: "like",
      fromUserId: currentUserId,
      postId: postId,
      message: `${currentUserId}님이 회원님의 게시물을 좋아합니다`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    console.log("새로운 알림:", notification);
  };

  const handlePostView = (postId) => {
    // 실제로는 API 호출을 통해 서버에 조회수를 업데이트
    setPosts(
      posts.map((post) =>
        post.postId === postId
          ? { ...post, clickCount: (post.clickCount || 0) + 1 }
          : post
      )
    );
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
