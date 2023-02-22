import { useTheme } from '../theme/ThemeProvider';
import { ToggleThemeButton } from '../theme/ToggleThemeButton';
import { DashboardHeader } from './DashboardHeader';
import { DashboardUser } from './DashboardUser';

export const Dashboard = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        padding: 32,
        borderRadius: 8,
        display: 'flex',
        gap: 32,
        flexDirection: 'column',
      }}
    >
      <DashboardHeader />
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <DashboardUser />
      <ToggleThemeButton />
    </div>
  );
};
