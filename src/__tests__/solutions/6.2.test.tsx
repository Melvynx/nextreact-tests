import type { RenderOptions } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, test } from 'vitest';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { DashboardUser } from '../../components/dashboard/DashboardUser';
import {
  ThemeContextProvider,
  useTheme,
} from '../../components/theme/ThemeProvider';
import { UserContextProvider } from '../../components/user/UserProvider';
import { setup } from '../../test/setup';

const DEFAULT_USER = 'Jean';

const Wrapper = ({
  children,
  isLogged,
}: PropsWithChildren<{ isLogged?: boolean }>) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider defaultUser={isLogged ? DEFAULT_USER : undefined}>
        {children}
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'> & {
    isLogged?: boolean;
  }
) =>
  setup(ui, {
    wrapper: ({ children }) => (
      <Wrapper isLogged={options?.isLogged}>{children}</Wrapper>
    ),
    ...options,
  });

describe('Dashboard', () => {
  test('toggle dark mode update the dashboard colors', async () => {
    const { user } = customRender(<Dashboard />);

    const darkBtn = screen.getByRole('button', {
      name: /dark/i,
    });

    await act(async () => user.click(darkBtn));

    expect(darkBtn).toHaveTextContent('light mode');
  });
});

describe('DashboardHeader', () => {
  test('show please login if there is no user', async () => {
    customRender(<DashboardHeader />);

    expect(screen.getByText(/please login/i)).toBeInTheDocument();
  });

  test('show user name if there is a user', async () => {
    customRender(<DashboardHeader />, {
      isLogged: true,
    });

    expect(screen.getByText(`Welcome ${DEFAULT_USER}`)).toBeInTheDocument();
  });
});

describe('DashboardUser', () => {
  test('when user login, the logout bouton appear', async () => {
    const { user } = customRender(<DashboardUser />);

    const input = screen.getByLabelText('UserName');

    await user.type(input, 'DIDIER');

    const loginBtn = screen.getByRole('button', {
      name: /login/i,
    });

    await act(async () => user.click(loginBtn));

    expect(
      screen.getByRole('button', {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });
});

const TestComponent = () => {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <p>Theme : {theme}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};

describe('ThemeContextProvider', () => {
  test('on toggle the theme state change', async () => {
    const { user } = customRender(<TestComponent />);

    const themeInformationText = screen.getByText(/theme :/i);

    expect(themeInformationText).toHaveTextContent('Theme : dark');

    await act(async () => user.click(screen.getByText(/toggle/i)));

    expect(themeInformationText).toHaveTextContent('Theme : light');

    await act(async () => user.click(screen.getByText(/toggle/i)));

    expect(themeInformationText).toHaveTextContent('Theme : dark');
  });
});
