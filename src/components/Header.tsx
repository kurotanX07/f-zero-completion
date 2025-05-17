// src/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { i18n } from '../i18n/translations';

export interface HeaderProps {
  /**
   * ヘッダーに表示するメインタイトル
   */
  title: string;
  
  /**
   * オプションのサブタイトル（タイトルの下に表示）
   */
  subtitle?: string;
  
  /**
   * 戻るボタンを表示するかどうか
   */
  showBackButton?: boolean;
  
  /**
   * 戻るボタンが押されたときのコールバック関数
   */
  onBackPress?: () => void;
  
  /**
   * ヘッダーの背景色（デフォルトは青色）
   */
  backgroundColor?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showBackButton = false, 
  onBackPress,
  backgroundColor
}) => {
  // SafeAreaの設定を取得
  const insets = useSafeAreaInsets();
  const { theme, themeMode } = useTheme();
  
  // 戻るボタンクリック時の処理
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };
  
  const headerBgColor = backgroundColor || theme.primaryDark;
  
  return (
    <View style={[
      styles.header, 
      { 
        backgroundColor: headerBgColor, 
        // SafeAreaのtop値を使用して上部のスペースを確保
        paddingTop: insets.top > 0 ? insets.top + 4 : 16, // パディングを微調整
        paddingBottom: 8 // 下部のパディングを小さくして余白を減らす
      }
    ]}>
      {showBackButton && (
        <TouchableOpacity 
          onPress={handleBackPress} 
          style={[styles.backButton, { top: insets.top > 0 ? insets.top + 4 : 16 }]} // 位置を調整
          accessibilityRole="button"
          accessibilityLabel={i18n.t('header.back')}
        >
          <ArrowLeft size={20} color={theme.accent} /> 
          <Text style={[styles.backText, { color: theme.accent }]}>
            {i18n.t('header.back')}
          </Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        
        {subtitle && (
          <Text 
            style={[
              styles.subtitle, 
              { 
                color: themeMode === 'light' ? theme.text : theme.textSecondary,
                fontWeight: themeMode === 'light' ? '600' : 'normal'
              }
            ]} 
            numberOfLines={1} 
            ellipsizeMode="tail"
          >
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12, // 全体のパディングを小さく
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    minHeight: 60, // ヘッダーの最小高さを少し縮小
    flexDirection: 'row', // 横並びレイアウト
    alignItems: 'center', // 中央揃え
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6, // タッチ領域を少し調整
    paddingHorizontal: 4,
    zIndex: 10, // 他の要素より前面に表示
    position: 'absolute',
    left: 12,
  },
  backText: {
    marginLeft: 4,
    fontSize: 14,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40, // 左右にパディングを適度に調整
    marginTop: 0, // 上部余白を削除
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 3,
    textAlign: 'center',
    opacity: 0.95,
  },
});