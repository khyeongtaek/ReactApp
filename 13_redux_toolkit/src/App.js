/*
  4. 컴포넌트
    1) Redux Store의 상태를 읽기 위해서 react-redux의 useSelector() 훅을 사용합니다.
    2) 상태를 변경하기 위해서 액션을 디스패치(전달)합니다.
      (1) 액션 생성자들을 import 합니다.
      (2) react-redux의 useDispatch() 훅을 사용합니다.
*/

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./features/counterSlice";

function App() {

  // useSelector()
  // 스토어에서 원하는 상태를 가져옵니다.
  //   state.counter        : 스토어에 저장한 key
  //   state.counter.number : 스토어에 저장한 value
  const number = useSelector( state => state.counter.number );

  // useDispatch()
  // 디스패치 함수를 반환합니다.
  const dispatch = useDispatch();

  return (
    <div>
      {/* 상태 확인 */}
      <h1>현재 상태 number: {number}</h1>
      
      {/* 
        increment() 호출 시 생성되는 액션 객체는 아래와 같습니다.
        { type: "counter/increment" }  -  counterSlice.js 참고 
      */}
      <button onClick={() => dispatch(increment())}> + </button>
      
      {/* 
        decrement() 호출 시 생성되는 액션 객체는 아래와 같습니다.
        { type: "counter/decrement" }  -  counterSlice.js 참고
      */}
      <button onClick={() => dispatch(decrement())}> - </button>

      {/* 
        reset() 호출 시 생성되는 액션 객체는 아래와 같습니다.
        { type: "counter/reset" }  -  counterSlice.js 참고
      */}
      <button onClick={() => dispatch(reset())}>RESET</button>
    </div>
  );
}

export default App;

/*
  동작 플로우 이해하기

  1. 사용자가 + 버튼을 클릭합니다.

  2. dispatch(increment()) 함수가 호출됩니다.

  3. dispatch({ type: "counter/increment"}) 형태로 함수가 호출됩니다. (액션 타입 결정)

  4. { type: "counter/increment" } 액션 객체를 counterSlice.js의 리듀서로 전달합니다.

  5. 리듀서는 전달된 액션 객체의 type("counter/increment")에 따라 리듀서 함수((state) => state.number += 1;)를 호출합니다.

  6. 스토어(store.js)의 상태가 업데이트 됩니다.

  7. useSelector()가 상태 변경을 감지하고 컴포넌트를 리렌더링합니다.
*/