import { act, render } from '@testing-library/react';
import { describe } from 'vitest';
import { useCounter, UseCounterOutput } from '../../hooks/useCounter';

const setup = () => {
  const counter = {} as {
    current: UseCounterOutput;
  };

  const TestComponent = () => {
    counter.current = useCounter();

    return null;
  };

  render(<TestComponent />);

  return counter;
};

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    const counter = setup();

    expect(counter.current.count).toBe(0);

    act(() => counter.current.increment());
    expect(counter.current.count).toBe(1);

    act(() => counter.current.decrement());
    expect(counter.current.count).toBe(0);

    act(() => counter.current.setCount(10));
    expect(counter.current.count).toBe(10);

    act(() => counter.current.reset());
    expect(counter.current.count).toBe(0);
  });
});
