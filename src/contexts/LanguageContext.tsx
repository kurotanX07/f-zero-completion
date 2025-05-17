import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n, LanguageCode } from '../i18n/translations';

// 保存キー
const LANGUAGE_STORAGE_KEY = 'app_language';
const FIRST_LAUNCH_KEY = 'app_first_launch';

// コンテキストの型定義
type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => Promise<void>;
  isFirstLaunch: boolean;
  setFirstLaunchCompleted: () => Promise<void>;
};

// コンテキスト作成
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// コンテキストプロバイダーコンポーネント
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>('ja');
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 初期化時に保存されている言語設定と初回起動フラグを読み込む
  useEffect(() => {
    const initialize = async () => {
      try {
        // 初回起動フラグをチェック
        const firstLaunch = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
        setIsFirstLaunch(firstLaunch === null);
        
        // 言語設定を読み込む
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'ja' || savedLanguage === 'en')) {
          setLanguageState(savedLanguage as LanguageCode);
          i18n.locale = savedLanguage;
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setIsInitialized(true);
      }
    };

    initialize();
  }, []);

  // 言語を設定する関数
  const setLanguage = async (code: LanguageCode) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, code);
      setLanguageState(code);
      i18n.locale = code;
    } catch (error) {
      console.error('Failed to save language setting:', error);
    }
  };

  // 初回起動を完了としてマークする関数
  const setFirstLaunchCompleted = async () => {
    try {
      await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'false');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Failed to save first launch status:', error);
    }
  };

  // 初期化が完了するまでNullを返す（オプション）
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        isFirstLaunch, 
        setFirstLaunchCompleted 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// 翻訳関数
export const t = (key: string) => {
  return i18n.t(key);
}; 