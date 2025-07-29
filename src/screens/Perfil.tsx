import React, { useState, useEffect } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppContext } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';




export default function Perfil() {
    const { produtosOrcamento, totalOrcamento } = useAppContext();

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [filial, setFilial] = useState("");


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>


            <View style={styles.container}>
                <Text style={styles.titulo}>Perfil</Text>

                <Text>Login:</Text>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    autoCorrect={false}
                    style={styles.inputLogin}
                />

                <Text>Senha:</Text>

                <View style={styles.containerInputSenha}>
                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry={!mostrarSenha}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                    >
                        <Ionicons
                            name={mostrarSenha ? "eye-off" : "eye"}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>

                <Picker
                    selectedValue={filial}
                    onValueChange={(value) => setFilial(value)}
                >
                    <Picker.Item label="2 - Lages Matriz" />
                    <Picker.Item label="3 - Joaçaba" />
                    <Picker.Item label="4 - Itajaí" />
                    <Picker.Item label="6 - Tubarão" />
                    <Picker.Item label="8 - Filial Lages" />
                    <Picker.Item label="11 - Joinville" />
                    <Picker.Item label="12 - Rio do Sul" />
                    <Picker.Item label="13 - Canoinhas" />
                    <Picker.Item label="14 - Caçador" />
                    <Picker.Item label="15 - São José" />
                    <Picker.Item label="16 - São Miguel do Oeste" />
                    <Picker.Item label="17 - Guaramirim" />
                    <Picker.Item label="18 - Criciuma" />
                </Picker>

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
        fontSize: 26,
        textAlign: 'center'
    },
    inputLogin: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    containerInputSenha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
    },
    icon: {
        padding: 5,
    },
});