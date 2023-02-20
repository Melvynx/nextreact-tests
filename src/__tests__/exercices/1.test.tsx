// 🦁 Ajoute `expect` à l'import de `vitest`
import { describe, test } from 'vitest';
// 🦁 Dé-commente les imports suivants
// import ReactDOM from 'react-dom/client';
// import { Counter } from '../../components/1/Counter';
// import { wait } from '../../test/wait';

describe('Counter', () => {
  test('the counter is decremented when the minus button is clicked', async () => {
    // 🦁 Créer un élément `div` avec `document.createElement`
    // 🦁 Ajouter l'élément `div` au `body` avec `document.body.append`
    // ---
    // 🦁 Il faut wrapper la suite dans un `act` comme expliqué dans les instructions
    // 🦁 Créer un `root` avec `ReactDOM.createRoot`
    // 🦁 Rendre le composant `Counter` dans le `root`
    // --
    // 🦁 Récupère le bouton "minus"
    // 🦁 Utilise `expect` pour vérifier que le contenue du span est "0"
    // --
    // 🦁 Il faut wrapper l'appel du clique dans un `act`
    // 🦁 Clique sur le bouton "plus"
    // 🦁 Attendre 1ms
    // 🦁 Vérifie que le contenue du span est "1"
  });
});
