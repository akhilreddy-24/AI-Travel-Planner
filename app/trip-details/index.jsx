import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';
import { ScrollView } from 'react-native';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();

  const [tripDetails, setTripDetails] = useState(null);

  // Function to safely parse JSON
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return {};
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    if (trip) {
      try {
        const parsedTrip = JSON.parse(trip);
        setTripDetails(parsedTrip);
      } catch (error) {
        console.error('Error parsing trip:', error);
      }
    }
  }, [trip]);

  if (!tripDetails) {
    return <Text>Loading...</Text>;
  }

  // Access the tripData safely
  const tripData = formatData(tripDetails.tripData) || {};
  const locationInfo = tripData.locationInfo || {};

  // Ensure image URL is constructed correctly
  const imageUrl = locationInfo.photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
    : 'https://via.placeholder.com/400';

  return tripDetails &&(
    <ScrollView>
      {/* Debugging Image and Text Rendering */}
      <Image
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: 330 }}
      />

      <View
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          height: '100%',
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>
          {tripDetails.tripPlan?.travelPlan?.location || 'Location not available'}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: Colors.GRAY,
            gap: 5,
            marginTop:5
          }}
        >
          <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
            {moment(tripData.startDate).format('DD MMM yyyy')}
          </Text>
          <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
            - {moment(tripData.endDate).format('DD MMM yyyy')}
          </Text>
        </View>
        <Text style={{
                      fontFamily: 'outfit',
                      fontSize: 17,
                      color:Colors.GRAY,
                      marginTop:5
        }}>🚙 {formatData(tripDetails.tripData).traveler.title}
        </Text>

      {/*Flight Info*/}
      <FlightInfo flightData={tripDetails?.tripPlan?.travelPlan?.flight} />

        {/*Hotels List*/}
        <HotelList hotelList={tripDetails?.tripPlan?.travelPlan?.hotels} />

        {/*Trip Day Planner*/}
        <PlannedTrip details={tripDetails?.tripPlan?.travelPlan?.dayPlans} />
      </View>

    </ScrollView>
  );
}
