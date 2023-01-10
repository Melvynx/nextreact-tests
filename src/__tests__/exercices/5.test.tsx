import { render } from '@testing-library/react';
import { describe, test } from 'vitest';
import Geolocation from '../../components/geolocation/Geolocation';

export const mockLocation = ({
  latitude = 100,
  longitude = 100,
}: {
  latitude: number;
  longitude: number;
}) => {
  // 🦁 Créer un fake objet `navigator`
  // Avec une propriété `geolocation`
  // Qui contient une méthode `getCurrentPosition`
  // Qui prend en paramètre une fonction `success`
  // Qui prend en paramètre un objet `coords`
  // 🦁 Stub la propriété `navigator` de l'objet global
};

describe('Geolocation', () => {
  test('geolocation show the latitude and longitude', () => {
    // 🦁 Créer un objet `coords` avec les propriétés `latitude` et `longitude`
    // 🦁 Appeler la fonction `mockLocation` avec l'objet `coords` en paramètre
    render(<Geolocation />);

    // 🦁 Vérifier que le texte `Latitude: ${coords.latitude}` est présent ainsi que longitude
  });
});
