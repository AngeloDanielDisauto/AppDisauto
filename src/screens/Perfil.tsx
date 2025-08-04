import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";


export default function Perfil() {
    const { deslogar, user } = useAuth();

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={styles.container}>
                <TextInput
                    style={styles.titulo}
                    editable={false} >
                    Olá {user?.nome_completo}
                </TextInput>

                {
                    user?.data_limite ? 
                    <Text>Seu acesso expira: {new Date(user.data_limite).toLocaleDateString('pt-BR')}</Text>
                    : null
                }
                

                <TouchableOpacity
                    style={styles.btnDeslogar}
                    onPress={deslogar}
                >
                    <Text style={styles.textBtnDeslogar}>Sair</Text>
                </TouchableOpacity>

            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    titulo: {
        fontSize: 22,
        textAlign: 'center'
    },
    btnDeslogar: {
        padding: 5,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#bea1a1',
    },
    textBtnDeslogar: {
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 16
    },
});