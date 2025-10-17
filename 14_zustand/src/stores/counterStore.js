/*
  zustand
  1. 비교적 간단한 사용법을 제공하는 상태 관리 라이브러리입니다.
  2. useState()처럼 간단한 방식이지만, 전역에서 상태를 사용할 수 있습니다.
  3. 상태를 관리하는 스토어를 만들어 상태와 액션을 정의합니다.
*/

// zustand 스토어 생성을 위한 create() 함수 import
import { create } from 'zustand';

// zustand 스토어 생성
const counterStore = create((set, get) => ({

  // 초기 상태값
  number: 0,

  // 액션1(increment)
  increment: () => {
    // 상태를 변경하기 위해서 zustand 내장 함수 set() 호출
    // set() 호출 시 상태를 변경하는 리듀서 함수 등록
    set((state) => {
      // 기존 state 변경 없이 새로운 상태를 반환
      return {
        number: state.number + 1
      }
    })
  },

  // 액션2(decrement)
  decrement: () => 
    set(state => ({
      number: state.number - 1
    })),

  // 액션3(reset)
  reset: () => 
    set(state => ({
      number: 0
    })),

}));

// export한 스토어는 컴포넌트에서 직접 import하여 사용
export default counterStore;