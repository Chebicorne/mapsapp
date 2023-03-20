import React, { useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { usePhotoContext } from '../context/PhotoContext';

export default function MapScreen() {
  const { photos } = usePhotoContext();
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);

  const openPhotoPopup = (photo: any) => {
    setSelectedPhoto(photo);
  };

  const closePhotoPopup = () => {
    setSelectedPhoto(null);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        {photos.map((photo, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: photo.location.latitude,
              longitude: photo.location.longitude,
            }}
            onPress={() => openPhotoPopup(photo)}
          />
        ))}
      </MapView>
      {selectedPhoto && (
        <View style={styles.photoPopup}>
          <TouchableOpacity onPress={closePhotoPopup} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedPhoto.uri }} style={styles.popupImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  photoPopup: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
  },
  popupImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});
