import { describe, test } from 'vitest';
import { useCounter } from '../../hooks/useCounter';
import { setup } from '../../test/setup';

const TestComponent = () => {
  const { count, decrement, increment, reset, setCount } = useCounter();

  return (
    <>
      <p>{count}</p>
      {/* 🦁 Crée des boutons pour nos différentes méthodes */}
    </>
  );
};

describe('useCounter', () => {
  test('show the counter and increment/decrement/reset/set counter', async () => {
    const { user } = setup(<TestComponent />);

    // 🦁 Utilise les boutons qu'on à créer pour interagir avec le hooks
  });
});
