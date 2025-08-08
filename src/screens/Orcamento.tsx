import React, { } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from 'axios';
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useGerarPdfOrcamento } from '../utils/GerarPdfOrcamento';

import TabelaOrcamento from "../components/TabelaOrcamento";
import OrcamentoBotoes from "../components/OrcamentoBotoes";


export default function Orcamento() {
    const { produtosOrcamento, totalOrcamento, limparOrcamento } = useAppContext();
    const { user } = useAuth();

    const { gerarECompartilharPdf } = useGerarPdfOrcamento();


    // função para mandar o JSON para api
    // API monta o txt e envia para o site Disauto
    async function handleEnviarPedido() {
        const baseApiTxt = 'https://apibancosql.onrender.com/orcamento/gerar-pedido?';

        const jsonMontaTxt = {
            "codCliente": user?.codigo,
            "nomeCliente": user?.nome_completo,
            "produtos": produtosOrcamento
        }

        try {
            const res = await axios.post(baseApiTxt, jsonMontaTxt, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (res.data.success) {
                limparOrcamento();
                Alert.alert("Pedido enviado", "Pedido enviado com sucesso!");
            }

        } catch (error: any) {
            if (error.response.data) {
                Alert.alert(`Erro ${error.response.status}`, error.response.data.message);
            }
        }


    }

    return (
        <View style={styles.container}>
            {produtosOrcamento.length > 0 ? (
                <View>
                    <TabelaOrcamento produtos={produtosOrcamento} totalGeral={totalOrcamento} />
                    <OrcamentoBotoes
                        onLimparOrcamento={limparOrcamento}
                        onGerarPdf={gerarECompartilharPdf}
                        onEnviarPedido={handleEnviarPedido}
                    />
                </View>
            )
                :
                <Text style={styles.txtOrcamentoVazio}>Adicione itens ao orçamento!</Text>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    txtOrcamentoVazio: {
        fontSize: 26,
        color: "#861a22",
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#861a22',
        textAlign: 'center',
        paddingVertical: 10
    },

});