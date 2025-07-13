
import React, { createContext, useState, ReactNode } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationContextData {
  location: Location | null;
  setLocation: (location: Location | null) => void;
}

export const LocationContext = createContext<LocationContextData>({
  location: null,
  setLocation: () => {},
});

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
