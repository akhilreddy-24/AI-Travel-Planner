import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import PlaceCard from './PlaceCard';

const openInMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
};

export default function PlannedTrip({details}) {
  return (
      <View style={{
        marginTop:20
    }}>
          <Text style={{
              fontFamily: 'outfit-bold',
              fontSize:20
          }}>🏕️  PlannedTrip</Text>

{details.map((plan, dayIndex) => (
  <PlaceCard plan={plan} dayIndex={dayIndex} />
))}

    </View>
  )
}
