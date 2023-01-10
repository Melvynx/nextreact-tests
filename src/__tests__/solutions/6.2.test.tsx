import { RenderOptions, screen } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import { describe, test } from 'vitest';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { ThemeContextProvider } from '../../components/theme/ThemeProvider';
import { UserContextProvider } from '../../components/user/UserProvider';
import { setup } from '../../test/setup';

const Wrapper = ({ children, logged }: PropsWithChildren<{ logged?: boolean }>) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider defaultUser={logged ? 'Jean' : undefined}>
        {children}
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'> & { logged?: boolean }
) =>
  setup(ui, {
    wrapper: ({ children }) => (
      <Wrapper logged={options?.logged}>{children}</Wrapper>
    ),
    ...options,
  });

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

  test('logout with user remove the user name from the dashboard', async () => {
    const { user } = customRender(<Dashboard />, { logged: true });

    const logout = screen.getByRole('button', { name: /logout/i });

    expect(logout).toBeInTheDocument();

    await user.click(logout);

    expect(screen.getByText(/please login/i)).toBeInTheDocument();
  });
});
