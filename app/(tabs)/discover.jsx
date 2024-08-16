import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';

export default function Discover() {
  const handleGoToMaps = () => {
    const url = 'https://www.google.com/maps';
    Linking.openURL(url).catch((err) => console.error('An error occurred while opening Google Maps:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.description}>
          You can use this page to navigate to Google Maps for exploring places.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGoToMaps}>
        <Text style={styles.buttonText}>Go to Maps</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});
