import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carrossel from "../components/Carrossel";
import GridBotoes from "../components/GridBotoesHome";

export default function Home() {

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView 
                showsVerticalScrollIndicator={false} // remove a barrinha lateral
            >
                <Image 
                    source={require('../assets/logo-marca.png')} 
                    style={styles.img}
                />
                
                <Carrossel />

                <GridBotoes />

                <Image 
                    source={require("../assets/banner-historia.png")}
                    style={{width: '100%', height: 200}}
                />
            </ScrollView>
        </View>
        
    );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
  img: { 
    width: "100%", 
    height: 100, 
    resizeMode: 'contain' 
}
});