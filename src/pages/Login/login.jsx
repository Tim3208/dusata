
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";


export default function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!studentId || !password) {
      setError("학번과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/join/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          password,
        }),
      });

      if (!response.ok) {
        setError("로그인 실패! 학번 또는 비밀번호를 확인해주세요.");
        return;
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.token);

      alert("로그인 성공!");

      navigate("/create");

    } catch (err) {
      setError("서버 오류! 잠시 후 다시 시도해주세요.");
    }
  };


return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <p className={styles.title}>두사타</p>
        <p className={styles.subtitle}>삼육대학생 전용 멋사 부스 체험 페이지</p>

        <label className={styles.label}>학번</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className={styles.input}
          placeholder="2025000000"
        />

        <label className={styles.label}>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <button type="submit" className={styles.button}>로그인</button>
        </form>


        <p className={styles.registerText}>
          계정이 없으신가요?{" "}
          <a href="/register" className={styles.registerLink}>
            회원가입
          </a>
        </p>

        <div className={styles.noticeBox}>
          <strong>⚠ 유의사항</strong>
          <ul>
            <li>회원 개인정보는 철저히 암호화되어 관리됩니다.</li>
            <li>개인정보는 동아리 박람회 서비스 종료 후 일괄 폐기됩니다.</li>
            <li>로그인 관련 문의가 있으면 운영팀으로 연락해주시기 바랍니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

