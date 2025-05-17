import React from 'react';
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguageProvider, useLanguage } from '../src/contexts/LanguageContext';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';
import { SubscriptionProvider } from '../src/contexts/SubscriptionContext';
import { LanguageSelectionModal } from '../src/components/LanguageSelectionModal';

// Note: No mobileAds import which was causing the error

// 言語選択モーダル付きのアプリコンテンツ
const AppContent = () => {
  const { isFirstLaunch } = useLanguage();
  const { theme, themeMode } = useTheme();
  
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'slide_from_right'
        }}
      />
      <StatusBar style={themeMode === 'dark' ? "light" : "dark"} />
      <LanguageSelectionModal visible={isFirstLaunch} />
    </>
  );
};

// ルートレイアウト
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <ThemeProvider>
          <SubscriptionProvider>
            <AppContent />
          </SubscriptionProvider>
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}