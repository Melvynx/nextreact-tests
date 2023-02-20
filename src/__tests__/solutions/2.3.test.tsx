import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';

const setup = (jsx: ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const { user } = setup(<Counter defaultValue={0} />);

    const counterDisplay = screen.queryByText('0');

    const plusButton = screen.getByRole('button', { name: '+' });
    await user.click(plusButton);
    expect(counterDisplay).toHaveTextContent('1');

    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    expect(counterDisplay).toHaveTextContent('0');
  });
});
