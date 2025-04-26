import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';
import Navigation from './navigation';

export default function App() {
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
      <Navigation />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}