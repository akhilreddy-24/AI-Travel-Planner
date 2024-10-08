import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function UserTripCard({ trip, onDelete }) {
    const formatData = (data) => JSON.parse(data);

    const handleDelete = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this trip?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => onDelete(trip.id) // Pass the trip ID to the delete function
                }
            ]
        );
    };

    return (
        <View style={{
            marginTop: 15,
            marginBottom:25,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 5,
            shadowColor: Colors.GRAY,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5, // Adds shadow for Android
        }}>
            <Image
                source={{
                    uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                        + formatData(trip.tripData).locationInfo?.photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                }}
                style={{ width: 100, height: 100, borderRadius: 15 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>
                    {trip.tripPlan?.travelPlan?.location}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>
                    {moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}
                </Text>
                <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>
                    Traveling: {formatData(trip.tripData).traveler.title}
                </Text>
            </View>
            <TouchableOpacity onPress={handleDelete} style={{ padding: 10 }}>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
}
