import React, { useEffect, useState } from 'react';
import { Button, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import SwitchWithIcon from '../components/SwitchWithIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from '../../App';
import Logout from '../components/Logout';

const OrdersScreen = ({ navigation }) => {
    const { orders, setOrders, handleGetAllOrders, user } = useAuth();

    const handleDate = (date) => {
        date = new Date(date);
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        const [month, day, time, period] = formattedDate.replace(',', '').split(' ');
        return `${month} - ${day} / ${time} ${period}`;
    }

    useEffect(() => {
        handleGetAllOrders();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <SwitchWithIcon navigation={navigation} />
            <ScrollView style={styles.orderList}>
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <View style={styles.orderItem}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <View alignItems={"flex-start"}>
                                <Text style={styles.itemHeaderText}>{item.restaurant.name}</Text>
                                <Text>{handleDate(item.assignedAt)}</Text>
                            </View>
                            <View alignItems={"center"} marginRight={30}>
                                <Text style={styles.itemHeaderText}>{item.orderId.statusId.status}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 16,
                        }}>
                            <View alignItems={"flex-start"}>
                                <Text style={styles.itemHeaderText}>Client Address</Text>
                                <Text style={{
                                    width: 200
                                }}>{item.orderId.addressId.details}</Text>
                            </View>
                            <View alignItems={"center"}>
                                {/* <Button title="Details" onPress={() => navigation.navigate('OrderDetails')} /> */}

                                <Pressable onPress={() => navigation.navigate('OrderDetails', {
                                    item
                                })}>
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
                    </View>}
                    keyExtractor={item => item.id}
                />

            </ScrollView>

            <Logout />
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
        color: "#D74339",
        textTransform: "capitalize"
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
