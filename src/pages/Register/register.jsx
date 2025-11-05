import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

export default function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentId: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    major: "",
    grade: "",
    birth: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // 입력 시 기존 에러 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 항목 체크
    if (
      !form.studentId ||
      !form.password ||
      !form.confirmPassword ||
      !form.name ||
      !form.gender ||
      !form.major ||
      !form.grade ||
      !form.birth
    ) {
      setError("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 학번 중복체크
      const checkId = await fetch("/api/join/checkId?studentId=" + form.studentId);
      const checkResult = await checkId.json();

      if (!checkResult.available) {
        setError("이미 사용 중인 학번입니다.");
        return;
      }

      // 회원가입 API 호출
      const res = await fetch("/api/join/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          studentId: form.studentId,
          grade: Number(form.grade),
          department: form.major,
          birthDate: form.birth,
          sex:
            form.gender === "male"
              ? "MALE"
              : form.gender === "female"
              ? "FEMALE"
              : "ETC",
          instagram: "",
          kakao: "",
          phone: "",
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log(data);

      alert("회원가입 완료!");
      navigate("/login"); // 회원가입 후 로그인 페이지 이동
    } catch (err) {
      console.error(err);
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <p className={styles.title}>두사타</p>
        <p className={styles.subtitle}>회원가입</p>

        <label className={styles.label}>학번</label>
        <input
          type="text"
          name="studentId"
          className={styles.input}
          onChange={handleChange}
        />

        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          name="password"
          className={styles.input}
          onChange={handleChange}
        />

        <label className={styles.label}>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          className={styles.input}
          onChange={handleChange}
        />

        <label className={styles.label}>이름</label>
        <input
          type="text"
          name="name"
          className={styles.input}
          onChange={handleChange}
        />

        <label className={styles.label}>성별</label>
        <select name="gender" className={styles.select} onChange={handleChange}>
          <option value="" >
            성별 선택
          </option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>

        <label className={styles.label}>학과</label>
        <select name="major" className={styles.select} onChange={handleChange}>
          <option value="" >
            학과 선택
          </option>
          <option value="1">건축학과(4년제)</option>
          <option value="2">건축학과(5년제)</option>
          <option value="3">경영학과</option>
          <option value="4">글로벌한국학과</option>
          <option value="5">컴퓨터공학부</option>
          <option value="6">데이터클라우드공학과</option>
          <option value="7">동물자원과학과</option>
          <option value="8">환경디자인원예학과</option>
          <option value="9">바이오융합공학과</option>
          <option value="10">상담심리학과</option>
          <option value="11">사회복지학과</option>
          <option value="12">식품영양학과</option>
          <option value="13">신학과</option>
          <option value="14">아트앤디자인학과</option>
          <option value="15">음악학과</option>
          <option value="16">인공지능융합학부</option>
          <option value="17">자유전공학부</option>
          <option value="18">체육학과</option>
          <option value="19">화학생명과학과</option>
          <option value="20">간호학과</option>
          <option value="21">물리치료학과</option>
          <option value="22">약학과</option>
          <option value="23">유아교육과</option>
          <option value="24">항공관광외국어학부</option>
          <option value="25">영어영문학과</option>
          <option value="26">보건관리학과</option>
          <option value="27">기타</option>
        </select>

        <label className={styles.label}>학년</label>
        <select name="grade" className={styles.select} onChange={handleChange}>
          <option value="" >
            학년 선택
          </option>
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
          <option value="4">4학년</option>
          <option value="5">5학년</option>
          <option value="6">6학년</option>
        </select>

        <label className={styles.label}>생년월일</label>
        <input
          type="date"
          name="birth"
          className={styles.input}
          onChange={handleChange}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          회원가입
        </button>

        <p className={styles.loginText}>
          이미 계정이 있으신가요? <span className={styles.loginLink} onClick={() => navigate("/login")}>로그인</span>
        </p>
      </form>
    </div>
  );
}

