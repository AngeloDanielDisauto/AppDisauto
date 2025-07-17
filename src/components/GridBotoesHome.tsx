import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // ícones

export default function GridBotoes() {
  return (
    <View style={styles.container}>
      
      {/* Botão 1 */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="wrench" size={50} color="black" />
        <Text style={styles.title}>SEJA CLIENTE DISAUTO</Text>
        <Text style={styles.subtitle}>Cadastre-se e faça parte do universo Disauto.</Text>
      </TouchableOpacity>

      {/* Botão 2 */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="office-building" size={50} color="black" />
        <Text style={styles.title}>FILIAIS</Text>
        <Text style={styles.subtitle}>Localize a filial Disauto mais próxima de você.</Text>
      </TouchableOpacity>

      {/* Botão 3 */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="handshake" size={50} color="black" />
        <Text style={styles.title}>TRABALHE CONOSCO</Text>
        <Text style={styles.subtitle}>Cadastre seu currículo em nosso banco de talentos.</Text>
      </TouchableOpacity>

      {/* Botão 4 */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="balloon" size={50} color="black" />
        <Text style={styles.title}>NOSSOS EVENTOS</Text>
        <Text style={styles.subtitle}>Confira imagens dos eventos promovidos pela Disauto.</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    width: '45%',
    backgroundColor: '#EEEEEE',
    borderRadius: 6,
    padding: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#861a22',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: '#333',
  },
});
