import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";


export default function Contato() {


    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.titulo}>DISAUTO DISTRIBUIDORA DE AUTOPEÇAS</Text>
                <Text style={styles.subTitulo}>Encontre a Disauto mais próxima de você!</Text>
            </View>
            <View style={styles.gridContato}>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>MATRIZ LAGES - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3251 1933</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>FILIAL LAGES - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3251 5300</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>JOAÇABA - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3551 4500</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>ITAJAÍ - SC</Text>
                    <Text style={styles.contatoFilial}>(47) 3349 2233</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>TUBARÃO - SC</Text>
                    <Text style={styles.contatoFilial}>(48) 3631 6100</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>JOINVILLE - SC</Text>
                    <Text style={styles.contatoFilial}>(47) 3489 8333</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>RIO DO SUL - SC</Text>
                    <Text style={styles.contatoFilial}>(47) 3531 6800</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>CANOINHAS - SC</Text>
                    <Text style={styles.contatoFilial}>(47) 3621 6500</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>CAÇADOR - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3512 0080</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>SÃO JOSÉ - SC</Text>
                    <Text style={styles.contatoFilial}>(48) 3112 0320</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>SÃO MIGUEL DO OESTE - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3251 1912</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>GUARAMIRIM  - SC</Text>
                    <Text style={styles.contatoFilial}>(47) 3511 9080</Text>
                </View>
                <View style={styles.containerFilial}>
                    <Text style={styles.nomeFilial}>CRICIÚMA  - SC</Text>
                    <Text style={styles.contatoFilial}>(49) 3251 1912</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        gap: 15,
    },
    titulo: {
        color: '#861a22',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitulo: {
        fontSize: 18,
        color: '#861a22',
        textAlign: 'center',
    },
    gridContato: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 15
    },
    containerFilial: {
        width: '48%',
        marginTop: 15,
    },
    nomeFilial: {
        fontSize: 18,
        color: '#861a22',
        textAlign: 'center',
    },
    contatoFilial: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    }
})