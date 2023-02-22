import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { Counter } from '../../components/counter/Counter';

const setup = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const { user } = setup(<Counter />);

    const plusButton = screen.getByRole('button', { name: '+' });
    const displayText = screen.getByText('0');

    expect(displayText).toBeInTheDocument();

    await user.click(plusButton);

    expect(displayText).toHaveTextContent('1');
  });

  test('the counter is incremented when the plus button is clicked', async () => {
    const { user } = setup(<Counter />);

    const minusButton = screen.getByRole('button', { name: '-' });
    const displayText = screen.getByText('0');

    expect(displayText).toBeInTheDocument();

    await user.click(minusButton);

    expect(displayText).toHaveTextContent('-1');
  });

  test('defaultValue props set the component defaultValue', async () => {
    const { user } = setup(<Counter defaultValue={10} />);

    const minusButton = screen.getByRole('button', { name: '-' });
    const displayText = screen.getByText('10');

    expect(displayText).toBeInTheDocument();

    await user.click(minusButton);

    expect(displayText).toHaveTextContent('9');
  });

  test('onChange is called when the counter is incremented', async () => {
    const onChange = vi.fn();
    const { user } = setup(<Counter onChange={onChange} />);

    const plusButton = screen.getByRole('button', { name: '+' });
    const minusButton = screen.getByRole('button', { name: '-' });

    await user.click(plusButton);
    await user.click(minusButton);

    expect(onChange).toHaveBeenNthCalledWith(1, 1);
    expect(onChange).toHaveBeenNthCalledWith(2, 0);
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
