import { useTheme } from '../theme/ThemeProvider';
import { ToggleThemeButton } from '../theme/ToggleThemeButton';
import { UserForm } from '../user/UserForm';
import { useUser } from '../user/UserProvider';

export const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        padding: 32,
        borderRadius: 8,
      }}
    >
      <h1>Dashboard</h1>
      <DashboardUser />
      <ToggleThemeButton />
    </div>
  );
};

export const DashboardUser = () => {
  const { user, logout, login } = useUser();

  return user ? (
    <div>
      <p>Welcome, {user}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  ) : (
    <div>
      <p>Please login</p>
      <UserForm login={login} />
    </div>
  );
};
