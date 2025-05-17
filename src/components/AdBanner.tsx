// src/components/AdBanner.tsx
import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../contexts/SubscriptionContext';

// For development, we'll use a mock banner since the ads module is causing errors
export interface AdBannerProps {
  sticky?: boolean;
  showFallback?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  sticky = false,
  showFallback = true
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { isSubscribed } = useSubscription();
  
  // サブスクリプション購入済みの場合は広告を表示しない
  if (isSubscribed) {
    return null;
  }
  
  return (
    <View style={[
      styles.container,
      sticky && styles.stickyContainer,
      sticky && { paddingBottom: Math.max(insets.bottom, 8) }
    ]}>
      <View style={[styles.fallbackContainer, { backgroundColor: theme.primaryDark }]}>
        <Text style={[styles.fallbackText, { color: theme.textSecondary }]}>
          広告スペース
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937', // Tailwindのgray-800相当
    padding: 4, // パディングを小さく
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100, // 他の要素より前面に表示
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  fallbackContainer: {
    width: '100%',
    height: 50, // モバイルバナーの一般的な高さ
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    fontSize: 12,
  },
});