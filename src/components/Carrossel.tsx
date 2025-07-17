import Carousel from 'react-native-reanimated-carousel';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Animated, LayoutAnimation } from 'react-native';
import { imagensCarrossel } from '../assets/images-carrossel';

const { width } = Dimensions.get('window');

export default function Carrossel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <View style={ styles.container }>
            <Carousel
            width={width}
            height={200}
            data={imagensCarrossel}
            autoPlay
            autoPlayInterval={2000}
            pagingEnabled
            onSnapToItem={(index) => {
                // animação suave na troca
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setCurrentIndex(index);
            }}
            renderItem={({ item }) => (
                <Image source={item} style={ styles.img } />
            )}
        />

        {/* Indicador de qual está */}
         <View style={styles.dotsContainer}>
            {imagensCarrossel.map((_, index) => {
            const isActive = currentIndex === index;
            return (
                <Animated.View
                key={index}
                style={[
                    styles.dot,
                    {
                    backgroundColor: isActive ? '#007AFF' : '#ccc',
                    transform: [{ scale: isActive ? 1.4 : 1 }], // cresce suavemente
                    },
                ]}
                />
            );
            })}
        </View>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: 200,

    },
     dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10, // fica por cima da imagem
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#007AFF', // cor do ponto ativo
        width: 12, // fica maior para dar destaque
    },
});