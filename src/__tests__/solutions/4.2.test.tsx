import { faker } from '@faker-js/faker';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { setup } from '../../test/setup';
import { wait } from '../../test/wait';

const authFormSetup = async (username?: string) => {
  const { user } = setup(<Auth />);

  const usernameInput = screen.getByLabelText('Username');
  const passwordInput = screen.getByLabelText('Password');

  const form = {
    username: username ?? faker.internet.userName(),
    password: faker.internet.password(),
  };

  await user.type(usernameInput, form.username);
  await user.type(passwordInput, form.password);

  const submit = screen.getByRole('button', { name: 'Login' });

  await user.click(submit);

  return { user, form };
};

describe('Auth', () => {
  test('user is display after form submission if api send correct data', async () => {
    const username = faker.internet.userName();

    fetchMock.mockIf('/api/login', async () => {
      await wait(10);
      return {
        body: JSON.stringify({
          id: faker.datatype.number(),
          username: username,
          email: faker.internet.email(),
        }),
        status: 200,
      };
    });

    await authFormSetup(username);

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByText(`Logged in as ${username}`)).toBeInTheDocument();
  });

  test('user is display after form submission if api send correct data', async () => {
    const errorMessage = 'Invalid username or password';

    fetchMock.mockIf('/api/login', async () => {
      await wait(10);
      return {
        body: JSON.stringify({
          message: errorMessage,
        }),
        status: 400,
      };
    });

    await authFormSetup();

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('error is display if the body does not contain good fields', async () => {
    fetchMock.mockIf('/api/login', async () => {
      await wait(10);
      return {
        body: JSON.stringify({
          name: faker.name.firstName(),
          email: faker.internet.email(),
        }),
        status: 200,
      };
    });

    await authFormSetup();

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByTestId('login-error')).toBeInTheDocument();
  });
});
