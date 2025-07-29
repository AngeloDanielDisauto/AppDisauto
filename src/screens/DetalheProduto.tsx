import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProdutoComEstoque, ProdutoOrcamento } from '../data/types';

// tipo do produto para receber pela route
type DetalheProdutoParams = {
  DetalheProduto: {
    produto: ProdutoComEstoque;
  };
};

export default function DetalheProduto() {
  const route = useRoute<RouteProp<DetalheProdutoParams, 'DetalheProduto'>>(); // recebe da rota o produto com a tipagem
  const { produto } = route.params;

  const navigation = useNavigation();
  const { adicionarProduto } = useAppContext(); //função para add produto no array orçamento
  const [estoqueTotal, setEstoqueTotal] = useState(0);
  const [quantProd, setQuantProd] = useState(0);
  const precoBrutoProduto = Math.ceil(parseFloat(produto.preco_bruto.replace(',', '.')) * 0.5 * 0.9 * 100) / 100;



  useEffect(() => {
    // calcular estoque total do produto
    setEstoqueTotal(Number(produto.estoque_lages) + Number(produto.estoque_joacaba) + Number(produto.estoque_itajai) + Number(produto.estoque_tubarao) + Number(produto.estoque_filial_lages)
      + Number(produto.estoque_maringa) + Number(produto.estoque_rondonopolis) + Number(produto.estoque_rio_do_sul) + Number(produto.estoque_canoinhas) + Number(produto.estoque_cacador)
      + Number(produto.estoque_sao_jose) + Number(produto.estoque_sao_miguel) + Number(produto.estoque_guaramirim));

  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: produto.descricao,
    });
  }, [navigation, produto]);


  function formatarProduto() {
    // verifica a quantidade de compra para enviar preço com desconto por quantidade
    var precoFinal = 0;
    if (quantProd < produto.art_qpc){ 
      // esse primeiro if evita fazer o restante do processamento na maioria dos casos
      precoFinal = precoBrutoProduto;
      
    } else if (quantProd >= produto.art_qpc3) {
      precoFinal = (precoBrutoProduto * (1 - Number(produto.art_dpc3) / 100));
    } else if (quantProd >= produto.art_qpc2) {
      precoFinal = (precoBrutoProduto * (1 - Number(produto.art_dpc2) / 100));
    } else if (quantProd >= produto.art_qpc1) {
      precoFinal = (precoBrutoProduto * (1 - Number(produto.art_dpc1) / 100));
    } else if (quantProd >= produto.art_qpc) {
      precoFinal = (precoBrutoProduto * (1 - Number(produto.art_dpc) / 100));
    }

    const novoProduto: ProdutoOrcamento = {
      id: produto.id,
      codigo: produto.codigo,
      descricao: produto.descricao,
      preco: precoFinal,
      quantidade: quantProd
    };
    return novoProduto;
  }

  function handleAddCarrinho() {
    if (quantProd > 0) {
      const novoProduto = formatarProduto();

      adicionarProduto(novoProduto);
      navigation.goBack();
      alert("adicionado com sucesso!")
    } else {
      alert("Digite a quantidade");
    }

  }

  function handleIrOrcamento() {
    if (quantProd > 0) {
      const novoProduto = formatarProduto();

      adicionarProduto(novoProduto);
      navigation.getParent()?.navigate('Orcamento');
      alert("adicionado com sucesso!")
    } else {
      alert("Digite a quantidade");
    }

  }



  var codSemDigito = produto.codigo.replace(/-.*/, ''); // retira o dígito
  codSemDigito = codSemDigito.padStart(5, '0'); // adiciona '0' a esquerda até ficar com 5 
  const url = 'https://www.disauto.com.br/admin/img_produto/ImgProd' + codSemDigito + '.jpg';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <ScrollView contentContainerStyle={styles.container}>

        {/* Tabela de detalhes */}
        <View style={styles.tabela}>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Código</Text>
            <Text style={styles.cellValor}>{produto.codigo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Referência</Text>
            <Text style={styles.cellValor}>{produto.referencia}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Descrição</Text>
            <Text style={styles.cellValor}>{produto.descricao}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Complemento</Text>
            <Text style={styles.cellValor}>{produto.dado6}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Observações</Text>
            <Text style={styles.cellValor}>{produto.observacoes}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Nº Original</Text>
            <Text style={styles.cellValor}>{produto.dado5}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Marca</Text>
            <Text style={styles.cellValor}>{produto.marca}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Valor Unit.</Text>
            <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
              R$ {precoBrutoProduto.toFixed(2)}
            </Text>
          </View>

          { // ------------------- DESCONTO POR UNIDADE ---------------------
            produto.art_qpc > 0 ? (
              <View style={styles.row}>
                <Text style={styles.cellTitulo}>Valor Unit. Acima de: {produto.art_qpc}</Text>
                <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
                  R$ {(precoBrutoProduto * (1 - Number(produto.art_dpc) / 100)).toFixed(2)}
                </Text>
              </View>
            ) : null}

          { // ------------------- DESCONTO POR UNIDADE 1 ---------------------
            produto.art_qpc1 > 0 ? (
              <View style={styles.row}>
                <Text style={styles.cellTitulo}>Valor Unit. Acima de: {produto.art_qpc1}</Text>
                <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
                  R$ {(precoBrutoProduto * (1 - Number(produto.art_dpc1) / 100)).toFixed(2)}
                </Text>
              </View>
            ) : null}

          { // ------------------- DESCONTO POR UNIDADE 2 ---------------------
            produto.art_qpc2 > 0 ? (
              <View style={styles.row}>
                <Text style={styles.cellTitulo}>Valor Unit. Acima de: {produto.art_qpc2}</Text>
                <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
                  R$ {(precoBrutoProduto * (1 - Number(produto.art_dpc2) / 100)).toFixed(2)}
                </Text>
              </View>
            ) : null}

          { // ------------------- DESCONTO POR UNIDADE 3 ---------------------
            produto.art_qpc3 > 0 ? (
              <View style={styles.row}>
                <Text style={styles.cellTitulo}>Valor Unit. Acima de: {produto.art_qpc3}</Text>
                <Text style={[styles.cellValor, { color: 'green', fontWeight: 'bold' }]}>
                  R$ {(precoBrutoProduto * (1 - Number(produto.art_dpc3) / 100)).toFixed(2)}
                </Text>
              </View>
            ) : null}

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Lages</Text>
            <Text style={styles.cellValor}>{produto.estoque_lages}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Total</Text>
            <Text style={styles.cellValor}>{estoqueTotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Quantidade</Text>
            <TextInput
              style={styles.cellInput}
              keyboardType="numeric"
              inputMode="numeric"
              placeholder="0"
              value={String(quantProd)}
              onChangeText={(text) => { setQuantProd(Number(text)) }}
            />
          </View>

        </View>


        {/* Imagem do produto */
        }
        <Image source={{ uri: url }} style={styles.img} />

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
    </View>
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
    resizeMode: 'contain',
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
