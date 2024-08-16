import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            GetMyTrips();
        }
    }, [user]);

    const GetMyTrips = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'UserTrips'),
                where("userEmail", "==", user.email),
            );
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUserTrips(trips);
        } catch (error) {
            console.error("Error getting documents: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={{
            padding: 25,
            paddingTop: 55,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 35
                }}>
                    My Trips
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/create-trip/search-place')}
                    style={{ marginRight: 5 }}
                >
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
            </View>
            
            {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
            {userTrips.length === 0 ?
                <StartNewTripCard /> :
                <UserTripList userTrips={userTrips} />
            }
        </ScrollView>
    );
}
