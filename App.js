import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { ExpoRoot } from 'expo-router';

// Text strings must be rendered within a <Text> componentエラーを無効化
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

// App.jsはExpo Routerのエントリーポイントとして機能する
export default function App() {
  // Contextや初期化はExpo Routerのレイアウトファイルに移動（app/_layout.tsx）
  
  // Expo Router用のルートコンポーネントをレンダリング
  return (
    <SafeAreaProvider>
      <ExpoRoot />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}