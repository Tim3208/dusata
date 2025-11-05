<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePage.css';
import MainLayOut from '@/layout/MainLayOut';
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePage.css";
import MainLayOut from "@/layout/MainLayOut";
import postsApi from "@/lib/api/posts";
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13

const colors = ['#FFF59D', '#F8BBD0'];
const fonts = [
  'memomentKkukkkuk',
  '온글잎 콘콘체',
  'SandollSamlipHobbangBasic',
  'GowunDodum-Regular',
];

export default function CreatePage() {
  const navigate = useNavigate();
  const [color, setColor] = useState(colors[0]);
  const [font, setFont] = useState(fonts[0]);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return alert('내용을 입력해주세요!');

    try {
      setIsSubmitting(true);
      const requestBody = {
        font,
        color,
        content: text.trim(),
      };

<<<<<<< HEAD
      const response = await axios.post(
        'http://localhost:8080/api/posts',
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('게시글이 성공적으로 등록되었습니다!');
        navigate('/');
      } else {
        throw new Error('서버 응답이 성공이 아닙니다.');
      }
    } catch (error) {
      console.error('게시 실패:', error);
      alert('게시 중 오류가 발생했습니다.');
=======
      await postsApi.create(requestBody);
      alert("게시글이 성공적으로 등록되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("게시 실패:", error);
      const msg = String(error?.message || "");
      if (msg.includes(" 401 ") || msg.toLowerCase().includes("unauthorized")) {
        const go = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동할까요?");
        if (go) navigate("/login", { replace: true, state: { from: "/create" } });
        return;
      }
      alert("게시 중 오류가 발생했습니다.");
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setColor(colors[0]);
    setFont(fonts[0]);
    navigate('/');
  };

  return (
    <MainLayOut>
      <div className="Create_body0">
        <div className="Create_container">
          <div className="Create_header">새 포스트잇 작성</div>

          <div className="Create_select">
            <div className="Create_color_group">
              <div className="Create_color">포스트잇 색상</div>
              <div className="Create_buttons">
                {colors.map((c) => (
                  <button
                    key={c}
                    style={{
                      backgroundColor: c,
                      border:
<<<<<<< HEAD
                        c === color ? '2px solid #2B1E1C' : '1px solid gray',
                      boxShadow: c === color ? '0px 4px 4px #00000040' : 'none',
=======
                        c === color ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow: c === color ? "0px 4px 4px #00000040" : "none",
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
                    }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div
              className="Create_font_group"
<<<<<<< HEAD
              style={{ alignItems: 'flex-end' }}
            >
              <div
                className="Create_font"
                style={{ textAlign: 'right', width: '100%' }}
=======
              style={{ alignItems: "flex-end" }}
            >
              <div
                className="Create_font"
                style={{ textAlign: "right", width: "100%" }}
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
              >
                글꼴
              </div>
              <div
                className="Create_buttons"
<<<<<<< HEAD
                style={{ justifyContent: 'flex-end' }}
=======
                style={{ justifyContent: "flex-end" }}
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
              >
                {fonts.map((f, idx) => (
                  <button
                    key={f}
                    style={{
                      backgroundColor: f === font ? '#FFEE8E' : '#FFFFFF',
                      border:
<<<<<<< HEAD
                        f === font ? '2px solid #2B1E1C' : '1px solid gray',
                      boxShadow: f === font ? '0px 4px 4px #00000040' : 'none',
=======
                        f === font ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow: f === font ? "0px 4px 4px #00000040" : "none",
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
                      fontFamily: f,
                      fontWeight: f === font ? 'bold' : 'normal',
                      fontSize: '18px',
                      padding: '8px 14px',
                    }}
                    onClick={() => setFont(f)}
                  >
                    {String.fromCharCode(65 + idx)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="Create_preview">
            <div className="Create_post">미리보기</div>
            <textarea
              className="Create_textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="자유롭게 자신을 어필해보세요!"
              style={{
                backgroundColor: color,
                fontFamily: font,
              }}
            />
          </div>

          <div className="Create_button">
            <button className="Create_cancel" onClick={handleCancel}>
              취소
            </button>
            <button
              className="Create_complete"
              onClick={handleSubmit}
              disabled={!text.trim() || isSubmitting}
              style={{
                backgroundColor: text.trim() ? '#FFCBFA' : '#FAD5F2',
                color: text.trim() ? '#2B1E1C' : '#7C6F61',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              {isSubmitting ? '게시 중...' : '게시하기'}
            </button>
          </div>
        </div>
      </div>
    </MainLayOut>
  );
<<<<<<< HEAD
}
=======
};

export default CreatePage;
>>>>>>> fea88c00166a504d811bd9a45353d5bbb5688a13
