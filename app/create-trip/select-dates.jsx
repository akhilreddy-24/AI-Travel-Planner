import { View, Text, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const { tripData, setTripData } = useContext(CreateTripContext);

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, [navigation]);

  useEffect(() => {
    if (startDay && endDay) {
      console.log(`Selected Range: ${startDay} to ${endDay}`);
    }
  }, [startDay, endDay]);

  const handleDayPress = (day) => {
    if (startDay && !endDay) {
      const start = moment(startDay);
      const selectedDate = moment(day.dateString);
      const diffDays = selectedDate.diff(start, 'days');

      if (diffDays > 5) {
        Alert.alert("Selection Error", "You can only select a maximum of 5 days.");
        return;
      }

      const date = {};
      for (const d = start.clone(); d.isSameOrBefore(selectedDate); d.add(1, 'days')) {
        date[d.format('YYYY-MM-DD')] = {
          marked: true,
          color: 'black',
          textColor: 'white',
          startingDay: d.format('YYYY-MM-DD') === startDay,
          endingDay: d.format('YYYY-MM-DD') === day.dateString,
        };
      }

      setMarkedDates(date);
      setEndDay(day.dateString);
    } else {
      setStartDay(day.dateString);
      setEndDay(null);
      setMarkedDates({
        [day.dateString]: {
          marked: true,
          color: 'black',
          textColor: 'white',
          startingDay: true,
          endingDay: true,
        }
      });
    }
  };

  const onDateSelectionContinue = () => {
    if (startDay && endDay) {
      const start = moment(startDay);
      const end = moment(endDay);
      const totalNoOfDays = end.diff(start, 'days') + 1; // Adding 1 to include both start and end dates

      setTripData({
        ...tripData,
        startDate: startDay,
        endDate: endDay,
        totalNoOfDays:totalNoOfDays
      })

      router.push('/create-trip/select-budget');
      // Further logic for handling the date range can go here
    } else {
      ToastAndroid.show("Please select both start and end dates.",ToastAndroid.LONG);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        marginTop: 20
      }}>Travel Dates</Text>

      <View style={{
        marginTop: 20
      }}>
        <Calendar
          minDate={new Date()}
          style={{
            marginTop: 30
          }}
          onDayPress={handleDayPress}
          monthFormat={"yyyy MMM"}
          hideDayNames={false}
          markingType={'period'}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: 'black',
            selectedDayTextColor: 'white',
            monthTextColor: 'blue',
            dayTextColor: 'black',
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
            arrowColor: '#ff0000',
            dotColor: 'black',
          }}
        />
      </View>

      <TouchableOpacity
        onPress={onDateSelectionContinue}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          marginTop: 35,
          borderRadius: 15
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
