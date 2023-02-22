/**
 * DO NOT UPDATE
 * This is the exercise objets that will be used to create the exercises.
 */

import { Auth } from '../components/auth/Auth';
import { Counter } from '../components/counter/Counter';
import { Dashboard } from '../components/dashboard/Dashboard';
import { Geolocation } from '../components/geolocation/Geolocation';
import { Login } from '../components/login/Login';
import { ThemeContextProvider } from '../components/theme/ThemeProvider';
import { UserContextProvider } from '../components/user/UserProvider';

export const EXERCISES = [
  {
    name: 'Counter',
    components: <Counter />,
  },
  {
    name: 'Login',
    components: <Login onSubmit={async () => new Promise((r) => r(''))} />,
  },
  {
    name: 'Auth',
    components: <Auth />,
  },
  {
    name: 'GeoLocation',
    components: <Geolocation />,
  },
  {
    name: 'Dashboard',
    components: (
      <UserContextProvider>
        <ThemeContextProvider>
          <Dashboard />
        </ThemeContextProvider>
      </UserContextProvider>
    ),
  },
];
