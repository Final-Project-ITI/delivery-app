import React, { useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import SwitchWithIcon from '../components/SwitchWithIcon';
import { SafeAreaView } from 'react-native-safe-area-context';


const OrdersScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    const toggleAvailability = () => {
        setIsAvailable(previousState => !previousState);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>{isAvailable ? 'All Orders' : "I'm Not Available"}</Text>
                <View style={styles.toggleContainer}>
                    <Switch
                        onValueChange={toggleAvailability}
                        value={isAvailable}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Text style={styles.notificationIcon}>🔔</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            <SwitchWithIcon navigation={navigation} />
            <ScrollView style={styles.orderList}>
                <View style={styles.orderItem}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <View alignItems={"flex-start"}>
                            <Text style={styles.itemHeaderText}>Alsaraya</Text>
                            <Text>Order ID: 23</Text>
                        </View>
                        <View alignItems={"center"}>
                            <Text style={styles.itemHeaderText}>New</Text>
                            <Text>You Have New Order</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 16,
                    }}>
                        <View alignItems={"flex-start"}>
                            <Text style={styles.itemHeaderText}>Client Address</Text>
                            <Text>10 Hamada Street, Alvillar</Text>
                        </View>
                        <View alignItems={"center"}>
                            {/* <Button title="Details" onPress={() => navigation.navigate('OrderDetails')} /> */}

                            <Pressable onPress={() => {
                                console.log("Details button pressed")
                            }}>
                                <View style={{
                                    borderColor: "#D74339",
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    backgroundColor: "#F3ECE4"
                                }} marginRight={30}>
                                    <Text style={{
                                        color: "#D74339"
                                    }}>Details</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>New Order</Text>
                    <View style={styles.notificationItem}>
                        <Text>Alsaraya</Text>
                        <View style={styles.buttonGroup}>
                            <Button title="Accept" onPress={() => setModalVisible(false)} />
                            <Button title="Decline" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                    <View style={styles.notificationItem}>
                        <Text>Alsaraya</Text>
                        <View style={styles.buttonGroup}>
                            <Button title="Accept" onPress={() => setModalVisible(false)} />
                            <Button title="Decline" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3ECE4',
    },
    header: {
        padding: 20,
        backgroundColor: '#E8DCCC',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#D74339"
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationIcon: {
        marginLeft: 10,
        fontSize: 20,
    },
    orderList: {
        padding: 20,
    },
    orderItem: {
        padding: 15,
        backgroundColor: '#E8DCCC',
        marginBottom: 15,
        borderRadius: 5,
    },
    itemHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#D74339"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    buttonGroup: {
        flexDirection: 'row',
    },
});

export default OrdersScreen;
