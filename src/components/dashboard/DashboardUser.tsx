import { UserForm } from '../user/UserForm';
import { useUser } from '../user/UserProvider';

export const DashboardUser = () => {
  const { user, logout, login } = useUser();

  return user ? (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  ) : (
    <div>
      <p>Please login</p>
      <UserForm login={login} />
    </div>
  );
};
