import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, TextInput, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import produtosInicial from "../data/produtos";
import ProdutoListaCatalogo from "../components/ProdutoListaCatalogo";

export default function Catalogo() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState(produtosInicial);



  // Filtra os produtos


  async function handleBusca() {
    const baseApi = 'https://apibancosql.onrender.com/produtos/busca?codigo=';

    await axios.get(baseApi+busca)
    .then(res => setProdutos(res.data))
    .catch(err => console.error(err));

  }

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
        <TouchableOpacity
          onPress={handleBusca}
        >
          <Text>Enviar</Text>
        </TouchableOpacity>

      </View>

      {/* Lista filtrada */}
      <FlatList
        data={produtos}
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