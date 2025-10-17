import axios from 'axios';

// User 서비스용 axios 인스턴스 생성
const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users",
  headers: {
    "Content-Type": "application/json",  // 보내는 데이터 타입이 JSON
    "Accept": "application/json",  // 받는 데이터 타입이 JSON
  },
})

// axiosClient의 요청 인터셉터
axiosClient.interceptors.request.use(
  // 성공 시
  (config) => {
    console.log('요청 인터셉터 설정 성공:', config);
    config.headers["X-Custom-Header"] = "Hello World";
    return config;  // 수정된 요청 설정을 반환
  },
  // 실패 시
  (error) => {
    console.log('요청 인터셉터 설정 오류:', error);
    return Promise.reject(error);
  }
)

// axiosClient의 응답 인터셉터
axiosClient.interceptors.response.use(
  // 성공 시
  (response) => {
    console.log('응답 객체:', response);
    return response.data;  // 수정된 응답을 반환 (데이터를 꺼내서 반환)
  },
  // 실패 시
  (error) => {
    console.log('응답 인터셉터 설정 오류:', error);
    return Promise.reject(error);
  }
)


export default axiosClient;