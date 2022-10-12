import React from 'react';

export type Props = {
  initialCount?: number;
  step?: number;
};

export function useCounter({initialCount = 0, step = 1}: Props = {}) {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);

  return {count, increment, decrement};
}
