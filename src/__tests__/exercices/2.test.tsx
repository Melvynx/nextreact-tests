// 🦁 Ajoute `expect` à l'import de `vitest`
import { describe, test } from 'vitest';
// 🦁 Décomente les imports suivants
// import ReactDOM from 'react-dom/client';
// import { Counter } from '../../components/1/Counter';
// import { wait } from '../../test/wait';

describe('Counter', () => {
  test('test', async () => {
    // 🦁 Créer un élément `div` avec `document.createElement`
    // 🦁 Ajouter l'élément `div` au `body` avec `document.body.append`
    // 🦁 Créer un `root` avec `ReactDOM.createRoot`
    // 🦁 Rendre le composant `Counter` dans le `root`
    // 🦁 Attendre 1ms avec `wait`
    // ℹ️ C'est car React est asynchrone
    // ℹ️ Entre chaque action (click, focus, etc...) il faut atteindre 1 ms pour que React puisse mettre à jour le DOM
    // 🦁 Récupère le bouton "minus"
    // 🦁 Utilise `expect` pour vérifier que le contenue du span est "Current count: 0"
    // 🦁 Clique sur le bouton "minus"
    // 🦁 Attendre 1ms
    // 🦁 Vérifie que le contenue du span est "Current count: -1"
  });
});
