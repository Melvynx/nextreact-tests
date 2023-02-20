import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';

const click = async (element: HTMLElement) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });

  await act(() => {
    element.dispatchEvent(event);
  });
};

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    render(<Counter defaultValue={0} />);

    const counterDisplay = screen.queryByText('0');

    const plusButton = screen.getByRole('button', { name: '+' });
    await click(plusButton);
    expect(counterDisplay).toHaveTextContent('1');

    const minusButton = screen.getByRole('button', { name: '-' });
    await click(minusButton);
    expect(counterDisplay).toHaveTextContent('0');
  });
});
