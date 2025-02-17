import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AppState } from 'react-native';
import { Switch } from 'react-native-switch';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../App';
import socket from '../socket';

const SwitchWithIcon = (
    { navigation }
) => {
    const { user, isAvailable, setIsAvailable } = useAuth();
    const toggleAvailability = () => {
        setIsAvailable(previousState => !previousState);
    };

    const handleChangeStatus = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const url = 'https://back-end-j1bi.onrender.com/api/v1/deliveryman/' + user._id;

            const response = await axios.patch(url, {
                status: isAvailable ? "online" : "offline"
            }, {
                headers: {
                    "jwt": token
                }
            });

            socket.emit("change-delivery", null);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleChangeStatus();
    }, [isAvailable])

    return (
        <View style={styles.container} justifyContent={"space-between"}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: "#D74339"
            }}>All Orders</Text>
            <View style={styles.switchContainer} justifyContent={"space-between"}>
                <Text style={{ ...styles.switchText, color: isAvailable ? "green" : "red" }}>{isAvailable ? "I'm Available" : "I'm Not Available"}</Text>
                <Switch
                    onValueChange={toggleAvailability}
                    value={isAvailable}
                    disabled={false}
                    activeText={''}
                    inActiveText={''}
                    circleSize={20}
                    barHeight={20}
                    circleBorderWidth={0}
                    backgroundActive={'#E0D5CC'}
                    backgroundInactive={'#E0D5CC'}
                    circleActiveColor={'#000'}
                    circleInActiveColor={'#000'}
                    changeValueImmediately={true}
                    innerCircleStyle={styles.innerCircleStyle}
                    outerCircleStyle={styles.outerCircleStyle}
                    renderActiveText={false}
                    renderInActiveText={false}
                />
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Notification')}>
                <FontAwesome name="bell" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EADFCF',
        padding: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8EEE5',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        width: 180
    },
    switchText: {
        fontSize: 14,
        marginRight: 10,
    },
    iconContainer: {
        backgroundColor: '#F8EEE5',
        padding: 10,
        borderRadius: 10,
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    circleText: {
        color: '#FFF',
        fontSize: 12,
    },
    innerCircleStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    outerCircleStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SwitchWithIcon;