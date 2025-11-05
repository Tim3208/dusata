import React, { useState } from "react";
import "./CreatePage.css";
import MainLayOut from "@/layout/MainLayOut";

const colors = ["#FFF59D", "#F8BBD0"];
const fonts = ["Pretendard", "Nanum Gothic", "Arial", "Times New Roman"];

const CreatePage = () => {
  const [color, setColor] = useState(colors[0]);
  const [font, setFont] = useState(fonts[0]);
  const [text, setText] = useState("");

  return (
    <MainLayOut>
      <div className="Create_body0">
        <div className="Create_container">
          {/* 제목 */}
          <div className="Create_header">새 포스트잇 작성</div>

          {/* 색상 / 글꼴 선택 */}
          <div className="Create_select">
            {/* 왼쪽: 포스트잇 색상 */}
            <div className="Create_color_group">
              <div className="Create_color">포스트잇 색상</div>
              <div className="Create_buttons">
                {colors.map((c) => (
                  <button
                    key={c}
                    style={{
                      backgroundColor: c,
                      border: c === color ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow: c === color ? "0px 4px 4px #00000040" : "none",
                    }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            {/* 오른쪽: 글꼴 */}
            <div className="Create_font_group">
              <div className="Create_font">글꼴</div>
              <div className="Create_buttons">
                {fonts.map((f, idx) => (
                  <button
                    key={f}
                    style={{
                      backgroundColor: f === font ? "#FFEE8E" : "#FFFFFF",
                      border: f === font ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow: f === font ? "0px 4px 4px #00000040" : "none",
                      fontFamily: f,
                      fontWeight: f === font ? "bold" : "normal",
                    }}
                    onClick={() => setFont(f)}
                  >
                    {["A", "B", "C", "D"][idx]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 미리보기 */}
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

          {/* 버튼 */}
          <div className="Create_button">
            <button
              className="Create_cancel"
              onClick={() => {
                setText("");
                setColor(colors[0]);
                setFont(fonts[0]);
              }}
            >
              취소
            </button>
            <button
              className="Create_complete"
              style={{
                backgroundColor: text.trim() ? "#FFCBFA" : "#FAD5F2",
                color: text.trim() ? "#2B1E1C" : "#7C6F61",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
              disabled={!text.trim()}
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </MainLayOut>
  );
};

export default CreatePage;
