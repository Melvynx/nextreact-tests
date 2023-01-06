import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';
import { wait } from '../../test/wait';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const { container } = render(<Counter />);

    const [plusButton] = container.querySelectorAll('button');
    const span = container.querySelector('span');

    expect(span?.textContent).toBe('0');

    plusButton.click();
    await wait(1);

    expect(span?.textContent).toBe('1');
  });
});
