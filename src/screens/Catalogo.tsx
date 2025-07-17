import React, { useState } from "react";
import { View, TextInput, Text, Image, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import produtos from "../data/produtos";
import ProdutoListaCatalogo from "../components/ProdutoListaCatalogo";

export default function Catalogo() {
  const [busca, setBusca] = useState('');

  // Filtra os produtos
  const filteredProdutos = produtos.filter((produto) =>
    produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    produto.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom', 'left', 'right']}>

      {/* Campo de busca */}
      <View style={styles.buscaContainer}>
        <TextInput
          placeholder="Pesquisar por código ou descrição..."
          value={busca}
          onChangeText={setBusca}
          style={styles.buscaInput}
        />
      </View>

      {/* Lista filtrada */}
      <FlatList
        data={filteredProdutos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProdutoListaCatalogo produto={item} />}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buscaContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  buscaInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});