import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  return (
      <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor:Colors.PRIMARY
    }}>
          <Tabs.Screen name="mytrip"
              options={{
                  tabBarLabel:'My Trip',
                  tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color={color} />
              }}
          />
          <Tabs.Screen name="discover"
              options={{
                tabBarLabel:'Discover',
                tabBarIcon:({color})=><FontAwesome5 name="globe-americas" size={24} color="black" />
              }}
          />
          <Tabs.Screen name="profile"
              options={{
                tabBarLabel:'Profile',
                tabBarIcon:({color})=><FontAwesome name="user-circle" size={24} color="black" />
              }}
          />
    </Tabs>
  )
}