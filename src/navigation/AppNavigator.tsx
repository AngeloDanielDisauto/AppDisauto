import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import { CatalogoStack } from './CatalogoStack';
import Orcamento from '../screens/Orcamento';
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
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Catalogo') iconName = 'list';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />

        {/* Detecta a rota interna do Stack */}
        <Tab.Screen
          name="Catalogo"
          component={CatalogoStack}
          options={({ route }) => {
            //lógica para esconder a TabBar em DetalhesProduo
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'CatalogoScreen';

            // Se está em DetalheProduto, esconde a TabBar
            if (routeName === 'DetalheProduto') {
              return {
                tabBarStyle: { display: 'none' },
              };
            }

            // Caso contrário, mostra normalmente
            return {
              tabBarStyle: undefined,
            };
          }}
        />

        <Tab.Screen name="Orcamento" component={Orcamento} />
      </Tab.Navigator>


    </NavigationContainer>
  );
}
