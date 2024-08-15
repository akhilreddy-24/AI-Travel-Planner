import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {
    const [photoRef, setPhotoRef] = useState();

    useEffect(() => {
        GetGooglePhotoRef();
    }, [])

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.name);
        setPhotoRef(result);
    }

    return (
        <View style={{
            marginRight: 20,
            width: 190,
            borderWidth: 1,
            borderRadius: 15,
            borderColor: Colors.LIGHT_GRAY
        }}>
            {photoRef ? (
                <Image source={{
                    uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                        + photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                }}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15
                    }}
                />
            ) : (
                <Image
                    source={require('./../../assets/images/placeholder.jpg')} // Fallback image
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15
                    }}
                />
            )}

            <View style={{
                padding: 5
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 17
                }}>{item.name}</Text>

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 120
                }}>
                    <Text style={{
                        fontFamily: 'outfit'
                    }}>⭐ {item.rating}     </Text>

                    <Text style={{
                        fontFamily: 'outfit'
                    }}>💰 {item.price}     </Text>
                </View>
            </View>
        </View>
    )
}
