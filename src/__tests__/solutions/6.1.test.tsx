import { RenderOptions, screen } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { describe, test } from 'vitest';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { ThemeContextProvider } from '../../components/theme/ThemeProvider';
import { UserContextProvider } from '../../components/user/UserProvider';
import { setup } from '../../test/setup';

const Wrapper = (props: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>{props.children}</UserContextProvider>
    </ThemeContextProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  setup(ui, { wrapper: Wrapper, ...options });

describe('Dashboard', () => {
  test('toggle dark mode update the dashboard colors', async () => {
    const { user } = customRender(<Dashboard />);

    const bouton = screen.getByRole('button', {
      name: /dark mode/i,
    });

    expect(bouton).toBeInTheDocument();

    await user.click(bouton);

    expect(screen.getByText('light mode')).toBeInTheDocument();
  });

  test('login with user correctly show the user', async () => {
    const { user } = customRender(<Dashboard />);

    const input = screen.getByLabelText(/username/i);

    expect(input).toBeInTheDocument();

    await user.type(input, 'test');

    // get input type submit
    const button = screen.getByRole('button', {
      name: /login/i,
    });

    await user.click(button);

    expect(screen.getByText('Welcome, test')).toBeInTheDocument();
  });
});
