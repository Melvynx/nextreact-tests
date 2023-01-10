import { faker } from '@faker-js/faker';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { describe, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { server } from '../../test/server';
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

beforeAll(() => {
  server.use(
    rest.post('https://api.server.com/auth/login', async (req, res, ctx) => {
      const body = await req.json();

      await wait(10);
      if (!body.username || !body.password) {
        return res(ctx.json({ error: 'Invalid data' }), ctx.status(400));
      }

      return res(
        ctx.json({
          username: body.username,
          email: faker.internet.email(),
          id: faker.datatype.number(),
        })
      );
    })
  );
});

describe('Auth', () => {
  test('user is display after form submission if api send correct data', async () => {
    const username = faker.internet.userName();

    await authFormSetup(username);

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByText(`Logged in as ${username}`)).toBeInTheDocument();
  });
});
