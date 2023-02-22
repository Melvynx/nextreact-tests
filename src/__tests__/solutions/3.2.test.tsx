import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Login } from '../../components/login/Login';
import { setup } from '../../test/setup';

describe('Login', () => {
  test('the form call onSubmit when all data is correctly filled', async () => {
    const onSubmit = vi.fn(async () => new Promise((r) => r('')));
    const { user } = setup(<Login onSubmit={onSubmit} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    const form = {
      username: faker.internet.userName('John', 'Doe'),
      password: faker.internet.password(),
    };

    await user.type(usernameInput, form.username);
    await user.type(passwordInput, form.password);

    const submit = screen.getByRole('button', { name: 'Login' });

    await user.click(submit);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(form);
  });
});
