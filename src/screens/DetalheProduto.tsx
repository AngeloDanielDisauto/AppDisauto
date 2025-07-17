import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

export default function DetalheProduto() {
  const route = useRoute();
  const navigation = useNavigation();
  const { produto } = route.params as any;
  const { adicionarProduto, produtosOrcamento } = useAppContext(); //função para add produto no array orçamento

  const [quantProd, setQuantProd] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: produto.descricao,
    });
  }, [navigation, produto]);


  function handleAddCarrinho() {
    if (quantProd > 0) {
      const novoProduto = produto;
      novoProduto.quantidade = quantProd;
      adicionarProduto(novoProduto);
      navigation.goBack();
      alert("adicionado com sucesso!")
    } else {
      alert("Digite a quantidade"); 
    }
    
  }
  
  function handleIrOrcamento() {
    alert("ir orçamento")
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Tabela de detalhes */}
      <View style={styles.tabela}>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Código</Text>
          <Text style={styles.cellValor}>{produto.codigo}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Descrição</Text>
          <Text style={styles.cellValor}>{produto.descricao}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Estoque</Text>
          <Text style={styles.cellValor}>{produto.estoque}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Preço</Text>
          <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
            R$ {produto.preco}
          </Text>
        </View>

        {/* Campos extras fictícios */}
        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Referência</Text>
          <Text style={styles.cellValor}>4435</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Complemento</Text>
          <Text style={styles.cellValor}>.../89</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Observações</Text>
          <Text style={styles.cellValor}>VOLVO</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Nº Original</Text>
          <Text style={styles.cellValor}>6834322</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Marca</Text>
          <Text style={styles.cellValor}>IBTF</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Quantidade</Text>
          <TextInput
            style={styles.cellInput}
            keyboardType="numeric"
            inputMode="numeric"
            placeholder="0"
            value={String(quantProd)}
            onChangeText={ (text) => {setQuantProd(Number(text))} }
          />
      </View>

      </View>

      
      {/* Imagem do produto */}
      <Image source={{ uri: produto.imagem }} style={styles.img} />

      {/* submits */}
      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btnInput} onPress={handleAddCarrinho}>
          <Text style={styles.textBtn}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnInput} onPress={handleIrOrcamento}>
          <Text style={styles.textBtn}>Ir para o Orçamento</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  tabela: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cellTitulo: {
    flex: 1,
    backgroundColor: '#861a22',
    color: '#fff',
    fontWeight: 'bold',
    padding: 8,
  },
  cellValor: {
    flex: 2,
    backgroundColor: '#fff',
    color: '#000',
    padding: 8,
  },
  cellInput: {
    flex: 2,
    backgroundColor: '#eeeeee',
    color: '#000',
    padding: 8,
  },
  containerBtn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnInput: {
    backgroundColor: '#861a22',
    width: '48%',
    padding: 10,
    color: '#fff',
    alignItems: 'center',
    borderRadius: 8,
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
