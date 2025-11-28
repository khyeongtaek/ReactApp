import { useSelector, useDispatch } from "react-redux";
import { loginUserAction, registerUserAction, logout, clearError } from "../slices/authSlice";
import store from "../store";

export const useAuth = () => {
  // dispatch 가져오기 (액션 실행을 위함)
  const dispatch = useDispatch();

  // store가 관리하는 상태 가져오기
  const { loginUser, isAuthenticated, isLoading, error } = useSelector(state => state.auth);  // store의 reducer중 auth: authReducer를 선택

  /**
   * 로그인 함수
   * 
   * @param { object } credentials - email/password로 구성된 사용자 인증 정보
   * @returns 서버가 반환한 응답 데이터
  */
  const login = async (credentials) => {
    //----- 코드 이해하기
    // 1. dispatch()를 이용해 loginUserAction(credentials) 액션 함수를 호출합니다.
    // 2. loginUserAction(credentials) 액션 함수 반환은
    //    "return response.data;" 
    //    즉 서버의 응답 데이터({"accessToken": "...", "email": "..."})로 되어 있으나 실제로는 Promise로 Wrapping하여 반환합니다.
    //   - dispatch(loginUserAction(credentials)) 결과 예시
    //   Promise {
    //     arg: {email: "user@example.com", password: "1111"},
    //     PromiseResult: {
    //       meta: { arg: credentials, requestId: "abc123", requestStatus: "fulfilled" }
    //       payload: { email: "user@example.com", nickname: "닉네임", accessToken: "..." },
    //       type: "auth/login/fulfilled"
    //     },
    //   }
    // 3. await 키워드는 PromiseResult를 반환합니다.
    //    - await dispatch(loginUserAction(credentials)) 결과 예시
    //    {
    //      meta: { arg: credentials, requestId: "abc123", requestStatus: "fulfilled" }
    //      payload: { email: "user@example.com", nickname: "닉네임", accessToken: "..." },
    //      type: "auth/login/fulfilled"
    //    }
    // 4. unwrap() 함수는 payload를 반환합니다.
    //    - await dispatch(loginUserAction(credentials)).unwrap() 결과 예시
    //    { 
    //      email: "user@example.com", 
    //      nickname: "닉네임", 
    //      accessToken: "...",
    //    }

    // 로그인 수행 후 서버의 응답 데이터 받아오기
    const result = await dispatch(loginUserAction(credentials)).unwrap();
  
    // 서버의 응답 데이터 확인 (디버깅용)
    console.log("로그인 결과 확인");
    console.log(result);

    // 상태 확인 (디버깅용)
    const state = store.getState();
    console.log("store 상태 확인");
    console.log(state.auth);
    
    // 서버의 응답 데이터 반환
    return result;
  };
  
  /**
   * 회원가입
   * 
   * @param { object } userData - email/password/nickname으로 구성된 사용자 가입 정보
   * @returns 서버가 반환한 응답 데이터
   */
  const register = async (userData) => {
    // 회원가입 후 서버의 응답 데이터 받아오기
    const result = await dispatch(registerUserAction(userData)).unwrap();
    
    // 서버의 응답 데이터 확인 (디버깅용)
    // { email: "user@example.com", nickname: "닉네임", accessToken: "..." }
    console.log(result);
  
    // 서버의 응답 데이터 반환
    return result;
  };

  /**
   * 로그아웃 함수
   */
  const handleLogout = () => {
    dispatch(logout());
  };

  /**
   * 에러 메시지 초기화 함수
   */
  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    // 상태 반환
    loginUser,
    isAuthenticated,
    isLoading,
    error,
    // 함수 반환
    login,
    register,
    logout: handleLogout,
    clearError: handleClearError,
  };
  
};
