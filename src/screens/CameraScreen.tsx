import React, { useState, useRef } from 'react';
import { usePhotoContext } from '../context/PhotoContext';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Sharing from 'expo-sharing';

export default function CameraScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const cameraRef = useRef<Camera>(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const { addPhoto } = usePhotoContext();

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({ exif: true });


      if (result) {
        setPhotos((prevPhotos) => [...prevPhotos, result.uri]);
        const photo = {
          uri: result.uri,
          location: result.exif?.GPSInfo
            ? {
              latitude: result.exif.GPSInfo.latitude,
              longitude: result.exif.GPSInfo.longitude,
            }
            : { latitude: 0, longitude: 0 },
        };

        addPhoto(photo);
        closeModal();
      }
    }
  };

  const sharePhoto = async (uri: string) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert("Le partage n'est pas disponible sur cette plateforme");
        return;
      }
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log('Erreur lors du partage :', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={isModalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <Camera style={styles.camera} ref={cameraRef} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Capturer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.photosContainer}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => sharePhoto(photo)}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button2} onPress={openModal}>
        <Text style={styles.buttonText}>Prendre une photo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 50,
    alignItems: "center"
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button2: {
    backgroundColor: '#2196f3',
    position: "absolute",
    bottom: 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  photosContainer: {
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
});
