import { useTheme } from '../theme/ThemeProvider';
import { useUser } from '../user/UserProvider';

export const DashboardHeader = () => {
  const { user } = useUser();
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: 4,
        borderBottom: '2px solid',
        borderBottomColor: theme === 'light' ? 'black' : 'white',
      }}
    >
      {user ? `Welcome ${user}` : 'Please login'}
    </div>
  );
};
