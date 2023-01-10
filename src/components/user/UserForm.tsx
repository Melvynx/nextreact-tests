import { FormEvent } from 'react';
import { useUser } from './UserProvider';

export const UserForm = () => {
  const { login: updateUser } = useUser();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = formData.get('user');
    if (typeof newUser === 'string') {
      updateUser(newUser);
    }
  };

  return (
    <form className="flex col gap-2" onSubmit={handleSubmit}>
      <label htmlFor="user">UserName</label>
      <input id="user" type="text" name="user" />
      <input type="submit" value="Login" />
    </form>
  );
};
