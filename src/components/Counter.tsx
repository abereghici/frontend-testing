import React, {useReducer} from 'react';

const initialState = {
  count: 0,
};

function reducer(
  state = initialState,
  action: {type: 'INCREMENT' | 'DECREMENT'},
) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const increment = () => dispatch({type: 'INCREMENT'});
  const decrement = () => dispatch({type: 'DECREMENT'});

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{state.count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};
