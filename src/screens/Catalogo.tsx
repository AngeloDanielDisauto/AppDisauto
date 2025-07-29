import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, TextInput, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import { ProdutoComEstoque } from "../data/types";
import ProdutoListaCatalogo from "../components/ProdutoListaCatalogo";

export default function Catalogo() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<ProdutoComEstoque[]>([]);
  const [filtroBusca, setFiltroBusca] = useState('todos');
  const baseApiBusca = 'https://apibancosql.onrender.com/produtos/busca?';



  // função para busca de produtos

  async function handleBusca() {

    switch (filtroBusca) {
      case 'todos':
        buscaTodos();
        break;

      case 'codDisauto':
        buscaCodDisauto();
        break;

      case 'codIndustria':
        buscaCodIndustria();
        break;

      case 'codOriginal':
        buscaCodOriginal();
        break;

      default:
        buscaTodos();
    }
  }
  // busca por todos os campos
  async function buscaTodos() {
    await axios.get(baseApiBusca + 'todos=' + busca)
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }
  // busca por código disauto
  async function buscaCodDisauto() {
    await axios.get(baseApiBusca + 'codDisauto=' + busca)
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }
  // busca por código da industria ('referencia' no banco de dados)
  async function buscaCodIndustria() {
    await axios.get(baseApiBusca + 'codIndustria=' + busca)
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }
  // busca por código original ('dado5' no banco de dados)
  async function buscaCodOriginal() {
    await axios.get(baseApiBusca + 'codOriginal=' + busca)
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'bottom', 'left', 'right']}>

      {/* Campo de busca */}
      <View style={styles.buscaContainer}>

        <Picker
          selectedValue={filtroBusca}
          onValueChange={(value) => setFiltroBusca(value)}
          style={styles.escolhaBusca}
        >
          <Picker.Item label="Todos" value="todos" />
          <Picker.Item label="Código Disauto" value="codDisauto" />
          <Picker.Item label="Código Industria" value="codIndustria" />
          <Picker.Item label="Código Original" value="codOriginal" />
        </Picker>

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

      <View style={styles.cabecalhoProdutos}>
        <Text style={[styles.textoCabecalho, { width: '15%' }]}>Código</Text>
        <Text style={[styles.textoCabecalho, { width: '70%' }]}>Descrição</Text>
        <Text style={[styles.textoCabecalho, { width: '15%' }]}>Preço</Text>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <ProdutoListaCatalogo produto={item} />;
        }}
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
  escolhaBusca: {
    color: "#000",

  },
  cabecalhoProdutos: {
    flexDirection: 'row',
    backgroundColor: '#861a22',
    padding: 12,
  },
  textoCabecalho: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: "center"
  }
});