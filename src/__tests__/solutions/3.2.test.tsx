import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Login } from '../../components/login/Login';
import { setup } from '../../test/setup';

describe('Login', () => {
  test('the form call onSubmit when all data is correctly filled', async () => {
    const onSubmit = vi.fn(() => new Promise((r) => r('')));
    const { user } = setup(<Login onSubmit={onSubmit} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    const form = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    await user.type(usernameInput, form.username);
    await user.type(passwordInput, form.password);

    const submit = screen.getByRole('button', { name: 'Login' });

    await user.click(submit);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(form);
  });

  test('the form call does not call onSubmit and display an error is data is not validated', async () => {
    const onSubmit = vi.fn(() => new Promise((r) => r('')));
    const { user } = setup(<Login onSubmit={onSubmit} />);

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    const form = {
      username: 'a',
      password: faker.internet.password(),
    };

    await user.type(usernameInput, form.username);
    await user.type(passwordInput, form.password);

    const submit = screen.getByRole('button', { name: 'Login' });

    await user.click(submit);

    expect(onSubmit).not.toHaveBeenCalled();

    const error = screen.getByTestId('login-error');

    expect(error).toBeInTheDocument();
  });
});
