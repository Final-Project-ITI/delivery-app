import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notifications</Text>
                <MaterialIcons name="notifications-none" size={24} color="black" />
            </View>

            <View style={styles.notificationCard}>
                <Image source={require('../../assets/alsaraya.png')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>New Order</Text>
                    <Text style={styles.restaurantName}>Alsaraya</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.declineButton]}>
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.notificationCard}>
                <Image source={require('../../assets/alsaraya.png')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>New Order</Text>
                    <Text style={styles.restaurantName}>Alsaraya</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.declineButton]}>
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
            </View>
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
