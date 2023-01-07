/**
 * DO NOT UPDATE
 * This is the exercise objets that will be used to create the exercises.
 */

import { Auth } from '../components/auth/Auth';
import { Counter } from '../components/counter/Counter';
import { Login } from '../components/login/Login';

export const EXERCISES = [
  {
    name: 'Counter',
    components: <Counter />,
  },
  {
    name: 'Login',
    components: <Login onSubmit={() => new Promise((r) => r(''))} />,
  },
  {
    name: 'Auth',
    components: <Auth />,
  },
];
