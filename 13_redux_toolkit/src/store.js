/*
  1. 스토어 설정
    1) 전역 데이터 저장소 (중앙 저장소)
    2) 리액트 앱의 모든 상태(state)를 한 곳(스토어)에 저장하고 관리할 수 있습니다.
    3) 모든 컴포넌트들이 스토어의 데이터를 공유할 수 있습니다.
    4) 각 상태는 슬라이스(slice)로 나누어 관리합니다.
    5) configureStore : 리덕스 툴킷에서 제공하는 스토어 생성 함수
*/

import { configureStore } from '@reduxjs/toolkit';

// counterSlice의 export default counterSlice.reducer를 import (이름은 자유롭게 지정)
import counterSlice from './features/counterSlice';

// 스토어 생성
export const store = configureStore({

  // reducer : 슬라이스 등록
  // 객체 등록 시 키를 등록하면 해당 키는 상태 트리 키 이름이 됩니다. ( state.counter.number )
  reducer: {
    counter: counterSlice,
  }

});