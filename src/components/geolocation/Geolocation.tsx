import React, { useEffect, useState } from 'react';

const Geolocation: React.FC = () => {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    let mount = true;
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!mount) return;
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
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

export default Geolocation;
