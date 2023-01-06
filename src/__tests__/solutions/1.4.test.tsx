import { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';
import { Counter } from '../../components/counter/Counter';
import { wait } from '../../test/wait';

async function render(Component: ReactNode) {
  const div = document.createElement('div');
  document.body.append(div);

  const root = ReactDOM.createRoot(div);
  root.render(Component);
  await wait(1);

  return div;
}

async function click(element: HTMLElement) {
  element.click();
  await wait(1);
}

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    const div = await render(<Counter />);

    const buttons = div.querySelectorAll('button');

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('0');

    const [, minus] = buttons;

    await click(minus);

    expect(span?.textContent).toBe('-1');
  });

  test('the counter is incremented when the plus button is clicked', async () => {
    const div = await render(<Counter />);

    const buttons = div.querySelectorAll('button');

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('0');

    const [plus] = buttons;

    await click(plus);

    expect(span?.textContent).toBe('1');
  });

  test('defaultValue props set the component defaultValue', async () => {
    const defaultValue = 10;
    const div = await render(<Counter defaultValue={defaultValue} />);

    const span = div.querySelector('span');
    expect(span?.textContent).toBe(defaultValue.toString());
  });
});
