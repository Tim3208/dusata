import React, { useState } from 'react';
import './mypage.css';

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  //  프로필 데이터 상태
  const [profile, setProfile] = useState({
    name: '박정우',
    major: '컴퓨터공학과',
    year: '3학년',
    age: '24세',
    instagram: '@_tim3208_',
    phone: '010-1234-5678',
    kakao: 'tim3208',
  });

  //  각 항목의 공개/비공개 상태
  const [visibility, setVisibility] = useState({
    name: true,
    major: true,
    year: true,
    age: false,
    instagram: true,
    phone: false,
    kakao: true,
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const toggleVisibility = (field) => {
    setVisibility({ ...visibility, [field]: !visibility[field] });
  };

  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  return (
    <div className="MyPage_body0">
      <div className={isEditing ? 'Mypage_edit_container' : 'MyPage_container'}>
        <div className="MyPage_header">
          <div className="Mypage_header_text">
            <div className="Mypage_header_name">{profile.name}</div>
            <div className="Mypage_header_nick">@_tim3208_</div>
          </div>
          <button
            className={`Mypage_header_editBtn ${isEditing ? 'editing' : ''}`}
            onClick={handleEditClick}
          >
            {isEditing ? '저장' : '프로필 수정'}
          </button>
        </div>

        <div className="MyPage_body">
          {!isEditing ? (
            <>
              {/*  보기 모드 (공개 항목만 표시) */}
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
                    <div className="MyPage_info_value">{profile.instagram}</div>
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
            <>
              {/*  수정 모드 */}
              <div className="MyPage_edit_column">
                {[
                  ['이름', 'name'],
                  ['학과', 'major'],
                  ['학년', 'year'],
                  ['나이', 'age'],
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
                          visibility[key] ? 'on' : 'off'
                        }`}
                        onClick={() => toggleVisibility(key)}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                      <span className="toggle-text">
                        {visibility[key] ? '공개' : '비공개'}
                      </span>
                    </div>
                  </label>
                ))}

                <hr />

                <div className="MyPage_contact_header">연락처</div>

                {[
                  ['인스타그램', 'instagram'],
                  ['전화번호', 'phone'],
                  ['카카오톡', 'kakao'],
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
                          visibility[key] ? 'on' : 'off'
                        }`}
                        onClick={() => toggleVisibility(key)}
                      >
                        <div className="toggle-circle"></div>
                      </div>
                      <span className="toggle-text">
                        {visibility[key] ? '공개' : '비공개'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
