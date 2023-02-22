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
          throw json;
        }
        return json;
      })
      .then((u) => UserScheme.parse(u))
      .then((u) => setUser(u))
      .catch((error_) => {
        setError(error_.message || 'An error occurred');
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
      {error && <p role="alert">{error}</p>}
    </div>
  );
};
