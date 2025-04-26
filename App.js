import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';

export default function App({ children }) {
  useEffect(() => {
    // Google Mobile Adsの初期化
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Ads initialized');
      });
  }, []);

  return (
    <SafeAreaProvider>
      {children}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}