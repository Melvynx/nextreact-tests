import { useState } from 'react';
import { z } from 'zod';
import styles from './Login.module.css';

type LoginProps = {
  onSubmit: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<unknown>;
};

const LoginScheme = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const Login = ({ onSubmit }: LoginProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');

    const login = LoginScheme.safeParse({ username, password });

    if (login.success) {
      onSubmit({
        username: login.data.username,
        password: login.data.password,
      }).catch((error) => {
        if (typeof error?.message === 'string') {
          setError(error?.message);
          return;
        }

        setError('Oops, something went wrong!');
      });
    } else {
      const firstIssue = login.error.issues[0];
      setError(`${firstIssue.path[0]} ${firstIssue.message}`);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        Username
        <input name="username" minLength={3} maxLength={20} />
      </label>
      <label>
        Password
        <input name="password" />
      </label>
      {error && (
        <p data-testid="login-error" className={styles.error}>
          {error}
        </p>
      )}
      <input type="submit" value="Login" />
    </form>
  );
};
