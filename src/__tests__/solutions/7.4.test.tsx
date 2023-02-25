import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from '../../hooks/useCounter';

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    const hook = renderHook(useCounter);
    const counter = hook.result;

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

  test('the counter is initialized with a defaultValue', async () => {
    const hook = renderHook(useCounter, { initialProps: 10 });
    const counter = hook.result;

    expect(counter.current.count).toBe(10);

    hook.rerender(20);

    // The initial value is not updated
    expect(counter.current.count).toBe(10);
  });
});
