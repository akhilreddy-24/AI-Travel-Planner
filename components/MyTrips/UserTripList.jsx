import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function UserTripList({ userTrips }) {
    const [trips, setTrips] = useState(userTrips); // Local state to manage trips
    const router = useRouter();
    const latestTrip = trips[trips.length - 1];
    const remainingTrips = trips.slice(0, trips.length - 1);

    const formatData = (data) => JSON.parse(data);

    const handleDelete = async (tripId) => {
        try {
            // Delete trip from Firebase
            await deleteDoc(doc(db, 'UserTrips', tripId));
            
            // Update local state to remove the deleted trip
            setTrips(trips.filter(trip => trip.id !== tripId));
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <ScrollView >
            {/* Latest Trip */}
            <View style={{ marginTop: 20 }}>

                {formatData(latestTrip.tripData).locationInfo?.photoRef ?

                    <Image source={{
                        uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                            + formatData(latestTrip.tripData).locationInfo.photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                    }}
                        style={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15,
                        }}
                    />
                    :
                    <Image source={require('../../assets/images/placeholder.jpg')}
                        style={{
                            width: '100%',
                            height: 240,
                            objectFit: 'cover',
                            borderRadius: 15,
                        }}
                    />
                }

                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                        flex: 1,
                    }}>
                        {latestTrip?.tripPlan?.travelPlan?.location}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        color: Colors.GRAY,
                        flex: 1,
                        textAlign: 'center'
                    }}>
                        {moment(formatData(latestTrip.tripData).startDate).format('DD MMM yyyy')}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        color: Colors.GRAY,
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        🚙 {formatData(latestTrip.tripData).traveler.title}
                    </Text>
                </View>
            </View>

            {/* Remaining Trips*/}
            {/*<View style={{ marginTop: 20 }}>
                {remainingTrips.map((trip, index) => (
                    <UserTripCard
                        key={index}
                        trip={trip}
                        onDelete={handleDelete} // Pass the delete handler to UserTripCard
                    />
                ))}
            </View>*/}
            <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/trip-details',
                        params: {
                            trip: JSON.stringify(latestTrip)
                        }
                    })}
                    style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 18
                    }}>
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                        fontFamily: 'outfit-medium',
                        fontSize: 16,
                    }}>View your plan  ☝️</Text>
                </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
                {remainingTrips.map((trip, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => router.push({
                            pathname: '/trip-details',
                            params: {
                                trip: JSON.stringify(trip)
                            }
                        })}
                    >
                        <UserTripCard key={index} trip={trip} onDelete={handleDelete} />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}
