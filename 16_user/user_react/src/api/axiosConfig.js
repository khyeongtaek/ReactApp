/**
 * axios 전역 설정 파일
 */ 
import axios from "axios";
import CookieUtils from "../utils/cookies";
import store from "../store";
import { logout } from "../slices/authSlice";

//----- 요청 인터셉터
// accessToken 쿠키를 가져와서 Authorization 헤더에 포함
axios.interceptors.request.use(
  // 요청 성공 시
  (config) => {
    // accessToken 쿠키 가져오기
    const accessToken = CookieUtils.get("accessToken");

    // accessToken 쿠키가 있으면 Authorization 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 요청 설정 반환
    return config;
  },
  // 요청 실패 시
  (error) => {
    console.error("요청 실패:", error);
    return Promise.reject(error);
  }
)

//----- 응답 인터셉터
// 401 Unauthorized 발생 시 강제로 로그아웃
axios.interceptors.response.use(
  // 응답 성공 시
  (response) => {
    return response;
  },
  // 응답 실패 시
  (error) => {
    // 토큰이 만료되거나, 유효하지 않은 경우 401 예외 발생
    if (error.response?.status === 401) {
      // 로그아웃
      store.dispatch(logout());
      // 로그인 페이지로 이동
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)

// default export
export default axios;