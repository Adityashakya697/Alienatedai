import React from 'react';
import { View, Switch, Text } from 'react-native';

export default function ThemeToggle({ darkMode, setDarkMode }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Text style={{ color: darkMode ? "white" : "black" }}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
        </View>
    );
  }
