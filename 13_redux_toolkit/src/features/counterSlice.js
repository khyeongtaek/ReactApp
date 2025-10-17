/*
  2. 슬라이스
    1) 서로 관련 있는 상태(state)와 액션(action)을 하나로 묶은 조각(slice)입니다.
    2) 구성
      (1) 슬라이스 이름
      (2) 초기 상태값
      (3) 리듀서
        - 상태 변경 함수(상태를 어떻게 변경할지 정의하는 함수)
        - 액션에 따라서 상태를 변경함
        - 같은 입력이면 항상 같은 결과를 반환하는 함수 (순수 함수)
        - 기존 상태를 직접 수정하면 안 됨
    3) createSlice() : 리덕스 툴킷에서 제공하는 액션 타입, 액션 생성자, 리듀서를 한 번에 생성하는 함수
*/

import { createSlice } from "@reduxjs/toolkit";

// 슬라이스 생성
export const counterSlice = createSlice({

  // 슬라이스 구성1 : 이름 (액션 타입의 prefix로 사용)
  name: "counter",

  // 슬라이스 구성2 : 초기 상태값
  initialState: {
    number: 0,
  },

  // 슬라이스 구성3 : 리듀서 (리듀서 함수들을 등록하는 객체)
  reducers: {

    // 액션1(increment)에 대한 리듀서 함수(현재 상태를 인자로 받음)
    // 액션 생성자 increment()가 자동으로 등록됩니다.
    increment: ( state ) => {
      // 리덕스 툴킷을 사용하면, Immer 라이브러리가 상태 변경을 처리해 주기 때문에
      // 상태를 직접 변경하는 것처럼 코드를 작성해도 됩니다. (실제로는 상태의 불변성을 유지해 주고 새로운 상태를 반환해 줍니다.)
      state.number += 1;
    },

    // 액션2(decrement)에 대한 리듀서 함수
    // 액션 생성자 decrement()가 자동으로 등록됩니다.
    decrement: ( state ) => {
      state.number -= 1;
    },
    
    // 액션3(reset)에 대한 리듀서 함수
    // 액션 생성자 reset()이 자동으로 등록됩니다.
    reset: ( state ) => {
      state.number = 0;
    }

    // 참고. 액션(incrementByAmount)에 대한 리듀서 함수(사용 안 함)
    // 액션 생성자 incrementByAmount()가 자동으로 등록됩니다.
    // incrementByAmount: ( state, action ) => {
    //   state.number += action.payload;
    // }

  }

});

// 스토어에서 등록할 슬라이스를 export (리듀서를 export 합니다.)
export default counterSlice.reducer;

// 액션 생성자를 export
// 컴포넌트에서 액션을 사용 (dispatch 할 때 액션 생성자를 사용)
export const { increment, decrement, reset } = counterSlice.actions;