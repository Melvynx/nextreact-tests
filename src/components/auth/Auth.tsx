import { useState } from 'react';
import { z } from 'zod';
import { Loader } from '../Loader';
import { Login } from '../login/Login';

type LoginForm = {
  username: string;
  password: string;
};

const UserScheme = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});

type User = z.infer<typeof UserScheme>;

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (form: LoginForm) => {
    setIsLoading(true);

    return fetch('/api/login', {
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
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    user,
    login,
    isLoading,
  };
};

export const Auth = () => {
  const { user, login, isLoading } = useAuth();

  if (user) {
    return <div>Logged in as {user.username}</div>;
  }

  return (
    <div>
      <Login onSubmit={login} />
      {isLoading && <Loader />}
    </div>
  );
};
