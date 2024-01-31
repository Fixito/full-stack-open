import { useSelector, useDispatch } from 'react-redux';
import { decrement, reset, increment } from './counterSlice.js';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <section>
      <h1>Counter</h1>
      <span>{count}</span>
      <div>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          minus
        </button>
        <button aria-label='Reset value' onClick={() => dispatch(reset())}>
          reset
        </button>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          plus
        </button>
      </div>
    </section>
  );
};

export default Counter;
