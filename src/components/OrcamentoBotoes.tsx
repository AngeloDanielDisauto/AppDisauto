import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface BotoesOrcamentoProps {
  onLimparOrcamento: Function;
  onGerarPdf: Function;
  onEnviarPedido: Function;
}


export default function OrcamentoBotoes({ onLimparOrcamento, onGerarPdf, onEnviarPedido }: BotoesOrcamentoProps) {



    return(
        <View>
            <View style={styles.botoesLinha}>
                <TouchableOpacity style={[styles.botaoBase, styles.btnLimpar]} onPress={onLimparOrcamento as () => void}>
                  <Ionicons name="trash-outline" size={20} color="white" style={styles.icone} />
                  <Text style={styles.txtBotao}>Limpar</Text>
                </TouchableOpacity>
        
                <TouchableOpacity style={[styles.botaoBase, styles.btnPdf]} onPress={onGerarPdf as () => void}>
                  <Ionicons name="share-social-outline" size={20} color="white" style={styles.icone} />
                  <Text style={styles.txtBotao}>Compartilhar PDF</Text>
                </TouchableOpacity>
              </View>
        
              <View style={styles.areaEnviarPedido}>
                <TouchableOpacity style={styles.btnEnviarPedido} onPress={onEnviarPedido as () => void}>
                  <Ionicons name="send-outline" size={20} color="white" style={styles.icone} />
                  <Text style={styles.txtBotao}>Enviar Pedido</Text>
                </TouchableOpacity>
              </View>
        </View>
        
    );

}

const styles = StyleSheet.create({
    botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  areaEnviarPedido: {
    alignItems: 'center',
    marginTop: 30,
  },
  botaoBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnLimpar: {
    backgroundColor: '#999',
  },
  btnPdf: {
    backgroundColor: '#2296f3',
  },
  btnEnviarPedido: {
    backgroundColor: '#861a22',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  txtBotao: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  icone: {
    marginRight: 4,
  },
})