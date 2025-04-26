import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import mobileAds from 'react-native-google-mobile-ads';

export default function RootLayout() {
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
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#111827' }
        }}
      />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}