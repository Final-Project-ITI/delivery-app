import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import SwitchWithIcon from '../components/SwitchWithIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';

const OrderDetailsScreen = ({ route, navigation }) => {
    const [status, setStatus] = useState('Picked Up');
    const { item } = route.params;


    const handleCalcTotal = () => {
        let total = 0;

        for (var i = 0; i < item.items.length; i++) {
            total += item.items[i].productId.price * item.items[i].quantity;
        }

        return total;
    }

    const handleCalcQny = () => {
        let qnt = 0;

        for (var i = 0; i < item.items.length; i++) {
            qnt += item.items[i].quantity;
        }

        return qnt;
    }
    return (
        <>
            <SafeAreaView style={{
                backgroundColor: '#F3ECE4',
            }}>
                <SwitchWithIcon navigation={navigation} />
            </SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Restaurant Details</Text>
                    <Text style={styles.sectionText}>{item.restaurant.name}</Text>
                    <Text style={styles.sectionText}><Text style={{
                        fontWeight: "700"
                    }}>
                        Address:
                    </Text> {item.restaurant.address}</Text>
                    <Text style={styles.sectionText}><Text style={{
                        fontWeight: "700"
                    }}>
                        Phone:
                    </Text> {item.restaurant.phone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Client Details</Text>
                    <Text style={styles.sectionText}>{item.orderId.userId.fullName}</Text>
                    <Text style={styles.sectionText}><Text style={{
                        fontWeight: "700"
                    }}>
                        Address:
                    </Text> {item.orderId.addressId.details}</Text>
                    <Text style={styles.sectionText}><Text style={{
                        fontWeight: "700"
                    }}>
                        Phone:
                    </Text> {item.orderId.phoneId.phoneNumber}</Text>
                </View>



                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    <FlatList
                        data={item.items}
                        renderItem={(q) =>
                            <View style={styles.orderItem}>
                                <Text style={styles.orderItemText}>{q.item.productId.title}</Text>
                                <Text style={styles.orderItemText}>Qty: {q.item.quantity}</Text>
                                <Text style={styles.orderItemText}>EGP {q.item.productId.price * q.item.quantity}</Text>
                            </View>}
                        keyExtractor={item => item.id}
                    />
                    <View style={styles.total}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalText}>Qty: {handleCalcQny()}</Text>
                        <Text style={styles.totalText}>EGP {handleCalcTotal()}</Text>
                    </View>
                    <Text style={styles.paymentStatus}>Payment Status: <Text style={{
                        textTransform: "capitalize"
                    }}>
                        {item.orderId.paymentStatusId.status}
                    </Text></Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Status</Text>
                    <RadioButton.Group onValueChange={value => setStatus(value)} value={status}>
                        <View style={styles.radioButton}>
                            <RadioButton value="Picked Up" />
                            <Text>Picked Up</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton value="On The Way" />
                            <Text>On The Way</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton value="Delivered" />
                            <Text>Delivered</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton value="Paid" />
                            <Text>Paid</Text>
                        </View>
                    </RadioButton.Group>
                </View>
            </ScrollView>
        </>
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
    availability: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        marginRight: 10,
    },
    notification: {
        marginLeft: 10,
    },
    notificationText: {
        fontSize: 20,
    },
    section: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f8efe5',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        marginBottom: 5,
        maxWidth: 250
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderItemText: {
        fontSize: 14,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        marginTop: 10,
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentStatus: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default OrderDetailsScreen;
