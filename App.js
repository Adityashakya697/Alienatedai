import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { initializeApp } from 'firebase/app';
import ChatScreen from './components/ChatScreen';
import AuthScreen from './components/AuthScreen';
import ThemeToggle from './components/ThemeToggle';
import { firebaseConfig } from './firebaseConfig';

initializeApp(firebaseConfig);

export default function App() {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(setUser);
        return subscriber;
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? "#222" : "#fff" }}>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            {user ? <ChatScreen darkMode={darkMode} /> : <AuthScreen />}
        </View>
    );
}