import { apiGet, apiPost } from "./client";
import { dummyPosts } from "@/lib/dummyData";

// Map server post -> app post shape with safe fallbacks
const mapPost = (p) => ({
  postId: p.postId ?? p.id,
  name: p.name ?? p.userName ?? "",
  sex: p.sex ?? p.gender ?? "",
  department: p.department ?? p.dept ?? "",
  grade: p.grade ?? p.year ?? null,
  age: p.age ?? null,
  instagram: p.instagram ?? "",
  kakao: p.kakao ?? p.kakaoId ?? "",
  phone: p.phone ?? "",
  font: p.font ?? "Dahaeng",
  color: p.color ?? "yellow",
  introduction: p.introduction ?? p.content ?? "",
  bookmarkCount: p.bookmarkCount ?? p.bookmarks ?? 0,
  clickCount: p.clickCount ?? p.views ?? 0,
  createdAt: p.createdAt ?? p.created_at ?? new Date().toISOString(),
  updatedAt:
    p.updatedAt ?? p.updated_at ?? p.createdAt ?? new Date().toISOString(),
  likedBy: p.likedBy ?? p.liked_by ?? [],
  studentId: p.studentId ?? p.userId ?? "",
});

export async function list() {
  try {
    const data = await apiGet("/posts");
    const list = Array.isArray(data?.posts)
      ? data.posts
      : Array.isArray(data)
      ? data
      : [];
    return list.map(mapPost);
  } catch (err) {
    console.warn("[posts] falling back to dummy data:", err?.message || err);
    return dummyPosts.map(mapPost);
  }
}

export async function create(payload) {
  // payload expected: { content, font, color }
  const data = await apiPost("/posts", payload);
  // Some APIs return created resource; if so, map it; else, return minimal merged object
  if (data && (data.id || data.postId || data.content || data.introduction)) {
    return mapPost(data);
  }
  return { ...payload };
}

const postsApi = { list, create };
export default postsApi;
