import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';



export default function SignUp() {

    const navigation = useNavigation();
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    useEffect(() => {
        navigation.setOptions({
            headerShown:false
        })
    }, [])
    
    const onCreateAccount = () => {

        if (!email && !password && !name) {
            ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
      const user = userCredential.user;
      router.replace('/mytrip');
      

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    // ..
  });
    }

  return (
      <View
          style={{
              padding: 25,
              paddingTop: 70,
              backgroundColor:Colors.WHITE
          }}
      >
          <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
      <Text style={{
            fontFamily: 'outfit-bold',
            fontSize:30,
            marginTop:30
          }}>SignUp</Text>

        {/* Username*/}
          <View style={{
              marginTop:40
          }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Name</Text>
              <TextInput style={styles.input}
                  placeholder='Enter Name'
                  onChangeText={(value)=>setName(value)}
              />
          </View>

          {/* Email */}
          <View style={{
              marginTop:20
          }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Email</Text>
              <TextInput style={styles.input}
                  placeholder='Enter Email'
                  onChangeText={(value)=>setEmail(value)}
              />
          </View>

          {/* Password */}
          <View style={{
              marginTop:20
          }}>
              <Text style={{
                  fontFamily: 'outfit',
              }}>Password</Text>
              <TextInput secureTextEntry={true}
                  style={styles.input}
                  placeholder='Enter Password'
                  onChangeText={(value)=>setPassword(value)}
              />
          </View>

          {/* Create Account Button */}
          <TouchableOpacity onPress={onCreateAccount} style={{
              padding: 20,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 15,
              marginTop:50,
          }}>
              <Text style={{
                  color: Colors.WHITE,
                  textAlign:'center'
              }}>Create account</Text>
          </TouchableOpacity>

          {/*Sign In Button */}
          <TouchableOpacity
              onPress={() => router.replace('auth/sign-in')}
              style={{
              padding: 20,
              backgroundColor: Colors.WHITE,
              borderRadius: 15,
              marginTop: 20,
              borderWidth:1
          }}>
              <Text style={{
                  color: Colors.PRIMARY,
                  textAlign:'center'
              }}>Sign In</Text>
          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        fontFamily:'outfit'
    }
})
