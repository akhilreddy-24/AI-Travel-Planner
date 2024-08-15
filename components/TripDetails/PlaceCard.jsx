import { View, Text, Image, TouchableOpacity, StyleSheet,Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function PlaceCard({ plan, dayIndex }) {
    // State to hold photo references for activities
    const [photoRefs, setPhotoRefs] = useState({});

    useEffect(() => {
        // Fetch photo references for each activity when component mounts
        fetchPhotoRefs();
    }, []);

    const fetchPhotoRefs = async () => {
        const newPhotoRefs = {};
        for (const activity of plan.schedule) {
            const result = await GetPhotoRef(activity.activity);
            newPhotoRefs[activity.activity] = result;
        }
        setPhotoRefs(newPhotoRefs);
    };

    const openInMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error('Error opening Google Maps', err));
    };

    return (
        <View key={dayIndex}>
            <Text style={styles.dayText}>Day {plan.day}</Text>
            {plan.schedule.map((activity, activityIndex) => (
                <View key={activityIndex} style={styles.card}>
                    <Image
                        source={{
                            uri: photoRefs[activity.activity]
                                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[activity.activity]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                                : 'https://via.placeholder.com/400x150.png?text=No+Image'
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.activityTitle}>{activity.activity}</Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>{activity.details}</Text>
                        <Text style={styles.timeText}>Time: {activity.time}</Text>
                        <View style={styles.infoContainer}>
                            <View>
                                <Text style={styles.ticketText}>🎟️ Ticket Pricing: <Text style={styles.ticketPricing}>{activity.ticketPricing}</Text></Text>
                                <Text style={styles.travelText}>🕒 Time to Travel: <Text style={styles.travelTime}>{activity.timeToTravel}</Text></Text>
                            </View>
                            <TouchableOpacity
                                style={styles.mapButton}
                                onPress={() => openInMaps(activity.geoCoordinates.latitude, activity.geoCoordinates.longitude)}
                            >
                                <Ionicons name="navigate-circle" size={35} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    dayText: {
        fontFamily: 'outfit-medium',
        fontSize: 20,
        marginTop: 20,
    },
    card: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        borderColor: Colors.LIGHT_GRAY,
        marginBottom: 30,
        backgroundColor: Colors.LAVENDAR,
    },
    image: {
        width: '100%',
        height: 170,
        borderRadius: 15,
        marginTop: 5,
    },
    activityTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginTop: 10,
    },
    detailsContainer: {
        marginTop: 5,
    },
    detailsText: {
        fontFamily: 'outfit',
        fontSize: 17,
        color: Colors.GRAY,
    },
    timeText: {
        fontSize: 17,
        marginTop: 5,
        fontFamily: 'outfit-medium',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ticketText: {
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 5,
    },
    ticketPricing: {
        fontFamily: 'outfit-medium',
    },
    travelText: {
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 5,
    },
    travelTime: {
        fontFamily: 'outfit-medium',
    },
    mapButton: {
        backgroundColor: Colors.LAVENDAR,
        padding: 5,
        borderRadius: 20,
    },
});
