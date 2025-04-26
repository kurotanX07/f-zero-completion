import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App({ children }) {
  // Removed Google Mobile Ads initialization that was causing errors
  
  return (
    <SafeAreaProvider>
      {children}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}