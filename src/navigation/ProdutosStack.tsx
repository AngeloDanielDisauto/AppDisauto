import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Produtos from '../screens/Produtos';
import DetalheProduto from '../screens/DetalheProduto';

export type ProdutoStackParamList = {
  ListaProdutos: undefined;
  DetalheProduto: { produto: any };
};

const Stack = createNativeStackNavigator<ProdutoStackParamList>();

export function ProdutosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaProdutos"
        component={Produtos}
        options={{ headerShown: false }} // sem header na lista
      />
      <Stack.Screen
        name="DetalheProduto"
        component={DetalheProduto}
        options={{
          title: 'Detalhes do Produto',
          headerShown: true, // mostra header apenas nos detalhes
        }}
      />
    </Stack.Navigator>
  );
}
