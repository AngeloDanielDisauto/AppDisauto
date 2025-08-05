import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import TabelaOrcamento from "../components/TabelaOrcamento";

import { useGerarPdfOrcamento } from '../utils/GerarPdfOrcamento';



export default function Orcamento() {
    const { produtosOrcamento, totalOrcamento } = useAppContext();
    const { user } = useAuth();
    console.log(produtosOrcamento);

    const { gerarECompartilharPdf } = useGerarPdfOrcamento();



    async function handleEnviarPedido() {
        const baseApiTxt = 'https://apibancosql.onrender.com/orcamento/gerar-pedido?';

        const jsonMontaTxt = {
            "codCliente": user?.codigo,
            "nomeCliente": user?.nome_completo,
            "produtos": produtosOrcamento
        }

        console.log(jsonMontaTxt);
        try {
            const res = await axios.post(baseApiTxt, jsonMontaTxt, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Resposta da API:', res.data);
        } catch (error: any) {
            console.error('Erro ao gerar o .txt:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Detalhes:', error.response.data);
            }
        }


    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>


            <View style={styles.container}>
                <Text style={styles.titulo}>Orçamento</Text>

                <TabelaOrcamento produtos={produtosOrcamento} totalGeral={totalOrcamento} />


            </View>

            <Button title="Gerar e Compartilhar PDF" onPress={gerarECompartilharPdf} />
            <TouchableOpacity style={styles.btnEnviarPedido} onPress={handleEnviarPedido}>
                <Text style={styles.txtEnviarPedido}>Enviar Pedido</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 26,
        textAlign: 'center'
    },
    btnEnviarPedido: {
        width: 150,
        paddingVertical: 10,
        backgroundColor: '#8f1111',
    },
    txtEnviarPedido: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});