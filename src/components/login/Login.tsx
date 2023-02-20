import { LoginForm } from '../auth/Auth';
import { Loader } from '../Loader';
import styles from './Login.module.css';

type LoginProps = {
  onSubmit: (form: LoginForm) => void;
  isSubmitting?: boolean;
};

export const Login = ({ onSubmit, isSubmitting }: LoginProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const username = String(formData.get('username'));
    const password = String(formData.get('password'));

    const login = {
      username,
      password,
    };

    onSubmit(login);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isSubmitting} className={styles.wrapper}>
        <h2>Login</h2>
        <label>
          Username
          <input name="username" minLength={3} maxLength={20} />
        </label>
        <label>
          Password
          <input name="password" />
        </label>
        <input type="submit" value="Login" />
        {isSubmitting && <Loader />}
      </fieldset>
    </form>
  );
};
