import { useTheme } from './ThemeProvider';

export const ToggleThemeButton = () => {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>{theme} mode</button>;
};
