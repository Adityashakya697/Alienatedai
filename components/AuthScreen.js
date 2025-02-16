import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function AuthScreen() {
    const handleLogin = async () => {
        try {
            await auth().signInAnonymously();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Alienated AI</Text>
            <TouchableOpacity onPress={handleLogin}><Text>Login</Text></TouchableOpacity>
        </View>
    );
}
