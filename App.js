import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState } from 'react';
import AuthScreen from './src/screens/auth.screen';
import NotificationScreen from './src/screens/notification.screen';
import OrderDetailsScreen from './src/screens/orderDetails.screen';
import AllOrdersScreen from './src/screens/orders.screen';

const AuthContext = createContext();

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState();
  const [isAvailable, setIsAvailable] = useState(true);

  const handleGetAllOrders = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');

      const response = await axios.get('https://back-end-j1bi.onrender.com/api/v1/delivery/deliveryman', {
        headers: {
          'jwt': token
        }
      });

      setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, orders, setOrders, handleGetAllOrders, user, setUser, isAvailable, setIsAvailable }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={AllOrdersScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);