import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../App';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import socket from '../socket';


const Logout = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const { setIsAuthenticated, setUser, user, isAuthenticated } = useAuth();

    const handleOnLogout = () => {
        setModalVisible(true);
    }

    const handleOnCancel = () => {
        setModalVisible(false);
    }

    const handleChangeStatus = async () => {
        try {
            const token = await SecureStore.getItemAsync('token');
            const url = 'https://back-end-j1bi.onrender.com/api/v1/deliveryman/' + user._id;

            const response = await axios.patch(url, {
                status: "offline"
            }, {
                headers: {
                    "jwt": token
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleOnYes = async () => {
        await handleChangeStatus();
        setIsAuthenticated(false);
        setUser({})
        await SecureStore.deleteItemAsync("token");
        socket.emit("change-delivery", null);


        setModalVisible(false);
        navigation.navigate('Login');
    }

    return (
        <>
            <View style={styles.container} justifyContent={"center"}>
                <Pressable alignItems={"center"} onPress={handleOnLogout}>
                    <MaterialIcons name="logout" size={16} color="#d9534f" />
                    <Text>Logout</Text>
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Warning</Text>
                            <Text style={styles.modalText}>Are you sure you want to log out ?</Text>

                            <View flexDirection={"row"} style={styles.btnsContainer}>
                                <TouchableOpacity style={styles.yesButton} onPress={handleOnYes}>
                                    <Text style={styles.buttonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={handleOnCancel}>
                                    <Text style={{
                                        ...styles.buttonText,
                                        color: "#F3ECE5"
                                    }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EADFCF',
        borderRadius: 10,
        padding: 20,
    },
    modalView: {
        justifyContent: "center",
        alignItems: "center",
        height: 700
    },
    modalContainer: {
        elevation: 10,

        backgroundColor: '#F3ECE5',
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        height: 150
    },
    modalText: {
    },
    modalTitle: {
        color: '#D74339',
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    btnsContainer: {
        marginTop: 10,
        justifyContent: "space-between",
        width: 200
    },
    yesButton: {
        border: '#D74339',
        borderWidth: 2,
        borderColor: "#D74339",
        width: 75,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
        alignItems: "center"
    },
    cancelButton: {
        backgroundColor: '#D74339',
        width: 75,
        padding: 5,
        borderRadius: 5,
        marginRight: 10,
        alignItems: "center"
    },
    buttonText: {
        color: '#D74339',
        fontSize: 16,
    },
});

export default Logout;