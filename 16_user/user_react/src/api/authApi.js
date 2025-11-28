import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/auth";

const authAPI = {

  //----- 회원가입
  // userData: {"email": "", "password": "", "nickname": ""}
  register: (userData) => {
    return axios.post(`${BASE_URL}/register`, userData);
  },

  //----- 로그인
  // credentials: {"email": "", "password": ""}
  login: (credentials) => {
    return axios.post(`${BASE_URL}/authenticate`, credentials);
  },

  //----- 로그아웃 (서버 요청은 선택사항)
  logout: () => {
    return axios.post(`${BASE_URL}/logout`);
  }

}

export default authAPI;