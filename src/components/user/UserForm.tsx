import { FormEvent } from 'react';

type UserFormProps = {
  login: (user: string) => void;
};

export const UserForm = ({ login }: UserFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUser = formData.get('user');

    if (typeof newUser === 'string') {
      login(newUser);
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
