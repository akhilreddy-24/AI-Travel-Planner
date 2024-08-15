import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';


export default function ReviewTrip() {

    const navigation = useNavigation();
    const router = useRouter();

    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    }, [])

  return (
      <ScrollView style={{
          padding: 25,
          paddingTop: 85,
          backgroundColor: Colors.WHITE,
          height:'100%'
    }}>
          <Text style={{
              fontFamily: 'outfit-bold',
              fontSize: 35,
              marginTop:20
          }}>Review your trip</Text>
          
          <View style={{
              marginTop:20
          }}>
              <Text style={{
                  fontFamily: 'outfit-medium',
                  fontSize:20
              }}>Before generating your trip, please review your selection</Text>

              {/*Destination Info*/}
              <View style={{
                  marginTop: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  gap:20
              }}>
                  <Text style={{
                      fontSize:30
                  }}>📍</Text>
                  <View>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                          color:Colors.GRAY
                      }}>Destination</Text>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                      }}>{tripData?.locationInfo?.name}</Text>
                  </View>
              </View>

              {/*Date Selected Info*/}
              <View style={{
                  marginTop: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  gap:20
              }}>
                  <Text style={{
                      fontSize:30
                  }}>🗓️</Text>
                  <View>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                          color:Colors.GRAY
                      }}>Travel Date</Text>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                      }}>{moment(tripData?.startDate).format('DD MMM')
                            + " To " +
                            moment(tripData?.endDate).format('DD MMM')+"  "}
                            ({tripData.totalNoOfDays} days)
                        </Text>
                  </View>
              </View>

              {/*Traveler Info*/}
              <View style={{
                  marginTop: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  gap:20
              }}>
                  <Text style={{
                      fontSize:30
                  }}>🚙</Text>
                  <View>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                          color:Colors.GRAY
                      }}>Who is Traveling</Text>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                      }}>
                          {tripData?.traveler?.title}
                        </Text>
                  </View>
              </View>

              {/*Budget Info*/}
              <View style={{
                  marginTop: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  gap:20
              }}>
                  <Text style={{
                      fontSize:30
                  }}>💰</Text>
                  <View>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                          color:Colors.GRAY
                      }}>Budget</Text>
                      <Text style={{
                          fontFamily: 'outfit',
                          fontSize: 20,
                      }}>
                          {tripData?.budget}
                        </Text>
                  </View>
              </View>

              <TouchableOpacity
              onPress={()=>router.replace('/create-trip/generate-trip')}
            style={{
              padding: 15,
              backgroundColor: '#7F00FF',
              marginTop: 50,
              borderRadius: 20
            }}
            
          >
            <Text style={{
              textAlign: 'center',
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 20
            }}>Build My trip   ✨</Text>
          </TouchableOpacity>
          </View>
    </ScrollView>
  )
}