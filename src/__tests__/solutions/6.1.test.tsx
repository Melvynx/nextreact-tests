import type { RenderOptions } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, test } from 'vitest';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { ThemeContextProvider } from '../../components/theme/ThemeProvider';
import { UserContextProvider } from '../../components/user/UserProvider';
import { setup } from '../../test/setup';

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>
) => setup(ui, { wrapper: Wrapper, ...options });

describe('Dashboard', () => {
  test('toggle dark mode update the dashboard colors', async () => {
    const { user } = customRender(<Dashboard />);

    const darkBtn = screen.getByRole('button', {
      name: /dark/,
    });

    await act(async () => user.click(darkBtn));

    expect(darkBtn).toHaveTextContent('light mode');
  });
});
