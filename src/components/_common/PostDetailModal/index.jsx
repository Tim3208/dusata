import { useState } from "react";
import {
  X,
  Heart,
  User,
  GraduationCap,
  Calendar,
  Instagram,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const colorClasses = {
  yellow: "bg-yellow-100",
  pink: "bg-pink-100",
};

export function PostDetailModal({
  post,
  currentUserId,
  open,
  onOpenChange,
  onLike,
}) {
  const [isLiked, setIsLiked] = useState(
    post?.likedBy.includes(currentUserId) ?? false
  );
  const [likes, setLikes] = useState(post?.likes ?? 0);

  if (!post) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const getInitials = (name) => {
    return name.charAt(0);
  };

  const { author } = post;
  const { privacySettings } = author;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Post-it style header */}
        <div className={cn("p-6 pb-4", colorClasses[post.color])}>
          <DialogHeader>
            <DialogTitle className="sr-only">포스트 상세</DialogTitle>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-current">
                  <AvatarFallback className="text-lg font-bold">
                    {getInitials(author.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-lg">
                    {privacySettings.showName ? author.displayName : "익명"}
                  </p>
                  <p className="text-sm opacity-70">
                    {author.gender === "male" ? "남성" : "여성"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {/* Bio */}
          <div className="mt-4">
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Like button */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-current/20">
            <Button
              variant="ghost"
              size="sm"
              className={cn("gap-1.5", isLiked && "text-red-500")}
              onClick={handleLike}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isLiked && "fill-current animate-heart-bounce"
                )}
              />
              <span className="font-medium">{likes}</span>
            </Button>
            <span className="text-xs opacity-60 ml-auto">
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Detailed info section */}
        <div className="p-6 space-y-4 bg-background">
          <h3 className="font-bold text-lg mb-4">상세 정보</h3>

          <div className="space-y-3">
            {/* Basic Info */}
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">이름:</span>
              <span className="font-medium">
                {privacySettings.showName ? author.displayName : "비공개"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">학과:</span>
              <span className="font-medium">
                {privacySettings.showMajor ? author.major : "비공개"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">학년:</span>
              <span className="font-medium">
                {privacySettings.showYear ? `${author.year}학년` : "비공개"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">나이:</span>
              <span className="font-medium">
                {privacySettings.showAge ? `${author.age}세` : "비공개"}
              </span>
            </div>

            {/* Contact Info */}
            {author.instagramId && (
              <div className="flex items-center gap-3 text-sm">
                <Instagram className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">인스타:</span>
                <span className="font-medium">@{author.instagramId}</span>
              </div>
            )}

            {author.kakaoId && (
              <div className="flex items-center gap-3 text-sm">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">카톡:</span>
                <span className="font-medium">{author.kakaoId}</span>
              </div>
            )}

            {author.phoneNumber && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">전화번호:</span>
                <span className="font-medium">{author.phoneNumber}</span>
              </div>
            )}

            {author.bio && (
              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground mb-2">자기소개</p>
                <p className="text-sm leading-relaxed">{author.bio}</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-accent hover:bg-accent/90">
              관심 표시하기
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              신고하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
