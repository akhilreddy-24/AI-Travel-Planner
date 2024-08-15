import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, ScrollView } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';

export default function Profile() {
    const user = auth.currentUser;
    const [profilePic] = useState(user?.photoURL || 'https://avatars.dicebear.com/api/initials/default.svg');
    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [bio, setBio] = useState('');

    const handleSave = async () => {
        try {
            await updateProfile(user, { displayName: name });
            ToastAndroid.show('Profile updated successfully!', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error updating profile:', error);
            ToastAndroid.show('Failed to update profile.', ToastAndroid.LONG);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.profileIcon}>
                <FontAwesome name="user-circle" size={100} color='#007bff' />
                </View>
                <Text style={styles.changePicText}>Profile</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    editable={false}
                />
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={styles.input}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Add a short bio"
                    multiline
                />
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    padding: 20,
        marginTop:50
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changePicText: {
        color: '#007bff',
        marginTop: 10,
        fontSize: 14,
    },
    infoContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop:-14
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
