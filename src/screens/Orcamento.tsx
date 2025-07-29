import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppContext } from "../context/AppContext";
import TabelaOrcamento from "../components/TabelaOrcamento";

import { useGerarPdfOrcamento  } from '../utils/GerarPdfOrcamento';


export default function Orcamento() {
    const { produtosOrcamento, totalOrcamento } = useAppContext();
    
    const { gerarECompartilharPdf } = useGerarPdfOrcamento();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>


            <View style={styles.container}>
                <Text style={styles.titulo}>Orçamento</Text>
                
                <TabelaOrcamento produtos={produtosOrcamento} totalGeral={totalOrcamento} />


            </View>

            <Button title="Gerar e Compartilhar PDF" onPress={gerarECompartilharPdf} />


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
});