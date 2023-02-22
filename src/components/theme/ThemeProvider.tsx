import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const value = {
    theme,
    toggle: () => {
      setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }

  return context;
};
