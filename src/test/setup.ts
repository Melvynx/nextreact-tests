import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

// setup function
export function setup(jsx: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options),
  };
}
