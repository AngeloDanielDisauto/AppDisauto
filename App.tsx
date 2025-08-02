import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { AppProvider } from './src/context/AppContext';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider> 
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </AuthProvider>
  );
}
