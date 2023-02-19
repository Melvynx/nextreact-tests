import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { describe, expect, Mock, test, vi } from 'vitest';
import { Login } from '../../components/login/Login';
import { setup } from '../../test/setup';

const loginFormSetup = async (onSubmit: Mock, username?: string) => {
  const { user } = setup(<Login onSubmit={onSubmit} />);

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

function deferred() {
  let resolve: (value: unknown) => void = () => void 0;
  let reject: (reason?: unknown) => void = () => void 0;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('Login', () => {
  test('the form call onSubmit when all data is correctly filled', async () => {
    const onSubmit = vi.fn(() => new Promise((r) => r('')));

    const { form } = await loginFormSetup(onSubmit);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(form);
  });

  test('the form call does not call onSubmit and display an error is data is not validated', async () => {
    const onSubmit = vi.fn(() => new Promise((r) => r('')));

    await loginFormSetup(onSubmit, 'a');

    expect(onSubmit).not.toHaveBeenCalled();
    const error = screen.getByTestId('login-error');
    expect(error).toBeInTheDocument();
  });

  test('the form call onSubmit and if the promise is rejected, show the error', async () => {
    const error = 'Invalid credentials';
    const onSubmit = vi.fn(() => new Promise((_, r) => r({ message: error })));

    const { form } = await loginFormSetup(onSubmit);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(form);

    const errorSpan = screen.getByTestId('login-error');
    expect(errorSpan).toHaveTextContent(error);
  });

  test('the form show default error if the promise is rejected without message', async () => {
    const error = 'Invalid credentials';
    const onSubmit = vi.fn(() => new Promise((_, r) => r({ a: error })));

    const { form } = await loginFormSetup(onSubmit);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(form);

    const errorSpan = screen.getByTestId('login-error');
    expect(errorSpan.textContent).toMatchInlineSnapshot(
      '"Oops, something went wrong!"'
    );
  });

  test('the form show loader when result is loading', async () => {
    const { promise, resolve } = deferred();
    const onSubmit = vi.fn(() => promise);

    await loginFormSetup(onSubmit);

    expect(onSubmit).toHaveBeenCalled();

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    resolve('');
    await promise;

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
