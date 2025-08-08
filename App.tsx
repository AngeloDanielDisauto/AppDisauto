import React, { useCallback } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';

import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { AnonymousPro_400Regular } from '@expo-google-fonts/anonymous-pro';

SplashScreen.preventAutoHideAsync();

export default function App() {


  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    AnonymousPro_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Define Roboto como fonte padrão global
      setCustomText({ style: { fontFamily: 'Roboto_400Regular' } });
      setCustomTextInput({ style: { fontFamily: 'Roboto_400Regular' } });

      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>

      <AuthProvider>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </AuthProvider>
    </SafeAreaView>

  );
}
