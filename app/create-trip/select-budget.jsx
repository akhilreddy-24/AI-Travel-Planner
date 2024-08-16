import { View, Text, FlatList, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectBudget() {

    const navigation = useNavigation();
    const router = useRouter();

    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle:''
        })
    })

    useEffect(() => {
        selectedOption && setTripData({
            ...tripData,
            budget: selectedOption?.title,
        })
    }, [selectedOption])

    const handleContinuePress = () => {
        if (selectedOption) {
            router.push('/create-trip/review-trip');
        } else {
            ToastAndroid.show("Please select your budget!", ToastAndroid.LONG);
        }
    };

  return (
      <View style={{
        padding: 25,
        paddingTop: 85,
        backgroundColor: Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:10
      }}>
        Budget
      </Text>
          
      <View style={{
        marginTop:20,
      }}>
          <Text style={{
              fontFamily: 'outfit-medium',
              fontSize:20
            }}>
                Choose spending habits for your trip
          </Text>
              
          <FlatList
              marginTop={20}
              data={SelectBudgetOptions}
              renderItem={({ item, index }) => (
                  <TouchableOpacity style={{ marginVertical: 10, marginTop: 10 }}
                      onPress={()=>setSelectedOption(item)}
                  >
                      <OptionCard option={item} selectedOption={selectedOption} />
                  </TouchableOpacity>
              )}
          />

          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: Colors.PRIMARY,
              marginTop: 35,
              borderRadius: 15
            }}
            onPress={handleContinuePress}
          >
            <Text style={{
              textAlign: 'center',
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 20
            }}>Continue</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
