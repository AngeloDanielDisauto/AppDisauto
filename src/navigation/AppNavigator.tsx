import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { CatalogoStack } from './CatalogoStack';
import Orcamento from '../screens/Orcamento';
import Perfil from '../screens/Perfil';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Catalogo') {
              iconName = 'list';
            } else if (route.name === 'Orcamento') {
              iconName = 'cart-outline';
            } else if (route.name === 'Perfil') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen
          name="Catalogo"
          component={CatalogoStack}
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'CatalogoScreen';

            if (routeName === 'DetalheProduto') {
              return {
                tabBarStyle: { display: 'none' },
              };
            }

            return {
              tabBarStyle: undefined,
            };
          }}
        />

        <Tab.Screen 
          name="Orcamento" 
          component={Orcamento} 
        />

        <Tab.Screen 
          name="Perfil" 
          component={Perfil} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
