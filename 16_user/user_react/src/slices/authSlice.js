import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../api/authAPI";
import CookieUtils from "../utils/cookies";

//----- 쿠키 이름은 accessToken입니다.



//----- 비동기 액션
/**
 * 회원가입 비동기 액션
 * 
 * 회원가입 후 JWT 토큰을 쿠키에 저장 (이 방식은 회원가입하면 곧바로 로그인이 됩니다.)
 * 
 * createAsyncThunk() 함수는 3개의 액션을 자동으로 생성합니다.
 * 1. auth/register/pending   - 요청 시작
 * 2. auth/register/fulfilled - 요청 성공
 * 3. auth/register/rejected  - 요청 실패
 */
export const registerUserAction = createAsyncThunk(
  "auth/register",  // 액션 타입
  async (userData, { rejectWithValue }) => {
    try {
      // 회원가입 시도
      const response = await authAPI.register(userData);
      // 회원가입 성공시 JWT 토큰을 쿠키에 저장
      CookieUtils.set("accessToken", response.data.accessToken, {
        expires: 1,      // 1일 후 만료
        secure: false,   // 개발환경 (http 쿠키 전송 가능)
        sameSite: "lax", // 안전한 요청은 쿠키 전송
      });
      // 회원가입 성공시 서버의 응답 데이터를 반환 (fulfilled 액션의 payload가 됩니다.)
      return response.data;
    } catch (error) {
      // 회원가입 실패시 예외 메시지를 반환 (rejected 액션의 payload가 됩니다.)
      return rejectWithValue(
        error.response?.data?.message || "회원가입이 실패했습니다."
      );
    }
  }
)

/**
 * 로그인 비동기 액션
 * 
 * 사용자 로그인 처리 후 JWT 토큰을 쿠키에 저장
 */
export const loginUserAction = createAsyncThunk(
  "auth/login", // 액션 타입 이름
  async (credentials, { rejectWithValue }) => {
    try {
      // API 호출로 로그인 시도
      const response = await authAPI.login(credentials);
      
      // 로그인 성공 시 JWT 토큰을 쿠키에 저장
      CookieUtils.set("accessToken", response.data.accessToken, {
        expires: 1,      // 1일 후 만료
        secure: false,   // 개발환경 (http 쿠키 전송 가능)
        sameSite: "lax", // 안전한 요청은 쿠키 전송
      });
      
      // 로그인 성공 시 서버의 응답 데이터를 반환 (fulfilled 액션의 payload가 됩니다.)
      return response.data;
    } catch (error) {
      // 로그인 실패 시 예외 메시지를 반환 (rejected 액션의 payload가 됩니다.)
      return rejectWithValue(
        error.response?.data?.message || '로그인에 실패했습니다.'
      );
    }
  }
);



//----- 리덕스 상태 초기값
const initialState = {
  loginUser: null,                                    // 로그인 상태의 사용자 정보
  accessToken: CookieUtils.get("accessToken"),        // 액세스 토큰
  isAuthenticated: !!CookieUtils.get("accessToken"),  // 인증 여부 (boolean), Boolean(CookieUtils.get("accessToken"))와 동일한 코드
  error: null,                                        // 에러 메시지
  isLoading: false,                                   // 로딩 상태 여부 (API 처리중인지 처리완료인지 구분)
};



/**
 * Auth Slice 정의
 * 
 * createSlice() 함수는 다음을 자동으로 생성합니다.
 * 1. 액션 생성자 (action creators)
 * 2. 리듀서 함수 (reducer function)
 * 3. 액션 타입 상수 (action type constants)
 */
