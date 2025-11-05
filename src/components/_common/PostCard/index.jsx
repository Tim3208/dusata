import { useState, useEffect } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const colorClasses = {
  Yellow: 'bg-yellow-100',
  Pink: 'bg-pink-100',
};

const PostCard = ({ post, currentUserId, onLike, onClick, onView }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarkCount || 0);
  const [hasViewed, setHasViewed] = useState(false);
  const [viewCount, setViewCount] = useState(post.clickCount);

  // 서버에서 갱신된 clickCount가 내려오면 카드 표시값도 동기화
  useEffect(() => {
    setViewCount(post.clickCount);
  }, [post.clickCount]);

  // 컴포넌트가 마운트될 때 localStorage에서 조회 여부 확인
  useEffect(() => {
    const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
    setHasViewed(!!viewedPosts[post.postId]);
  }, [post.postId]);

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setBookmarkCount(bookmarkCount + (newLikeStatus ? 1 : -1));
    onLike?.(post.postId, newLikeStatus);
  };

  const handleView = () => {
    if (!hasViewed) {
      const viewedPosts = JSON.parse(
        localStorage.getItem('viewedPosts') || '{}'
      );
      viewedPosts[post.postId] = true;
      localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));

      setHasViewed(true);
      setViewCount(viewCount + 1);
      onView?.(post.postId);
    }
    onClick?.();
  };

  const formatShortDate = (date) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getMonth() + 1}.${d.getDate()}`;
  };

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
    <Card
      className={cn(
        'aspect-square p-2 md:p-6 shadow-md transition-all duration-300',
        'hover:-translate-y-1 hover:rotate-0 cursor-pointer',
        'border-none flex flex-col',
        post.color ? colorClasses[post.color] : 'bg-yellow-100'
      )}
      onClick={handleView}
    >
      {/* Content - only bio */}
      <p
        className={cn(
          'text-sm md:text-2xl leading-relaxed mb-auto whitespace-pre-wrap line-clamp-4 flex-grow',
          fontClassFor(post?.font)
        )}
      >
        {post.introduction}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-current/20">
        <div className="flex items-center gap-4">
          <button
            className={cn(
              'flex items-center gap-1.5 transition-colors',
              isLiked && 'text-red-point'
            )}
            onClick={handleLike}
          >
            <Heart
              className={cn(
                'h-5 w-5 text-red-point',
                isLiked && 'fill-current animate-heart-bounce'
              )}
            />
            <span className="text-sm font-medium text-red-point">
              {bookmarkCount}
            </span>
          </button>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="h-5 w-5 text-brown-80" />
            <span className="text-sm font-regular text-brown-80">
              {viewCount}
            </span>
          </div>
        </div>
        <span className="text-xs opacity-60">
          {formatShortDate(post.createdAt)}
        </span>
      </div>
    </Card>
  );
};

export default PostCard;
