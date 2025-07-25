import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Produto } from "../data/types";

interface ProdutoListaCatalogo {
  produto: Produto;
}

export default function ProdutoListaCatalogo ({produto} ) {
  const navigation = useNavigation() as any;

  const handlePress = () => {
    navigation.navigate("DetalheProduto", { produto });
  };

  return ( 
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.textoNegrito}>{produto.codigo}</Text>
      <Text style={styles.textoNegrito}>{produto.descricao}</Text>
      <Text style={styles.preco}>R$ {produto.preco_bruto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EEEEEE',
    padding: 12,
    marginVertical: 4,
    borderRadius: 6,
  },
  textoNegrito: {
    fontWeight: 'bold',
    color: '#000',
  },
  preco: {
    fontWeight: 'bold',
    color: 'green',
  },
});
