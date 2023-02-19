# NextReact - Tests

Découvertes en profondeurs des tests en React.

## Pré-requis

- [JavaScript à connaître pour commencer React](https://codelynx.dev/posts/javascript-known-to-start-react)
- [Les bases de React vue dans BeginReact](https://codelynx.dev/beginreact)
- Installer le React DevTools
  - [chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

## Systems

- [git](https://git-scm.com/downloads) - v2 ou plus
- [node](https://nodejs.org/en/) - v12 ou plus
- [npm](https://nodejs.org/en/) - v6 ou plus
- [pnpm](https://pnpm.io/installation) - v7 ou plus

## Setup du projet

```bash
git clone https://github.com/Melvynx/nextreact-tests.git
cd nextreact-tests
pnpm install
```

Pour lancer le projet :

```bash
pnpm dev
```

## Construction des exercices

### Exercice

Dans le dossier [src/**tests**](src/__tests__) tu trouveras un dossier `exercices` qui contient
tous les exercices.

Dans chacun de ces exercises tu trouveras les fichiers suivants (exemple avec l'exercice 1) :

- `1.test.tsx`: Le fichier où tu vas faire l'exercice. Tu trouveras à l'intérieur des indications
  de nos émojis pour réaliser le premier exercice.
- `1.md`: Le fichier de consigne. Si tu es sur VSCode je te conseille d'ouvrir le
  fichier `md` et faire `CMD + SHIFT + P` puis chercher "Open Markdown" et sélectionner le
  "Markdown : Open preview to the side" !
  - Dans les fichiers Exercise il y a plusieurs parties d'exercice. La première partie est l'exercice
    principal, dans le fichier `1.tsx` tu trouveras de l'aide pour le réaliser avec les émojis.
  - Ensuite, il y a 1 à 6 autres exercices que tu vas réaliser seul.

Pour lancer les tests tu peux utiliser la commande suivante :

```bash
pnpm test exercices/1
```

### Les Solutions

Dans le dossier [src/**tests**/solutions](src/__tests__/solutions) il y a les fichiers solution pour chaque exercice et sous exercice.

Les solutions pour l'exercice `1` sont dans le fichier `solution` préfixé par `1` puis le numéro
du sous exercice. Par exemple dans l'exercice `1` il y a 3 sous exercices donc :

- [`1.2.tests.tsx`](src/__tests__/solution/1.1.test.js)
- [`1.3.tests.tsx`](src/__tests__/solution/1.2.test.js)
- [`1.3.tests.tsx`](src/__tests__/solution/1.3.test.js)

Dans la navigation, quand tu lances le projet, tu peux voir le résultat.

Je te conseille de regarder le résultat des exercices avant de les faire, sans regarder le code,
juste le résultat, afin de comprendre ce que j'attends de toi.

Pour lancer les tests tu peux utiliser la commande suivante :

```bash
pnpm test solutions/1
# ou si tu veux lancer qu'une partie de test
pnpm test solutions/1.2
```

### Le dossier `lib`

Il contient des fichiers utiliser pour les exercices. Attention, parfois je te demande
de faire un composant qui existe déjà dans `lib`. Ne l'utilise pas à moins que je te
dise de le faire.

Pour simplifier les exercices, j'utilises les composants déjà fait pour avoir moins
de ligne dans le fichier principal.

## Stack exercice

Cette application est une application Vite.JS et est configurée pour faire du React.
On utilise `vitest` pour lancer nos tests, tu trouveras des fichiers de configuration pour vitest :

- `vitest.config.js` : Configuration de vitest

On aura aussi des utilitaire pour nos tests dans `src/test`. On verras les fichiers qu'il contient dans la suite des exercices.

## Guide des émojis :

- 🦁 C'est **Lienx** le premier lynx dans un corps de lion du monde ! Il te donneras
  des indications claires que tu devras suivre.
- 💡 C'est des tips et astuces qui te permettront d'avancer. C'est un peu les cheat-code
  qui te donnent directement une partie de la réponse
- 💌 Elle t'informe pour chaque exercice ce que tu as appris. Ce n'est pas que dans
  l'exercice que tu apprends mais aussi dans la vidéo correction associée.
- ⚠️ Information importante à lire avant de faire l'exercice
- 📖 Lien vers la documentation officielle
- ℹ️ Petite information qui te permettent de
- 💣 Supprimer une ligne

```

```
