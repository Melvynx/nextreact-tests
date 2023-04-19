import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const div = document.createElement('div');
    document.body.append(div);

    act(() => {
      const root = ReactDOM.createRoot(div);
      root.render(<Counter />);
    });

    const buttons = div.querySelectorAll('button');

    const [, minus] = buttons;

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('0');

    await act(() => {
      minus.click();
    });

    expect(span?.textContent).toBe('-1');
  });
});
