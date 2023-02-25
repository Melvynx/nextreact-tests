import { act, render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import type { UseCounterOutput } from '../../hooks/useCounter';
import { useCounter } from '../../hooks/useCounter';

const setup = (initialValue?: number) => {
  const hooks = {} as {
    current: UseCounterOutput;
  };

  const TestComponent = () => {
    hooks.current = useCounter(initialValue);

    return null;
  };

  render(<TestComponent />);

  return hooks;
};

describe('useCounter', () => {
  test('show the counter and increment / decrement / reset and setCount it', async () => {
    const counter = setup();

    expect(counter.current.count).toBe(0);

    act(() => counter.current.decrement());
    expect(counter.current.count).toBe(-1);

    act(() => counter.current.increment());
    expect(counter.current.count).toBe(0);

    act(() => counter.current.setCount(10));
    expect(counter.current.count).toBe(10);

    act(() => counter.current.reset());
    expect(counter.current.count).toBe(0);
  });

  test('if initial value is provided, the counter start with this value', () => {
    const counter = setup(10);

    expect(counter.current.count).toBe(10);

    act(() => counter.current.decrement());
    act(() => counter.current.reset());

    expect(counter.current.count).toBe(10);
  });
});
