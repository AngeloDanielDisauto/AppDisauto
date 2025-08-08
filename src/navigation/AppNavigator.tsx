import React, { useCallback } from 'react';

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../context/AuthContext';
import Login from '../screens/Login';
import AppTabs from './AppTabs'
import Contato from '../screens/Contato';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, isLoading } = useAuth();


  return (
      <NavigationContainer>
        <StatusBar style='auto' hidden={false} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="App" component={AppTabs} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
          <Stack.Screen name="Contato" component={Contato} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
