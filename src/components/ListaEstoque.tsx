import React, { useState, useEffect } from "react";
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
  const [estoqueTotal, setEstoqueTotal] = useState(0);

  useEffect(() => {

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
      default:
        setCidade("Lages Matriz");
        setEstoqueCidade(produto.estoque_lages);
        break;
    }

    // calcular estoque total do produto
    setEstoqueTotal(Number(produto.estoque_lages) + Number(produto.estoque_joacaba) + Number(produto.estoque_itajai) + Number(produto.estoque_tubarao) + Number(produto.estoque_filial_lages)
      + Number(produto.estoque_maringa) + Number(produto.estoque_rondonopolis) + Number(produto.estoque_rio_do_sul) + Number(produto.estoque_canoinhas) + Number(produto.estoque_cacador)
      + Number(produto.estoque_sao_jose) + Number(produto.estoque_sao_miguel) + Number(produto.estoque_guaramirim));


  }, []);
  return (
    <>
      {user?.acesso_estoque_total == 0 ? (
        <View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque {cidade}</Text>
            <Text style={styles.cellValor}>{estoqueCidade}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Total</Text>
            <Text style={styles.cellValor}>{estoqueTotal}</Text>
          </View>
        </View>

      ) : (
        <View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Lages Matriz</Text>
            <Text style={styles.cellValor}>{produto.estoque_lages}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Joaçaba</Text>
            <Text style={styles.cellValor}>{produto.estoque_joacaba}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Itajaí</Text>
            <Text style={styles.cellValor}>{produto.estoque_itajai}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Tubarão</Text>
            <Text style={styles.cellValor}>{produto.estoque_tubarao}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Lages Filial</Text>
            <Text style={styles.cellValor}>{produto.estoque_filial_lages}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Joinville</Text>
            <Text style={styles.cellValor}>{produto.estoque_rondonopolis}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Rio Do Sul</Text>
            <Text style={styles.cellValor}>{produto.estoque_rio_do_sul}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Canoinhas</Text>
            <Text style={styles.cellValor}>{produto.estoque_canoinhas}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Caçador</Text>
            <Text style={styles.cellValor}>{produto.estoque_cacador}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque São José</Text>
            <Text style={styles.cellValor}>{produto.estoque_sao_jose}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque São Miguel do Oeste</Text>
            <Text style={styles.cellValor}>{produto.estoque_sao_miguel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Guaramirim</Text>
            <Text style={styles.cellValor}>{produto.estoque_guaramirim}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Criciúma</Text>
            <Text style={styles.cellValor}>{0}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cellTitulo}>Estoque Total</Text>
            <Text style={styles.cellValor}>{estoqueTotal}</Text>
          </View>
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