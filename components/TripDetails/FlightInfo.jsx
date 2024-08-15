import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  const openWebsite = () => {
    const url = 'https://www.emirates.com';
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <View style={{
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY,
      padding: 10,
      borderRadius: 15
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 20,
        }}>✈️  Flights</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7
          }}
          onPress={openWebsite}
        >
          <Text style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit',
          }}>Book Here</Text>
        </TouchableOpacity>
      </View>

      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 7
      }}>Airline: Emirates</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
      }}>Price: {flightData.price}</Text>
    </View>
  );
}
