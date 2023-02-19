import { screen } from '@testing-library/react';
import { useState } from 'react';
import { describe } from 'vitest';
import { useCounter } from '../../hooks/useCounter';
import { setup } from '../../test/setup';

const TestComponent = () => {
  const { count, decrement, increment, reset, setCount } = useCounter();

  return (
    <>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
      <button onClick={() => setCount(10)}>Set 10</button>
    </>
  );
};

const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggle = () => setValue((curr) => !curr);

  return { toggle, value };
};

describe('useCounter', () => {
  // test('show the counter and increment/decrement/reset/set counter', async () => {
  //   const { user } = setup(<TestComponent />);

  //   const counter = screen.getByText('0');
  //   expect(counter).toBeInTheDocument();

  //   await user.click(screen.getByText('+'));
  //   expect(counter).toHaveTextContent('1');

  //   await user.click(screen.getByText('-'));
  //   expect(counter).toHaveTextContent('0');

  //   await user.click(screen.getByText('Set 10'));
  //   expect(counter).toHaveTextContent('10');

  //   await user.click(screen.getByText('reset'));
  //   expect(counter).toHaveTextContent('0');
  // });

  const TestComponent = () => {
    const { toggle, value } = useToggle();

    return (
      <div>
        <span>{String(value)}</span>
        <button onClick={toggle}>Toggle</button>
      </div>
    );
  };

  test('useToggle toggle state when call toggle', () => {
    setup(<TestComponent />);

    const button = screen.getByRole('button');
    const span = screen.getByText('false');

    // etc...
  });
});
