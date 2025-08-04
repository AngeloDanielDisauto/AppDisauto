// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from "@expo/vector-icons";


export default function Login() {
  const { logar, isLoading } = useAuth();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await logar(login, senha);
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Falha no login');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo à DISAUTO</Text>

      <TextInput
        placeholder="Login"
        style={styles.input}
        onChangeText={setLogin}
        value={login}
        autoCapitalize="none"
        placeholderTextColor={'#999999'}
      />
      <View style={styles.containerInputSenha}>
        <TextInput
          placeholder="Senha"
          style={styles.inputSenha}
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={!mostrarSenha}
          placeholderTextColor={"#999999"}
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


      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading || isLoading}
      >
        {loading || isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 120,
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#861a22',
    marginBottom: 24,
    textAlign: 'center',
  },
  containerInputSenha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  icon: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  inputSenha: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#861a22',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
