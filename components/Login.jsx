import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {

    const router = useRouter();
  return (
      <View>
          
          <Image source={require('./../assets/images/login.png')}
              style={{
                  height: 415,
                  width: 400,
                  bottom: 45,
              }}
          />

          <View style={styles.container}>
              <Text style={{
                  fontSize: 28,
                  fontFamily: 'outfit-bold',
                  top: 20,
                  textAlign:'center'
              }}>
                  AI Travel Planner
              </Text>

              <Text style={{
                  fontFamily:'outfit',
                  fontSize: 17,
                  textAlign: 'center',
                  color: Colors.GRAY,
                  top:40
              }}>
                  Discover your next adventure effortlessly. Personalized itineraries at your fingertips.
                  Travel smarter with AI-driven insights
              </Text>

              <TouchableOpacity style={styles.button}
                  onPress={() => router.push('auth/sign-in')}
              >
                  <Text
                      style={{
                          color: Colors.WHITE,
                          textAlign: 'center',
                          fontFamily: 'outfit',
                          fontSize:17
                      }}
                  > Get Started</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        borderTopLeftRadius: 33,
        borderTopRightRadius: 33,
        top:-40
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius:99,
        marginTop: '20%',
        marginLeft: 30,
        marginRight: 30,
        top:40
    }
})