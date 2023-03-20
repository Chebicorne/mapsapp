import React, { createContext, useContext, useState } from 'react';

interface Photo {
  uri: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface PhotoContextValue {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
}

const PhotoContext = createContext<PhotoContextValue>({
  photos: [],
  addPhoto: () => { },
});

interface PhotoProviderProps {
  children: React.ReactNode;
}

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addPhoto = (photo: Photo) => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};
