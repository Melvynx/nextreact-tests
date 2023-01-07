import { faker } from '@faker-js/faker';
// 🦁 Ajoute l'import de screen
// import { screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import { Login } from '../../components/login/Login';
import { setup } from '../../test/setup';

describe('Login', () => {
  test('the form call onSubmit when all data is correctly filled', async () => {
    // 🦁 Tu remarqueras que <Login /> attends une fonction qui retourne une promesse
    // Définit la valeur du mock de cette fonction avec `vi.fn()` : https://vitest.dev/api/#vi-fn
    const onSubmit = vi.fn();
    const { user } = setup(<Login onSubmit={onSubmit} />);

    // 🦁 Utilise `screen.getByLabelText` pour récupérer les inputs du formulaire

    const form = {
      username: faker.internet.userName(),
      password: undefined, // 🦁 Utilise faker pour générer un mot de passe
    };

    // 🦁 Utilise `user.type` pour remplir les champs du formulaire (⚠️ il faut les await)

    // 🦁 Récupère le bouton "Login" et clique dessus (⚠️ il faut l'await)

    expect(onSubmit).toHaveBeenCalled();
    // 🦁 Ajoute une assertion pour vérifier que la fonction onSubmit a été appelée avec les bonnes données
  });
});
