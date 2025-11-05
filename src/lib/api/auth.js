import { apiGet, apiPost } from './client';

// 학번 중복 체크
export async function checkId(studentId) {
  if (!studentId) throw new Error('studentId is required');
  const res = await apiGet(
    `/join/checkId?studentId=${encodeURIComponent(studentId)}`
  );
  return res;
}

// payload: { name, studentId, grade, department, birthDate, sex, instagram, kakao, phone, password }
export async function register(payload) {
  if (!payload) throw new Error('payload is required');
  return apiPost('/join/register', payload);
}

// 세션 쿠키 기반 로그인
// credentials: { studentId, password }
export async function login(credentials) {
  if (!credentials?.studentId || !credentials?.password) {
    throw new Error('학번과 비밀번호는 필수입니다.');
  }
  return apiPost('/join/auth/login', credentials);
}

// 현재 로그인한 사용자 정보 조회
export async function currentUser() {
  // Expected to return something like { studentId, name, ... }
  return apiGet('/user');
}

const authApi = { checkId, register, login, currentUser };
export default authApi;
