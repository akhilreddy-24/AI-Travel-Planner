import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function Discover() {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;
  const { tripData, setTripData } = useContext(CreateTripContext);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: 'Golden Gate Bridge',
      description: 'Famous bridge in San Francisco',
      latitude: 37.8199,
      longitude: -122.4783,
    },
    {
      id: 2,
      title: 'Alcatraz Island',
      description: 'Historical site in San Francisco Bay',
      latitude: 37.8267,
      longitude: -122.4230,
    },
  ]);

  useEffect(() => {
    if (tripData?.locationInfo?.coordinates) {
      setRegion({
        ...region,
        latitude: tripData.locationInfo.coordinates.lat,
        longitude: tripData.locationInfo.coordinates.lng,
      });
    }
  }, [tripData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search Place'
          fetchDetails={true}
          onPress={(data, details = null) => {
            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos[0]?.photo_reference,
                url: details?.url,
              },
            });
          }}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 25,
            },
            textInput: {
              height: 40,
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
            },
          }}
        />
      </View>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsCompass={true}
        zoomControlEnabled={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    marginTop: 70,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
