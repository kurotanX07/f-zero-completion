import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 保存キー
const THEME_STORAGE_KEY = 'app_theme';

// テーマ
export type ThemeMode = 'dark' | 'light';

// テーマカラー - F-ZERO ブルーファルコンをイメージした配色
export const darkTheme = {
  // 背景
  background: '#050D20', // 宇宙のような深い紺色
  surface: '#132040', // 青みがかった暗い色
  surfaceSecondary: '#1D315A', // くすんだ青色
  
  // カラー
  primary: '#0066CC', // ブルーファルコンブルー
  primaryDark: '#0A2045', // ブルーファルコンの深い青
  accent: '#00C2FF', // 明るい青のアクセント
  
  // テキスト
  text: '#FFFFFF', // 白色
  textSecondary: '#B8D0FF', // 青みがかった明るい色
  
  // ユーティリティ
  border: '#1D4080', // 中間の青色
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  
  // ランク表示用
  rankGold: '#FFD700', // 1位
  rankSilver: '#C0C0C0', // 2位
  rankBronze: '#CD853F' // 3位
};

export const lightTheme = {
  // 背景
  background: '#F0F5FF', // 非常に明るい青白色
  surface: '#FFFFFF', // 白色
  surfaceSecondary: '#E6F0FF', // 非常に薄い青色
  
  // カラー
  primary: '#0055AA', // より暗いブルー（コントラスト向上）
  primaryDark: '#003D7A', // さらに濃いブルー
  accent: '#0088CC', // コントラスト向上のために暗めの青
  
  // テキスト
  text: '#002244', // より濃い青色（コントラスト向上）
  textSecondary: '#1A365D', // 濃い青色（コントラスト向上）
  
  // ユーティリティ
  border: '#90B4E0', // 少し濃い青色
  success: '#2A9D46', // より暗い緑
  error: '#E62200', // より暗い赤
  warning: '#E67700', // より暗いオレンジ
  
  // ランク表示用
  rankGold: '#CC9000', // より暗いゴールド（コントラスト向上）
  rankSilver: '#707070', // より暗いシルバー（コントラスト向上）
  rankBronze: '#8B5A1B' // より暗いブロンズ（コントラスト向上）
};

// コンテキストの型定義
type ThemeContextType = {
  themeMode: ThemeMode;
  theme: typeof darkTheme;
  toggleTheme: () => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
};

// コンテキスト作成
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// コンテキストプロバイダーコンポーネント
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  // 初期化時に保存されているテーマ設定を読み込む
  useEffect(() => {
    const initialize = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setThemeModeState(savedTheme as ThemeMode);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load theme setting:', error);
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // テーマを切り替える関数
  const toggleTheme = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    await setThemeMode(newTheme);
  };

  // テーマを設定する関数
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme setting:', error);
    }
  };

  // 初期化が完了するまでNullを返す（オプション）
  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        themeMode,
        theme,
        toggleTheme,
        setThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 