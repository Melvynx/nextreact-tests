import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { Geolocation } from '../../components/geolocation/Geolocation';

export const mockLocation = ({
  latitude = 100,
  longitude = 100,
  isSupported = true,
}: {
  latitude?: number;
  longitude?: number;
  isSupported?: boolean;
} = {}) => {
  const navigator = {
    geolocation: {
      getCurrentPosition: vi.fn((success, error) => {
        if (isSupported) {
          success({
            coords: {
              latitude,
              longitude,
            },
          });
          return;
        }
        error('An error occurres');
      }),
    },
  };

  vi.stubGlobal('navigator', navigator);
};

afterEach(() => {
  mockLocation();
});

describe('Geolocation', () => {
  test('geolocation show the latitude and longitude', () => {
    const coords = {
      latitude: 12,
      longitude: 100,
    };

    mockLocation(coords);

    render(<Geolocation />);

    expect(screen.getByText(`Latitude: ${coords.latitude}`)).toBeInTheDocument();
    expect(screen.getByText(`Longitude: ${coords.longitude}`)).toBeInTheDocument();
  });

  test("geolocation show not supported error if it's not supported", () => {
    mockLocation({
      isSupported: false,
    });
    render(<Geolocation />);

    expect(screen.getByText(/not supported/i)).toBeInTheDocument();
  });
});
