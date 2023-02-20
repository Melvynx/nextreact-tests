import type { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { Counter } from '../../components/counter/Counter';

const render = async (component: ReactNode) => {
  const div = document.createElement('div');
  document.body.append(div);

  await act(() => {
    const root = ReactDOM.createRoot(div);
    root.render(component);
  });

  return div;
};

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
    const div = await render(<Counter />);

    const buttons = div.querySelectorAll('button');

    const [, minus] = buttons;

    const span = div.querySelector('span');
    expect(span?.textContent).toBe('0');

    await click(minus);

    expect(span?.textContent).toBe('-1');
  });

  test('the counter is incremented when the minus button is clicked', async () => {
    const div = await render(<Counter />);

    const buttons = div.querySelectorAll('button');

    const [plus] = buttons;

    const span = div.querySelector('span');

    await click(plus);

    expect(span?.textContent).toBe('1');
  });

  test("the counter defaultValue props it's displayed on first render", async () => {
    const defaultValue = 10;
    const div = await render(<Counter defaultValue={defaultValue} />);

    const span = div.querySelector('span');
    expect(span?.textContent).toBe(String(defaultValue));
  });

  test('the props on change is called when counter change', async () => {
    const onChange = vi.fn();
    const div = await render(<Counter onChange={onChange} />);

    const buttons = div.querySelectorAll('button');

    const [, minus] = buttons;

    await click(minus);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(-1);
  });
});
