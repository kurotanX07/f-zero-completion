// src/components/AdBanner.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// For development, we'll use a mock banner since the ads module is causing errors
export interface AdBannerProps {
  sticky?: boolean;
  showFallback?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  sticky = false,
  showFallback = true
}) => {
  return (
    <View style={[
      styles.container,
      sticky && styles.stickyContainer
    ]}>
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
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
    padding: 8,
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fallbackContainer: {
    width: '100%',
    height: 50, // モバイルバナーの一般的な高さ
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937', // gray-800
  },
  fallbackText: {
    color: '#9CA3AF', // gray-400
    fontSize: 12,
  },
});