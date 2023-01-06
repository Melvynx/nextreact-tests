import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';
import { wait } from '../../test/wait';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    render(<Counter />);

    const plusButton = screen.getByRole('button', { name: '+' });
    const displayText = screen.getByText('0');

    expect(displayText).toBeInTheDocument();

    plusButton.click();
    await wait(1);

    expect(displayText).toHaveTextContent('1');
  });
});
