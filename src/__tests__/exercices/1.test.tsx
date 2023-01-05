import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/1/Counter';
import { wait } from '../../test/wait';

describe('Counter', () => {
  test('test', async () => {
    const div = document.createElement('div');
    document.body.append(div);

    const root = ReactDOM.createRoot(div);
    root.render(<Counter />);

    await wait(1);

    const buttons = div.querySelectorAll('button');

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('Current count: 0');

    const [minus, plus] = buttons;

    minus.click();
    await wait(1);

    expect(span?.textContent).toBe('Current count: -1');

    plus.click();
    plus.click();
    await wait(1);

    expect(span?.textContent).toBe('Current count: 1');
  });
});
