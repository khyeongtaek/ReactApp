import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const baseUrl = `${API_SERVER_HOST}/api/boards`;

const boardAPI = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

boardAPI.interceptors.request.use(
    (config) => {
        console.log("API 요청: ", config.method.toUpperCase());
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


boardAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("API 응답 오류: ", error);

        if (error.response) {
            const {status, data} = error.response;
            throw new Error(`${status} : ${data.message}`);
        } else if (error.request) {
            throw new Error("서버의 응답이 없습니다.")
        } else {
            return new Error("알 수 없는 오류가 발생했습니다.")
        }
    }
);

export const createBoard = async (board) => {
    try {
        const response = await boardAPI.post("", board);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBoard = async (bid, board) => {
    try {
        const response = await boardAPI.put(`/${bid}`, board);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBoard = async (bid) => {
    try {
        const response = await boardAPI.delete(`/${bid}`);
        if (response.status === 204) {
            return "게시글 삭제 성공";
        }
    } catch (error) {
        throw error;
    }
};

export const getBoards = async (bid) => {
    try {
        const response = await boardAPI.get(`/${bid}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBoardList = async ({page = 1, size = 10, sort = "createdAt,DESC"}) => {
    try {
        const response = await boardAPI.get("", {
            params: {
                page,
                size,
                sort
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



