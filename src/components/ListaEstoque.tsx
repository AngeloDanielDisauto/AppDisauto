import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { ProdutoComEstoque } from "../data/types";
import { useAuth } from "../context/AuthContext";
interface Props {
  produto: ProdutoComEstoque
}
export default function ListaEstoque({ produto }: Props) {
  const { user } = useAuth();

  const [cidade, setCidade] = useState('');
  const [estoqueCidade, setEstoqueCidade] = useState('');
  function listaCidade() {
    const codCidade = Number(user?.empresa);

    switch (codCidade) {
      case 2:
        setCidade("Lages Matriz");
        setEstoqueCidade(produto.estoque_lages);
        break;
      case 3:
        setCidade("Joaçaba");
        setEstoqueCidade(produto.estoque_joacaba);
        break;
      case 4:
        setCidade("Itajaí");
        setEstoqueCidade(produto.estoque_itajai);
        break;
      case 6:
        setCidade("Tubarão");
        setEstoqueCidade(produto.estoque_tubarao);
        break;
      case 8:
        setCidade("Lages Filial");
        setEstoqueCidade(produto.estoque_filial_lages);
        break;
      case 11:
        setCidade("Joinville");
        setEstoqueCidade(produto.estoque_rondonopolis); //confirmar se é mesmo
        break;
      case 12:
        setCidade("Rio Do Sul");
        setEstoqueCidade(produto.estoque_rio_do_sul);
        break;
      case 13:
        setCidade("Canoinhas");
        setEstoqueCidade(produto.estoque_canoinhas);
        break;
      case 14:
        setCidade("Caçador");
        setEstoqueCidade(produto.estoque_cacador);
        break;
      case 15:
        setCidade("São José");
        setEstoqueCidade(produto.estoque_sao_jose);
        break;
      case 16:
        setCidade("São Miguel do Oeste");
        setEstoqueCidade(produto.estoque_sao_miguel);
        break;
      case 17:
        setCidade("Guaramirim");
        setEstoqueCidade(produto.estoque_guaramirim);
        break;
      case 18:
        setCidade("Criciuma");
        setEstoqueCidade(produto.estoque_filial_lages);
        break;
    }
  }


  listaCidade();

  return (
    <>
      {user?.acessoEstoqueTotal == 0 ? (
        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Estoque {cidade}</Text>
          <Text style={styles.cellValor}>{estoqueCidade}</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.cellTitulo}>Estoque {cidade}</Text>
          <Text style={styles.cellValor}>{produto.estoque_lages}</Text>
        </View>
      )}
    </>
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
});