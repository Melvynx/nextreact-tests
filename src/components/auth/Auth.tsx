import { useState } from 'react';
import { z } from 'zod';
import { Login } from '../login/Login';

export type LoginForm = {
  username: string;
  password: string;
};

const UserScheme = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});

type User = z.infer<typeof UserScheme>;

const useLoginSubmission = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (form: LoginForm) => {
    setIsSubmitting(true);

    return fetch('https://api.server.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          return Promise.reject(json);
        }
        return json;
      })
      .then((user) => {
        const parsedUser = UserScheme.parse(user);
        setUser(parsedUser);
      })
      .catch((err) => {
        setError(err.message || 'An error occurred');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return {
    user,
    onSubmit,
    isSubmitting,
    error,
  };
};

export const Auth = () => {
  const { user, onSubmit, isSubmitting, error } = useLoginSubmission();

  if (user) {
    return <div>Logged in as {user.username}</div>;
  }

  return (
    <div>
      <Login onSubmit={onSubmit} isSubmitting={isSubmitting} />
      {error && <p>{error}</p>}
    </div>
  );
};
