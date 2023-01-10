import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Geolocation from '../../components/geolocation/Geolocation';

export const mockLocation = (
  supported = true,
  {
    latitude = 100,
    longitude = 100,
  }: {
    latitude: number;
    longitude: number;
  }
) => {
  const navigator = {
    geolocation: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getCurrentPosition: (success: any, error: any) => {
        if (supported) {
          success({
            coords: {
              latitude: latitude,
              longitude: longitude,
            },
          });
        } else {
          error();
        }
      },
    },
  };

  vi.stubGlobal('navigator', navigator);
};

describe('Geolocation', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('geolocation show the latitude and longitude', () => {
    const coords = {
      longitude: 100,
      latitude: 230,
    };
    mockLocation(true, coords);
    render(<Geolocation />);

    expect(screen.getByText(`Latitude: ${coords.latitude}`)).toBeInTheDocument();
    expect(screen.getByText(`Longitude: ${coords.longitude}`)).toBeInTheDocument();
  });

  test("geolocation show that it's not supported", () => {
    mockLocation(false, {
      latitude: 100,
      longitude: 100,
    });

    render(<Geolocation />);

    // regex lowercase
    expect(screen.getByText(/geolocation is not supported/i)).toBeInTheDocument();
  });
});
