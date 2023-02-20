import { act } from 'react-dom/test-utils';
import { describe, test } from 'vitest';

const click = async (element: HTMLElement) => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });

  await act(() => {
    element.dispatchEvent(event);
  });
};

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    // 🦁 Utilise `render` de `@testing-library/react` pour rendre le composant `Counter`
    //
    // 🦁 Récupérer le span qui contient le nombre avec screen.getByText
    //
    // 🦁 Récupère le bouton plus avec `screen.getByRole`
    //
    // 🦁 Clique sur le bouton "plus"
    //
    // 🦁 Vérifie que le contenue du span est "1"
    //
    // 🦁 Récupère le bouton "minus"
    //
    // 🦁 Clique sur le bouton "minus"
    //
    // 🦁 Vérifie que le contenue du span est "0"
  });
});
