import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

// setup function
export function setup(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
