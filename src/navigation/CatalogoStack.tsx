import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Catalogo from '../screens/Catalogo';
import DetalheProduto from '../screens/DetalheProduto';

export type CatalogoStackParamList = {
  CatalogoScreen: undefined;
  DetalheProduto: { produto: any };
};

const Stack = createNativeStackNavigator<CatalogoStackParamList>();

export function CatalogoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CatalogoScreen"
        component={Catalogo}
        options={{ headerShown: false }} // ✅ sem header na lista
      />
      <Stack.Screen
        name="DetalheProduto"
        component={DetalheProduto}
        options={{
          title: 'Detalhes do Produto',
          headerShown: true, // ✅ mostra header apenas nos detalhes
        }}
      />
    </Stack.Navigator>
  );
}
