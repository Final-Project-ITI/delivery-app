import React, { useEffect, useState } from 'react';

import { MaterialIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../App';
import socket from '../socket';

const NotificationScreen = ({ route, navigation }) => {
    const [notfication, setNotification] = useState([]);
    const { handleGetAllOrders } = useAuth();

    const handleGetNotification = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');

            const response = await axios.get('https://back-end-j1bi.onrender.com/api/v1/notification/delivery', {
                headers: {
                    'jwt': token
                }
            });

            setNotification(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleGetNotification();
    }, []);

    const handleOnAccept = async (orderId) => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const url = 'https://back-end-j1bi.onrender.com/api/v1/delivery/' + orderId + '/accept';

            await axios.patch(url, {}, {
                headers: {
                    'jwt': token
                }
            });

            socket.emit("change-delivery", null);

            setNotification([]);
            handleGetAllOrders();
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notifications</Text>
                <MaterialIcons name="notifications-none" size={24} color="black" />
            </View>

            <FlatList
                data={notfication}
                renderItem={({ item }) =>
                    <View style={styles.notificationCard}>
                        <Image source={{ uri: item.notificationType.restaurantIcon }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>New Order</Text>
                            <Text style={styles.restaurantName}>{item.notificationType.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => handleOnAccept(item.orderId)}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={n => n._id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2e4d9',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8efe5',
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    restaurantName: {
        fontSize: 14,
        color: '#ff6347',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ff6347',
        borderRadius: 5,
        marginLeft: 5,
    },
    declineButton: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default NotificationScreen;
