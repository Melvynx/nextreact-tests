import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { beforeAll, describe, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { server } from '../../test/server';
import { setup } from '../../test/setup';

beforeAll(() => {
  server.use(
    rest.post('https://api.server.com/auth/login', async (req, res, ctx) => {
      // 🦁 Créer un faux handler qui permet de tester notre application
      // https://mswjs.io/docs/basics/request-handler
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

    // 🦁 Attendre que le loader disparaisse

    // 🦁 Vérifier que le nom d'utilisateur est affiché
  });
});
