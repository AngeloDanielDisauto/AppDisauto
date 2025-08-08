import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const { logar, isLoading } = useAuth();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin() {
    if (login.length < 1) {
      Alert.alert("Usuário inválido", "Dígite o login");
      return;
    }
    if (senha.length < 1) {
      Alert.alert("Senha inválida", "Dígite a senha");
      return;
    }
    setLoading(true);
    try {
      await logar(login, senha);
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Falha no login');
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View>
        <Text style={styles.title}>Bem-vindo à</Text>
        <Text style={styles.titleDisauto}>Disauto</Text>
      </View>
      <View style={{ width: '100%', gap: 15 }}>
        <View style={styles.containerInput}>
          <Text style={{ position: 'absolute', top: 4, left: 8, fontFamily: 'AnonymousPro_400Regular' }}>Login</Text>
          <TextInput
            style={styles.inputLogin}
            onChangeText={setLogin}
            value={login}
            autoCapitalize="none"
            placeholderTextColor={'#999999'}
            textAlignVertical='bottom'
          />
        </View>

        <View style={styles.containerInputSenha}>
          <Text style={{ position: 'absolute', top: 4, left: 8, fontFamily: 'AnonymousPro_400Regular' }}>Senha</Text>
          <TextInput
            style={styles.inputSenha}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={!mostrarSenha}
            onSubmitEditing={handleLogin}
            textAlignVertical='bottom'
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

        <View style={{ width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.containerContato}
            onPress={() => navigation.navigate('Contato' as never)}
          >
            <Text style={{ color: "#0866FF", fontSize: 16, fontWeight: 'bold' }}>Não possuo uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>



    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 271,
    height: 171,
  },
  title: {
    fontSize: 42,
    lineHeight: 42,
    color: '#861a22',
    textAlign: 'center',
  },
  titleDisauto: {
    color: '#861A22',
    fontSize: 64,
    lineHeight: 64,
    fontWeight: 'bold',
    textAlign: 'center',

  },

  icon: {
    alignSelf: 'center',
    marginRight: 10
  },
  containerInput: {
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  inputLogin: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  containerInputSenha: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  inputSenha: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    color: '#000',
  },
  button: {
    height: 60,
    backgroundColor: '#861a22',
    paddingVertical: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerContato: {  },
});
