import { createContext, PropsWithChildren, useContext, useState } from 'react';

type UserContextValue = {
  user?: string;
  login: (newUser: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserContextProvider = ({
  children,
  defaultUser,
}: PropsWithChildren<{ defaultUser?: string }>) => {
  const [user, setUser] = useState(defaultUser);

  const value = {
    user,
    login: (newUser: string) => setUser(newUser),
    logout: () => setUser(undefined),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
};
