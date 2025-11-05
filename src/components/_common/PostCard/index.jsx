import { useState, useEffect } from "react";
import { Heart, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const colorClasses = {
  yellow: "bg-yellow-100",
  pink: "bg-pink-100",
};

const PostCard = ({ post, currentUserId, onLike, onClick, onView }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [hasViewed, setHasViewed] = useState(false);
  const [viewCount, setViewCount] = useState(post.clickCount);

  // 컴포넌트가 마운트될 때 localStorage에서 조회 여부 확인
  useEffect(() => {
    const viewedPosts = JSON.parse(localStorage.getItem("viewedPosts") || "{}");
    setHasViewed(!!viewedPosts[post.postId]);
  }, [post.postId]);

  const handleLike = (e) => {
    e.stopPropagation();
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(likeCount + (newLikeStatus ? 1 : -1));
    onLike?.(post.postId, newLikeStatus);
  };

  const handleView = () => {
    if (!hasViewed) {
      const viewedPosts = JSON.parse(
        localStorage.getItem("viewedPosts") || "{}"
      );
      viewedPosts[post.postId] = true;
      localStorage.setItem("viewedPosts", JSON.stringify(viewedPosts));

      setHasViewed(true);
      setViewCount(viewCount + 1);
      onView?.(post.postId);
    }
    onClick?.();
  };

  const formatShortDate = (date) => {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getMonth() + 1}.${d.getDate()}`;
  };

  return (
    <Card
      className={cn(
        "aspect-square p-2 md:p-6 shadow-md transition-all duration-300",
        "hover:-translate-y-1 hover:rotate-0 cursor-pointer",
        "border-none flex flex-col",
        colorClasses[post.color]
      )}
      onClick={handleView}
    >
      {/* Content - only bio */}
      <p className="text-sm md:text-base leading-relaxed mb-auto whitespace-pre-wrap line-clamp-4 flex-grow">
        {post.introduction}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-current/20">
        <div className="flex items-center gap-4">
          <button
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              isLiked && "text-red-point"
            )}
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-5 w-5 text-red-point",
                isLiked && "fill-current animate-heart-bounce"
              )}
            />
            <span className="text-sm font-medium text-red-point">
              {likeCount}
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
