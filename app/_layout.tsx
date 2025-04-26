import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Note: No mobileAds import which was causing the error

function RootLayout() {
  // Removed the Google Mobile Ads initialization that was causing errors
  
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#111827' },
          animation: 'slide_from_right'
        }}
      />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

// Make sure to use this exact export format - this was the issue
export default RootLayout;