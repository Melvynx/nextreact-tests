import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    render(<Counter defaultValue={0} />);
    const user = userEvent.setup();

    const counterDisplay = screen.queryByText('0');

    const plusButton = screen.getByRole('button', { name: '+' });
    await user.click(plusButton);
    expect(counterDisplay).toHaveTextContent('1');

    const minusButton = screen.getByRole('button', { name: '-' });
    await user.click(minusButton);
    expect(counterDisplay).toHaveTextContent('0');
  });
});
