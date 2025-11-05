import { useState } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const colorClasses = {
  yellow: "bg-yellow-100",
  pink: "bg-pink-100",
};

export function PostCard({ post, currentUserId, onLike, onClick }) {
  const [isLiked, setIsLiked] = useState(post.likedBy.includes(currentUserId));
  const [likes, setLikes] = useState(post.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  return (
    <Card
      className={cn(
        "p-6 shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:rotate-0 cursor-pointer",
        "border-none",
        colorClasses[post.color]
      )}
      onClick={onClick}
    >
      {/* Content - only bio */}
      <p className="text-base leading-relaxed mb-6 whitespace-pre-wrap line-clamp-4 min-h-[80px]">
        {post.content}
      </p>

      {/* Footer - only like count */}
      <div className="flex items-center justify-between pt-4 border-t border-current/20">
        <button
          className={cn(
            "flex items-center gap-1.5 transition-colors",
            isLiked && "text-red-point"
          )}
          onClick={handleLike}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isLiked && "fill-current animate-heart-bounce"
            )}
          />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <span className="text-xs opacity-60">
          {new Date(post.createdAt).toLocaleDateString("ko-KR", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </Card>
  );
}
