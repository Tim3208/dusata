import React, { useState } from "react";
import "./mypage.css";
import MainLayOut from "@/layout/MainLayOut";
import PostCard from "@/components/_common/PostCard";
import PostDetailModal from "@/components/_common/PostDetailModal";
import { dummyPosts, dummyUsers } from "@/lib/dummyData";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 프로필 데이터
  const [profile, setProfile] = useState({
    name: "박정우",
    major: "컴퓨터공학과",
    year: "3학년",
    age: "24세",
    instagram: "@_tim3208_",
    phone: "010-1234-5678",
    kakao: "tim3208",
  });

  // 공개/비공개 설정
  const [visibility, setVisibility] = useState({
    name: true,
    major: true,
    year: true,
    age: false,
    instagram: true,
    phone: false,
    kakao: true,
  });

  // 내가 쓴 포스트 / 내가 찜한 포스트
  const [myPosts] = useState(dummyPosts.slice(0, 6));
  const [likedPosts] = useState(dummyPosts.slice(6, 12));
  const [activeTab, setActiveTab] = useState("myPosts");

  const handleEditClick = () => setIsEditing(!isEditing);
  const toggleVisibility = (field) =>
    setVisibility({ ...visibility, [field]: !visibility[field] });
  const handleChange = (e, field) =>
    setProfile({ ...profile, [field]: e.target.value });

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <MainLayOut>
      <div className="MyPage_body0">
        {/* 🔹 프로필 카드 */}
        <div className={isEditing ? "Mypage_edit_container" : "MyPage_container"}>
          <div className="MyPage_header">
            <div className="Mypage_header_text">
              <div className="Mypage_header_name">{profile.name}</div>
              <div className="Mypage_header_nick">@_tim3208_</div>
            </div>
            <button
              className={`Mypage_header_editBtn ${isEditing ? "editing" : ""}`}
              onClick={handleEditClick}
            >
              {isEditing ? "저장" : "프로필 수정"}
            </button>
          </div>

          <div className="MyPage_body">
            {!isEditing ? (
              <>
                <div className="MyPage_info_row">
                  {visibility.name && (
                    <>
                      <div className="MyPage_info_label">이름</div>
                      <div className="MyPage_info_value">{profile.name}</div>
                    </>
                  )}
                  {visibility.major && (
                    <>
                      <div className="MyPage_info_label">학과</div>
                      <div className="MyPage_info_value">{profile.major}</div>
                    </>
                  )}
                </div>

                <div className="MyPage_info_row">
                  {visibility.year && (
                    <>
                      <div className="MyPage_info_label">학년</div>
                      <div className="MyPage_info_value">{profile.year}</div>
                    </>
                  )}
                  {visibility.age && (
                    <>
                      <div className="MyPage_info_label">나이</div>
                      <div className="MyPage_info_value">{profile.age}</div>
                    </>
                  )}
                </div>

                <hr />
                <div className="MyPage_contact_header">연락처</div>
                <div className="MyPage_info_column">
                  {visibility.instagram && (
                    <div className="MyPage_info_row">
                      <div className="MyPage_info_label">인스타그램</div>
                      <div className="MyPage_info_value">
                        {profile.instagram}
                      </div>
                    </div>
                  )}
                  {visibility.phone && (
                    <div className="MyPage_info_row">
                      <div className="MyPage_info_label">전화번호</div>
                      <div className="MyPage_info_value">{profile.phone}</div>
                    </div>
                  )}
                  {visibility.kakao && (
                    <div className="MyPage_info_row">
                      <div className="MyPage_info_label">카카오톡</div>
                      <div className="MyPage_info_value">{profile.kakao}</div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="MyPage_edit_column">
                {[
                  ["이름", "name"],
                  ["학과", "major"],
                  ["학년", "year"],
                  ["나이", "age"],
                ].map(([label, key]) => (
                  <label key={key} className="MyPage_input_row">
                    {label}
                    <div className="MyPage_input_with_toggle">
                      <input
                        type="text"
                        value={profile[key]}
                        onChange={(e) => handleChange(e, key)}
                      />
                      <div
                        className={`toggle-switch ${
                          visibility[key] ? "on" : "off"
                        }`}
                        onClick={() => toggleVisibility(key)}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                      <span className="toggle-text">
                        {visibility[key] ? "공개" : "비공개"}
                      </span>
                    </div>
                  </label>
                ))}

                <hr />
                <div className="MyPage_contact_header">연락처</div>

                {[
                  ["인스타그램", "instagram"],
                  ["전화번호", "phone"],
                  ["카카오톡", "kakao"],
                ].map(([label, key]) => (
                  <label key={key} className="MyPage_input_row">
                    {label}
                    <div className="MyPage_input_with_toggle">
                      <input
                        type="text"
                        value={profile[key]}
                        onChange={(e) => handleChange(e, key)}
                      />
                      <div
                        className={`toggle-switch ${
                          visibility[key] ? "on" : "off"
                        }`}
                        onClick={() => toggleVisibility(key)}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                      <span className="toggle-text">
                        {visibility[key] ? "공개" : "비공개"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🔹 버튼 영역 */}
        <div className="MyPage_tab_buttons">
          <button
            className={`MyPage_tab_btn ${
              activeTab === "myPosts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("myPosts")}
          >
            내 포스트잇
          </button>
          <button
            className={`MyPage_tab_btn ${
              activeTab === "likedPosts" ? "active" : ""
            }`}
            onClick={() => setActiveTab("likedPosts")}
          >
            찜한 포스트잇
          </button>
        </div>

        {/* 🔹 포스트잇 영역 */}
        <section className="MyPage_post_section">
          <div className="MyPage_post_grid">
            {(activeTab === "myPosts" ? myPosts : likedPosts).map((post) => (
              <div key={post.postId} className="post_item">
                <PostCard
                  post={post}
                  currentUserId={dummyUsers.studentId}
                  onClick={() => handlePostClick(post)}
                />
              </div>
            ))}
          </div>
        </section>

        <PostDetailModal
          post={selectedPost}
          currentUserId={dummyUsers.studentId}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </MainLayOut>
  );
};

export default MyPage;
