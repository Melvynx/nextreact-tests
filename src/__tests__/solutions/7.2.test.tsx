import { act, render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import type { UseCounterOutput } from '../../hooks/useCounter';
import { useCounter } from '../../hooks/useCounter';

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    let counter: UseCounterOutput = null as unknown as UseCounterOutput;

    const TestComponent = () => {
      counter = useCounter();

      return null;
    };

    render(<TestComponent />);

    expect(counter.count).toBe(0);

    act(() => counter.increment());
    expect(counter.count).toBe(1);

    act(() => counter.decrement());
    expect(counter.count).toBe(0);

    act(() => counter.setCount(10));
    expect(counter.count).toBe(10);

    act(() => counter.reset());
    expect(counter.count).toBe(0);
  });
});
