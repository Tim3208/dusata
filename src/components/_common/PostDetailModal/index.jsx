import { useState, useEffect } from 'react';
import {
  X,
  Heart,
  User,
  GraduationCap,
  Calendar,
  Instagram,
  Phone,
  MessageCircle,
  VenusAndMars,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const colorClasses = {
  Yellow: 'bg-yellow-100',
  Pink: 'bg-pink-100',
};

const PostDetailModal = ({
  post,
  currentUserId,
  open,
  onOpenChange,
  onLike,
}) => {
  // 안전한 초기값 (post가 null/undefined일 수 있으므로 접근 방지)
  const [isLiked, setIsLiked] = useState(() =>
    Boolean(post?.likedBy?.includes?.(currentUserId))
  );
  const [bookmarkCount, setBookmarkCount] = useState(
    () => post?.bookmarkCount ?? 0
  );
  const [hasViewed, setHasViewed] = useState(() => {
    try {
      const viewed = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
      return Boolean(post && viewed[post.postId]);
    } catch {
      return false;
    }
  });
  const [viewCount, setViewCount] = useState(() => post?.clickCount ?? 0);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (open && e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // post 또는 currentUserId가 바뀔 때 내부 상태를 동기화
  useEffect(() => {
    setIsLiked(Boolean(post?.likedBy?.includes?.(currentUserId)));
    setBookmarkCount(post?.bookmarkCount ?? 0);
    setViewCount(post?.clickCount ?? 0);
    try {
      const viewed = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
      setHasViewed(Boolean(post && viewed[post.postId]));
    } catch {
      setHasViewed(false);
    }
  }, [post, currentUserId]);

  // 모달이 열려있지 않거나 post가 없으면 렌더링 중단
  if (!open || !post) return null;

  const handleLike = (e) => {
    e?.stopPropagation();
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setBookmarkCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));
    // 부모 컴포넌트에 좋아요 토글 알림 (알림 생성은 부모에서 처리)
    onLike?.(post.postId, nextLiked, currentUserId);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  // FIXME: 글꼴 최신화 필요
  const fontClassFor = (f) => {
    switch (f) {
      case 'Dahaeng':
        return 'font-Dahaeng';
      case 'DongwhaTtobbok':
        return 'font-DongwhaTtobbok';
      case 'NotGothicButGoding':
        return 'font-NotGothicButGoding';
      case 'GaramYeonGeot':
        return 'font-GaramYeonGeot';
      default:
        return 'font-sans';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in-0"
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'relative bg-white w-full max-w-[400px] max-h-[90vh] overflow-y-auto',
          'rounded-lg shadow-xl',
          'animate-in zoom-in-95 duration-200'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Post-it */}
        <div
          className={cn(
            'p-6 pb-4 min-h-[300px] flex flex-col',
            colorClasses[post.color]
          )}
        >
          {/* 자기소개 */}
          <div className="flex-grow my-6">
            <p
              className={cn(
                'text-base leading-relaxed whitespace-pre-wrap',
                fontClassFor(post.font)
              )}
            >
              {post.introduction}
            </p>
          </div>

          {/* 북마크 버튼 */}
          <div className="flex items-center gap-2 pt-4 border-t border-current/20">
            <div className="flex justify-start gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-1.5 text-red-500',
                  isLiked && 'text-red-500'
                )}
                onClick={handleLike}
              >
                <Heart
                  className={cn(
                    'h-5 w-5',
                    isLiked && 'fill-current animate-heart-bounce'
                  )}
                />
                <span className="font-medium">{bookmarkCount}</span>
              </Button>
              <div className="flex items-center gap-1.5">
                <Eye className="h-5 w-5 text-brown-80" />
                <span className="text-sm font-regular text-brown-80">
                  {viewCount}
                </span>
              </div>
            </div>
            <span className="text-xs opacity-60 ml-auto">
              {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="pt-0 pb-6 px-6 space-y-4 bg-white">
          <h3 className="font-bold text-lg my-4">상세 정보</h3>
          <div className="space-y-3">
            {/* Basic Info */}
            <div className="flex items-center gap-1 text-sm">
              <User className="h-4 w-4 text-brown-80" />
              <span className="text-brown-80">이름:</span>
              <span className="ml-1 font-medium">
                {post.showName ? post.name : '비공개'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <VenusAndMars className="h-4 w-4 text-brown-80" />
              <span className="text-brown-80">성별:</span>
              <span className="ml-1 font-medium">
                {post?.sex
                  ? post.sex === 'MALE'
                    ? '남성'
                    : post.sex === 'FEMALE'
                    ? '여성'
                    : '기타'
                  : '비공개'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <GraduationCap className="h-4 w-4 text-brown-80" />
              <span className="text-brown-80">학과:</span>
              <span className="ml-1 font-medium">
                {post.showDepartment ? post.department : '비공개'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-brown-80" />
              <span className="text-brown-80">학년:</span>
              <span className="ml-1 font-medium">
                {post.showGrade ? `${post.grade}학년` : '비공개'}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-brown-80" />
              <span className="text-brown-80">나이:</span>
              <span className="ml-1 font-medium">
                {post.showBirth ? `${post.age}세` : '비공개'}
              </span>
            </div>

            {/* Contact Info */}
            {post.instagram && post.showInstagram && (
              <div className="flex items-center gap-1 text-sm">
                <Instagram className="h-4 w-4 text-brown-80" />
                <span className="text-brown-80">인스타:</span>
                <span className="ml-1 font-medium">@{post.instagram}</span>
              </div>
            )}

            {post.kakao && post.showKakao && (
              <div className="flex items-center gap-1 text-sm">
                <MessageCircle className="h-4 w-4 text-brown-80" />
                <span className="text-brown-80">카톡:</span>
                <span className="ml-1 font-medium">{post.kakao}</span>
              </div>
            )}

            {post.phone && post.showPhone && (
              <div className="flex items-center gap-1 text-sm">
                <Phone className="h-4 w-4 text-brown-80" />
                <span className="text-brown-80">전화번호:</span>
                <span className="ml-1 font-medium">{post.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
