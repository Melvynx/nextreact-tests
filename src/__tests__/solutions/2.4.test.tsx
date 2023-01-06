import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';

function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const { user } = setup(<Counter />);

    const plusButton = screen.getByRole('button', { name: '+' });
    const displayText = screen.getByText('0');

    expect(displayText).toBeInTheDocument();

    await user.click(plusButton);

    expect(displayText).toHaveTextContent('1');
  });
});
