import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

export default function ChatScreen({ darkMode }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;
        const newMessage = { text: input, sender: "user", timestamp: Date.now() };
        setMessages([...messages, newMessage]);
        setInput('');

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(input);
            const botMessage = { text: result.response.text(), sender: "bot", timestamp: Date.now() };
            setMessages([...messages, newMessage, botMessage]);

            await firestore().collection('chats').add(botMessage);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: darkMode ? "#333" : "#fff", padding: 20 }}>
            <ScrollView>
                {messages.map((msg, index) => (
                    <Text key={index} style={{ color: msg.sender === "user" ? "blue" : "green" }}>{msg.text}</Text>
                ))}
            </ScrollView>
            <TextInput value={input} onChangeText={setInput} style={{ borderWidth: 1, padding: 10, marginVertical: 10 }} />
            <TouchableOpacity onPress={sendMessage}><Text>Send</Text></TouchableOpacity>
        </View>
    );
                            }
