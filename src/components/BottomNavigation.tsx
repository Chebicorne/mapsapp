import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface BottomNavigationProps {
  navigation: NavigationProp<any>;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
        style={styles.navButton}
      >
        <Text style={styles.navText}>📷</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={styles.navButton}
      >
        <Text style={styles.navText}>🗺️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    fontSize: 24,
  },
});

export default BottomNavigation;
