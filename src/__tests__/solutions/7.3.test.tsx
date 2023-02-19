import { act, render } from '@testing-library/react';
import { describe } from 'vitest';
import { useCounter, UseCounterOutput } from '../../hooks/useCounter';

const setup = (initialValue?: number) => {
  const counter = {} as {
    current: UseCounterOutput;
  };

  const TestComponent = () => {
    counter.current = useCounter(initialValue);

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

  test('if initial value is provided, the counter start with this value', async () => {
    const counter = setup(10);

    expect(counter.current.count).toBe(10);
  });
});
