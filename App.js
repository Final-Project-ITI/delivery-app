import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from './src/screens/order.screen';
import AuthScreen from './src/screens/auth.screen';

// Create a context to manage authentication state
const AuthContext = createContext();

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen name="Orders" component={OrdersScreen} />
          ) : (
            <Stack.Screen name="Login" component={AuthScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
export const useAuth = () => useContext(AuthContext);
