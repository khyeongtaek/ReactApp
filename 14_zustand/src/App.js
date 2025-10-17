// counterStore를 import하여 사용
// zustand의 스토어는 훅과 유사한 사용법을 가지고 있어서 use로 네이밍을 부여할 수 있습니다.
import useCounterStore from './stores/counterStore';

function App() {

  // useCounterStore()
  // 객체 구조 분해 할당을 이용해서 필요한 상태나 액션을 선택적으로 활용할 수 있습니다.
  const { number, increment, decrement, reset } = useCounterStore();

  // 선택적 활용 예시
  // const number = useCounterStore(state => state.number);
  // const increment useConterStore(state => state.increment);

  return (
    <div>
      <h1>상태 number: {number}</h1>

      {/* 스토어에서 정의한 액션 함수 호출 */}
      <button onClick={() => increment()}> + </button>
      <button onClick={decrement}> - </button>
      <button onClick={reset}> RESET </button>
    </div>
  );
}

export default App;
