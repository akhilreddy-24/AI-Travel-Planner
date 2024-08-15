import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { SelectTravelerList } from '../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveler() {

  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveler: selectedTraveler });
  }, [selectedTraveler]);



  const handleContinue = () => {
    if (!selectedTraveler) {
      ToastAndroid.show("Please select a traveler", ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('create-trip/select-dates');
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 85,
      backgroundColor: Colors.WHITE,
      height: '100%',
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily: 'outfit-bold',
        marginTop: 10
      }}>Who's Traveling</Text>

      <View style={{
        marginTop: 10
      }}>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 23,
          marginBottom: 10,
        }}>Choose your travelers</Text>

        <FlatList
          data={SelectTravelerList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 8,
              }}>
              <OptionCard option={item} selectedOption={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          marginTop: 20,
          borderRadius: 20
        }}>
        <Text style={{
          textAlign: 'center',
          color: Colors.WHITE,
          fontFamily: 'outfit-medium',
          fontSize: 20
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
