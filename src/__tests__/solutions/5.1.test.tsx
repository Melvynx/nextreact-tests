import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Geolocation from '../../components/geolocation/Geolocation';

export const mockLocation = ({
  latitude = 100,
  longitude = 100,
}: {
  latitude: number;
  longitude: number;
}) => {
  const navigator = {
    geolocation: {
      getCurrentPosition: (success: any) => {
        success({
          coords: {
            latitude,
            longitude,
          },
        });
      },
    },
  };

  vi.stubGlobal('navigator', navigator);
};

describe('Geolocation', () => {
  test('geolocation show the latitude and longitude', () => {
    const coords = {
      longitude: 100,
      latitude: 230,
    };
    mockLocation(coords);
    render(<Geolocation />);

    expect(screen.getByText(`Latitude: ${coords.latitude}`)).toBeInTheDocument();
    expect(screen.getByText(`Longitude: ${coords.longitude}`)).toBeInTheDocument();
  });
});
