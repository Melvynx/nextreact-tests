import { faker } from '@faker-js/faker';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { beforeAll, describe, expect, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { server } from '../../test/server';
import { setup } from '../../test/setup';
import { wait } from '../../test/wait';

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
    const username = faker.internet.userName('John', 'Doe');
    const { user } = setup(<Auth />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    const form = {
      username,
      password: faker.internet.password(),
    };

    await user.type(usernameInput, form.username);
    await user.type(passwordInput, form.password);

    const submit = screen.getByRole('button', { name: 'Login' });

    await act(async () => user.click(submit));

    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));

    expect(screen.getByText(`Logged in as ${username}`)).toBeInTheDocument();
  });
});
