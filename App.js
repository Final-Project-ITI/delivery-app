import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import AuthScreen from './src/screens/auth.screen';
import OrderDetailsScreen from './src/screens/orderDetails.screen';
import AllOrdersScreen from './src/screens/orders.screen';
import NotificationScreen from './src/screens/notification.screen';

const AuthContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, }}>
    <Tab.Screen name="All Orders" component={AllOrdersScreen} />
    <Tab.Screen name="Order Details" component={OrderDetailsScreen} />
    <Tab.Screen name="Log Out" component={AllOrdersScreen} />
  </Tab.Navigator>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Login" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);