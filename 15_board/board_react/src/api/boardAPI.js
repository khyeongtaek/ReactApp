import axios from 'axios';

const API_SERVER_HOST = 'http://localhost:8080';
const baseURL = `${API_SERVER_HOST}/api/boards`;

// axios 인스턴스 생성
const boardAPI = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  }
})

// 요청 인터셉터
boardAPI.interceptors.request.use(
  (config) => {
    // 필요시 config 작업 수행
    console.log("API 요청:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 응답 인터셉터
boardAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API 응답 오류:", error);
    
    // 서버로부터 응답이 도착했으나 상태코드가 에러인 상태
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`${data.message}(${status})`);
    }
    // 서버로 요청하였으나 응답이 없는 상태
    else if (error.request) {
      throw new Error("서버의 응답이 없습니다.");
    }
    // 기타
    else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
)

// 게시글 등록
export const createBoard = async (board) => {
  try {
    const response = await boardAPI.post("", board);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 수정
export const updateBoard = async (bid, board) => {
  try {
    const response = await boardAPI.put(`/${bid}`, board);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 삭제
export const deleteBoard = async (bid) => {
  try {
    const response = await boardAPI.delete(`/${bid}`);

    // DELETE 요청의 경우 204 No Content 응답이 올 수 있습니다. 응답이 오지 않는다는 의미입니다.
    if (response.status === 204) {
      return {
        status: 204,
        message: "게시글 삭제 성공",
      }
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 상세 조회
export const getBoard = async (bid) => {
  try {
    const response = await boardAPI.get(`/${bid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 목록 조회
export const getBoardList = async (pageParams) => {
  const { page = 1, size = 10, sort = "createdAt,desc" } = pageParams;

  try {
    const response = await boardAPI.get("", {
      params: { page, size, sort }  // 쿼리 스트링으로 데이터 전송
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}