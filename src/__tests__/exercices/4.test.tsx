import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import { Auth } from '../../components/auth/Auth';
import { setup } from '../../test/setup';

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

    // 🦁 Ajoute le `fetchMock` avec la bonne url
    // 💡 fetchMock.mockIf(URL, async () => {
    // 🦁 A l'intérieur retourne un objet avec le body et le status, et l'username définit ci-dessus

    await authFormSetup(username);

    // 🦁 Utilise `waitForElementToBeRemoved` pour attendre que le loader disparaisse
    // le loader à comme data-testid `loader`

    // Vérifie que le username est bien affiché dans le document
  });
});
