import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePage.css";
import MainLayOut from "@/layout/MainLayOut";

const colors = ["#FFF59D", "#F8BBD0"];
const fonts = [
  "memomentKkukkkuk",
  "온글잎 콘콘체",
  "SandollSamlipHobbangBasic",
  "GowunDodum-Regular",
];

const CreatePage = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState(colors[0]);
  const [font, setFont] = useState(fonts[0]);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return alert("내용을 입력해주세요!");

    try {
      setIsSubmitting(true);
      const requestBody = {
        font,
        color,
        content: text.trim(),
      };

      const response = await axios.post(
        "http://localhost:8080/api/posts",
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("게시글이 성공적으로 등록되었습니다!");
        navigate("/");
      } else {
        throw new Error("서버 응답이 성공이 아닙니다.");
      }
    } catch (error) {
      console.error("게시 실패:", error);
      alert("게시 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setText("");
    setColor(colors[0]);
    setFont(fonts[0]);
    navigate("/");
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
                        c === color ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow:
                        c === color ? "0px 4px 4px #00000040" : "none",
                    }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>

            <div className="Create_font_group" style={{ alignItems: "flex-end" }}>
              <div className="Create_font" style={{ textAlign: "right", width: "100%" }}>
                글꼴
              </div>
              <div className="Create_buttons" style={{ justifyContent: "flex-end" }}>
                {fonts.map((f, idx) => (
                  <button
                    key={f}
                    style={{
                      backgroundColor: f === font ? "#FFEE8E" : "#FFFFFF",
                      border:
                        f === font ? "2px solid #2B1E1C" : "1px solid gray",
                      boxShadow:
                        f === font ? "0px 4px 4px #00000040" : "none",
                      fontFamily: f,
                      fontWeight: f === font ? "bold" : "normal",
                      fontSize: "18px",
                      padding: "8px 14px",
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
                backgroundColor: text.trim() ? "#FFCBFA" : "#FAD5F2",
                color: text.trim() ? "#2B1E1C" : "#7C6F61",
                cursor: text.trim() ? "pointer" : "not-allowed",
              }}
            >
              {isSubmitting ? "게시 중..." : "게시하기"}
            </button>
          </div>
        </div>
      </div>
    </MainLayOut>
  );
};

export default CreatePage;