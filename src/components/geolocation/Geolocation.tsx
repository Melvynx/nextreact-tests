import { useEffect, useState } from 'react';

export const Geolocation = () => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let mount = true;

    window.navigator.geolocation.getCurrentPosition(
      (p) => {
        if (!mount) return;
        setPosition({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
        });
      },
      () => {
        if (!mount) return;
        setPosition(null);
      }
    );

    return () => {
      mount = false;
    };
  }, []);

  if (!position) {
    return <p>Geolocation is not supported</p>;
  }

  return (
    <>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>
    </>
  );
};
