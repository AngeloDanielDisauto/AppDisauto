import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { ProdutoComEstoque } from "../data/types";

// precisa receber o produto com as propriedades que vem do banco de dados 
interface Props {
  produto: ProdutoComEstoque;
}

export default function ProdutoListaCatalogo({ produto }: Props) {
  const navigation = useNavigation() as any;
  const precoBrutoProduto = Math.ceil(parseFloat(produto.preco_bruto.replace(',', '.')) * 0.5 * 0.9 * 100) / 100;


  const handlePress = () => {
    navigation.navigate("DetalheProduto", { produto });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.txtCodigo}>{produto.codigo}</Text>
      <Text style={styles.txtDescricao}>{produto.descricao}</Text>
      <Text style={styles.txtPreco}>R$ {precoBrutoProduto.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#EEEEEE',
    padding: 12,
  },
  txtCodigo: {
    fontWeight: 'bold',
    color: '#000',
    width: "14%",
  },
  txtDescricao: {
    textAlign: "center",
    width: "66%",
    paddingHorizontal: 3,
    height: 20,
    overflow: 'hidden',
  },
  txtPreco: {
    fontWeight: 'bold',
    color: 'green',
    width: "19%",
  },
});
