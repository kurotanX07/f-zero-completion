// src/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

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
  backgroundColor = '#1E3A8A' // blue-900のデフォルト値
}) => {
  // SafeAreaの設定を取得
  const insets = useSafeAreaInsets();
  
  // 戻るボタンクリック時の処理
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };
  
  return (
    <View style={[
      styles.header, 
      { 
        backgroundColor, 
        // SafeAreaのtop値を使用して上部のスペースを確保
        paddingTop: insets.top > 0 ? insets.top + 8 : 20
      }
    ]}>
      {showBackButton && (
        <TouchableOpacity 
          onPress={handleBackPress} 
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="戻る"
        >
          <ArrowLeft size={20} color="#93C5FD" /> 
          <Text style={styles.backText}>戻る</Text>
        </TouchableOpacity>
      )}
      
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#1E3A8A', // blue-900
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8, // タッチ領域を拡大
    paddingHorizontal: 4,
  },
  backText: {
    color: '#93C5FD', // blue-300
    marginLeft: 4,
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
    marginTop: 2,
  },
});