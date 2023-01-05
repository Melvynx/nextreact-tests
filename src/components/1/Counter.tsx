import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <span>Current count: {count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
};
