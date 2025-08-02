import React, { useState, useEffect } from "react";
import axios from 'axios';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import { ProdutoComEstoque } from "../data/types";
import ProdutoListaCatalogo from "../components/ProdutoListaCatalogo";

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<ProdutoComEstoque[]>([]); // array de produto com tipagem
  const [filtroBusca, setFiltroBusca] = useState('todos');
  const [carregando, setCarregando] = useState(false);
  const [produtosEncontrados, setProdutosEncontrados] = useState(0);
  const baseApiBusca = 'https://apibancosql.onrender.com/produtos/busca?';



  // função para busca de produtos
  async function handleBusca() {

    switch (filtroBusca) {
      case 'todos':
        buscaPorFiltro('todos=');
        break;

      case 'codDisauto':
        buscaPorFiltro('codDisauto=');
        break;

      case 'codIndustria':
        buscaPorFiltro('codIndustria=');
        break;

      case 'codOriginal':
        buscaPorFiltro('codOriginal=');
        break;

      default:
        buscaPorFiltro('todos=');
    }
  }
  // -------------------------------- AREA BUSCAS ---------------------------------------------
  // to do: caso não ache nada, mostrar isso para o usuário

  // busca 
  async function buscaPorFiltro(filtro: string) {
    setCarregando(true); // ativa o indicador de carregamento da busca
    try {
      const res = await axios.get(baseApiBusca + filtro + busca);
      setProdutos(res.data);
      setProdutosEncontrados(res.data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false); // desativa o indicador de carregamento da busca independente do resultado
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Campo de busca */}
      <View style={styles.orcamentoContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filtroBusca}
            onValueChange={(value) => setFiltroBusca(value)}
            style={styles.escolhaBusca}
            mode="dropdown"
            dropdownIconColor="#000"
          >
            <Picker.Item label="Todos" value="todos" />
            <Picker.Item label="Código Disauto" value="codDisauto" />
            <Picker.Item label="Código Industria" value="codIndustria" />
            <Picker.Item label="Código Original" value="codOriginal" />
          </Picker>
        </View>

        <TextInput
          placeholder="Pesquisar por código ou descrição..."
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={handleBusca}
          style={styles.buscaInput}
        />

        <View style={styles.containerBusca}>
          <TouchableOpacity
            onPress={handleBusca}
            style={styles.btnBuscar}
          >
            <Text style={styles.txtBtnBuscar}>Enviar</Text>
          </TouchableOpacity>

          { produtosEncontrados > 0 ? <Text style={{color: "#861a22"}}>{produtosEncontrados} Produtos encontrados</Text> : null}
        </View>


      </View>

      {/* cabeçalho tabela da busca */}

      <View style={styles.cabecalhoProdutos}>
        <Text style={[styles.textoCabecalho, { width: '15%' }]}>Código</Text>
        <Text style={[styles.textoCabecalho, { width: '70%' }]}>Descrição</Text>
        <Text style={[styles.textoCabecalho, { width: '15%' }]}>Preço</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* LÓGICA TERNÁRIA PARA APLICAR O CARREGAMENTO DURANTE A BUSCA, condição 'carregando' ativa o <ActivityIndicator> */}
        {carregando ? (
          <ActivityIndicator size="large" color="#861a22" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => { 
              return <ProdutoListaCatalogo produto={item} />;
            }}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  orcamentoContainer: {
    paddingTop: 10,
    backgroundColor: '#f2f2f2',
  },
  containerBusca: {
    display: 'flex',
    alignItems: "flex-end"
  },
  buscaInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 15
  },
  btnBuscar: {
    width: 90,
    padding: 8,
    backgroundColor: "#861a22",
    borderRadius: 8,
  },
  txtBtnBuscar: {
    fontSize: 22,
    color: "#fff",
    textAlign: 'center',
  },
  pickerContainer: {
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 15
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