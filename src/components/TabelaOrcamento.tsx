import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ProdutoOrcamento } from '../data/types';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../context/AppContext';

interface Props {
  produtos: ProdutoOrcamento[];
  totalGeral: number;
}




export default function TabelaOrcamento({ produtos, totalGeral }: Props) {
  const { removerProduto } = useAppContext(); //função para add produto no array orçamento
  

  function handleApagarItem(produto: ProdutoOrcamento) {
    removerProduto(produto.id)
  }
  return (
    <ScrollView horizontal>
      <View>
        {/* Cabeçalho */}
        <View style={styles.linhaCabecalho}>
          <Text style={[styles.cellTabelaCabecalho, { width: 100 }]}>Código</Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 200 }]}>Descrição</Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 100 }]}>Preço</Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 100 }]}>Qtd</Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 120 }]}>Total</Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 40 }]}></Text>
        </View>

        {/* Lista de produtos */}
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.linhaTabela}>
              <Text style={[styles.cellTabela, { width: 100 }]}>{item.codigo}</Text>
              <Text style={[styles.cellTabela, { width: 200 }]}>{item.descricao}</Text>
              <Text style={[styles.cellTabelaPreco, { width: 100 }]}>R${(item.preco).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
              <Text style={[styles.cellTabela, { width: 100 }]}>{item.quantidade}</Text>
              <Text style={[styles.cellTabela, { width: 120 }]}>
                R${(item.preco * item.quantidade).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Text>
              <TouchableOpacity style={[styles.cellTabela, { width: 40 }]} onPress={() => handleApagarItem(item)}>
                <Ionicons name={'trash'} size={20} />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.linhaTotal}>
          <Text style={[styles.textoTotal, { width: 500 }]}>TOTAL GERAL</Text>
          <Text style={[styles.textoTotalValor, { width: 120 }]}>
            R${totalGeral.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Text>
          <Text style={[styles.cellTabelaCabecalho, { width: 40 }]}></Text>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linhaCabecalho: {
    flexDirection: 'row',
    backgroundColor: '#861a22',
    paddingVertical: 8,
  },
  cellTabelaCabecalho: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  linhaTabela: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cellTabela: {
    padding: 8,
    textAlign: 'center',
  },
  cellTabelaPreco: {
    padding: 8,
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#861a22',
    borderTopWidth: 2,
    //borderColor: '#861a22',
  },
  textoTotal: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
    padding: 8,
  },
  textoTotalValor: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    color: '#fff',
  },
});
