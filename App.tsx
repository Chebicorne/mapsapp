import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './src/screens/CameraScreen';
import MapScreen from './src/screens/MapScreen';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from './src/components/BottomNavigation';
import { PhotoProvider } from './src/context/PhotoContext';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
        alert('L\'application a besoin des permissions de la caméra et de la localisation pour fonctionner correctement.');
      }
    } catch (err) {
      console.error('Erreur lors de la demande de permissions:', err);
    }
  };

  return (
    <PhotoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Camera">
          <Stack.Screen
            name="Camera"
            component={CameraScreen}
            options={({ route, navigation }) => ({
              title: 'Appareil Photo',
              headerRight: () => <BottomNavigation navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={({ route, navigation }) => ({
              title: 'Carte',
              headerRight: () => <BottomNavigation navigation={navigation} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer >
    </PhotoProvider >
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#e6e6e6',
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  navText: {
    fontSize: 30,
    marginTop: 5,
  },
});