const authSlice = createSlice({
  name: "auth",  // 슬라이스 이름 (액션 타입의 prefix 값으로 사용)
  initialState,  // 초기상태

  /**
   * reducers
   * 1. 동기 액션들을 정의하는 부분입니다.
   * 2. 여기에 정의한 함수는 자동으로 액션 생성자가 됩니다.
   */
  reducers: {
    /**
     * 로그아웃 액션
     * 
     * - 액션 타입  : "auth/logout" <- "슬라이스이름/액션이름"
     * - 액션 생성자: logout() - 자동으로 생성되는 함수
     * 
     * - 액션 생성자 호출 (실행하고 싶을 때)
     *   dispatch(logout())
     */
    logout: (state) => {
      // 리덕스 툴킷의 경우 Immer 라이브러리가 직접 state를 수정하더라도 새로운 state를 반환하는 방식으로 처리합니다.
      state.loginUser = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      // accessToken 쿠키 제거
      CookieUtils.remove("accessToken");
    },

   /**
     * 에러 초기화 액션
     * 
     * 폼 입력 시 기존 에러 메시지를 지우기 위해 사용
     * 
     * - 액션 타입: "auth/clearError" <- "슬라이스이름/액션이름"
     * - 액션 생성자: clearError() - 자동으로 생성되는 함수
     * 
     * - 액션 생성자 호출 (실행하고 싶을 때)
     *   dispatch(clearError())
     */
    clearError: (state) => {
      state.error = null;  // 에러 메시지 초기화
    },
  },

  /**
   * extraReducers
   * 1. 외부에서 생성한 액션을 처리합니다.
   * 2. 주로 createAsyncThunk()를 이용한 비동기 액션을 처리합니다.
   */
  extraReducers: (builder) => {  // builder 패턴을 이용한 액션 타입 처리

    //-----***** 회원가입 액션 처리 *****-----//
    builder

      //----- 1. 회원가입 요청 시작 (pending)
      // registerUserAction.pending 액션이 dispatch 될 때 실행되는 부분
      .addCase(registerUserAction.pending, (state, action) => {
        state.error = null;      // 에러 메시지 초기화
        state.isLoading = true;  // 로딩 화면 활성화 (로딩 스피너 활용 가능)
      })

      //----- 2. 회원가입 성공 (fulfilled)
      // registerUserAction.fulfilled 액션이 dispatch 될 때 실행되는 부분
      // action.payload에는 createAsyncThunk() 함수에서 반환한 API 응답 데이터가 저장되어 있습니다.
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loginUser = {  // 사용자 정보 저장
          email: action.payload.email,
          nickname: action.payload.nickname,
        }
        state.accessToken = action.payload.accessToken;  // 토큰 저장
        state.isAuthenticated = true;  // 인증 성공
        state.isLoading = false;  // 로딩 화면 비활성화
        // error는 그대로 null 유지
      })

      //----- 3. 회원가입 실패 (rejected)
      // registerUserAction.rejected 액션이 dispatch 될 때 실행됩니다.
      // action.payload에는 rejectWithValue() 함수로 전달된 메시지가 저장되어 있습니다.
      .addCase(registerUserAction.rejected, (state, action) => {
        state.error = action.payload;  // 에러 메시지 저장
        state.isLoading = false;  // 로딩 화면 비활성화
        // user, accessToken, isAuthenticated는 그대로 유지
      });


    //-----***** 로그인 액션 처리 *****-----//

    builder

       //----- 1. 로그인 요청 시작 (pending)
       // loginUserAction.pending 액션이 dispatch 될 때 실행됩니다.
      .addCase(loginUserAction.pending, (state, action) => {
        state.error = null;  // 기존 에러 메시지 초기화
        state.isLoading = true;  // 로딩 화면 활성화 (로딩 스피너 활용 가능)
      })
      
       //----- 2. 로그인 성공 (fulfilled)
       // loginUserAction.fulfilled 액션이 dispatch 될 때 실행됩니다.
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loginUser = {  // 사용자 정보 저장
          email: action.payload.email,
          nickname: action.payload.nickname,
        }
        state.accessToken = action.payload.accessToken;  // 토큰 저장
        state.isAuthenticated = true;  // 인증 성공
        state.isLoading = false;  // 로딩 화면 비활성화
        // error는 그대로 null 유지
      })
      
      //----- 3. 로그인 실패 (rejected)
      // loginUserAction.rejected 액션이 dispatch 될 때 실행됩니다.
      .addCase(loginUserAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;  // 로딩 화면 비활성화
        // loginUser, accessToken, isAuthenticated는 그대로 유지
      });

  }

});



/**
 * 액션 생성자를 export
 * authSlice.actions에는 reducers에 정의한 함수들이
 * 액션 생성자로 자동 변환되어 있습니다.
 */
export const { logout, clearError } = authSlice.actions;

/**
 * 리듀서 함수를 default export
 * 이 리듀서는 store에서 사용합니다.
 */
export default authSlice.reducer;