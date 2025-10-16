import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/users',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

axiosClient.interceptors.request.use(
    config => {
        console.log('요청 인터셉터 설정 성공', config);
        return config;
    },
    error => {
        console.log('요청 인터셉터 설정 오류', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    response => {
        console.log('응답 객체: ', response);
        return response.data;
    },
    error => {
        console.log('응답 인터셉터 설정 오류: ', error);
        return Promise.reject(error);
    }
)

export default axiosClient;