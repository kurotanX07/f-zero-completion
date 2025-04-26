// src/components/AdBanner.tsx の改善版
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// 本番用広告IDの設定（env変数などで管理するとなおよい）
const PRODUCTION_AD_UNIT_ID = 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy';

export interface AdBannerProps {
  /**
   * 広告の位置を底部に固定するかどうか
   * デフォルトはfalse
   */
  sticky?: boolean;
  
  /**
   * カスタムの広告サイズ
   * デフォルトはANCHORED_ADAPTIVE_BANNER
   */
  adSize?: BannerAdSize;
  
  /**
   * 広告が読み込まれない場合のフォールバックビューを表示するかどうか
   * デフォルトはtrue
   */
  showFallback?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  sticky = false,
  adSize = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  showFallback = true
}) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  
  // 開発環境かどうかでIDを切り替え
  const adUnitId = __DEV__ ? TestIds.BANNER : PRODUCTION_AD_UNIT_ID;
  
  // 広告読み込み失敗時のハンドラー
  const handleAdFailedToLoad = (error: any) => {
    console.error('Ad failed to load: ', error);
    setAdError(error.message || 'Failed to load ad');
    setAdLoaded(false);
  };
  
  // 広告読み込み成功時のハンドラー
  const handleAdLoaded = () => {
    setAdLoaded(true);
    setAdError(null);
  };
  
  return (
    <View style={[
      styles.container,
      sticky && styles.stickyContainer
    ]}>
      <BannerAd
        unitId={adUnitId}
        size={adSize}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
      />
      
      {!adLoaded && adError && showFallback && (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            {__DEV__ ? '広告テスト中...' : ''}
          </Text>
        </View>
      )}
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