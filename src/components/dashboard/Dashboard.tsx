import { useTheme } from '../theme/ThemeProvider';
import { ToggleThemeButton } from '../theme/ToggleThemeButton';
import { UserForm } from '../user/UserForm';
import { useUser } from '../user/UserProvider';

type DashboardProps = {
  unreadMessage?: number;
};

export const Dashboard = ({ unreadMessage = 100 }: DashboardProps) => {
  const { user, logout } = useUser();
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
      {user ? (
        <div>
          <p>Welcome, {user}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please login</p>
          <UserForm />
        </div>
      )}
      <p>You have {unreadMessage} unread message</p>
      <ToggleThemeButton />
    </div>
  );
};
