import {decrement, increment, reset} from "./features/counterSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {

    const number = useSelector(state => state.counter.number);

    const dispatch = useDispatch();


    return (
        <div>
            <h1>현재 상태 number: {number}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(reset())}>reset</button>
        </div>
    );
}

export default App;
