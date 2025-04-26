// src/hooks/useStorage.ts の改善版
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClearData } from '../types';

export interface StorageError extends Error {
  type: 'load' | 'save' | 'delete';
  originalError?: any;
}

export const useClearDataStorage = () => {
  /**
   * 保存されたクリアデータをロードする
   * @returns Promise<ClearData> クリアデータオブジェクト
   * @throws StorageError ロード中にエラーが発生した場合
   */
  const loadClearData = async (): Promise<ClearData> => {
    try {
      const data = await AsyncStorage.getItem('clearData');
      
      // 未保存の場合は空のオブジェクトを返す
      if (!data) return {};
      
      // JSONパースを試みる
      try {
        return JSON.parse(data) as ClearData;
      } catch (parseError) {
        console.error('Failed to parse clear data', parseError);
        
        // パースエラーだが、最低限の空オブジェクトを返す
        return {};
      }
    } catch (e) {
      console.error('Failed to load clear data', e);
      
      // 具体的なエラー情報を含むカスタムエラー
      const error = new Error('クリアデータの読み込みに失敗しました') as StorageError;
      error.type = 'load';
      error.originalError = e;
      throw error;
      
      // エラー時は空のオブジェクトをフォールバックとして返す
      return {};
    }
  };

  /**
   * クリアデータを保存する
   * @param data 保存するクリアデータ
   * @returns Promise<void>
   * @throws StorageError 保存中にエラーが発生した場合
   */
  const saveClearData = async (data: ClearData): Promise<void> => {
    try {
      // データの検証
      if (!data || typeof data !== 'object') {
        throw new Error('無効なクリアデータ形式です');
      }
      
      // データをJSON文字列に変換して保存
      await AsyncStorage.setItem('clearData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save clear data', e);
      
      // 具体的なエラー情報を含むカスタムエラー
      const error = new Error('クリアデータの保存に失敗しました') as StorageError;
      error.type = 'save';
      error.originalError = e;
      throw error;
    }
  };

  /**
   * クリアデータを削除する
   * @returns Promise<void>
   * @throws StorageError 削除中にエラーが発生した場合
   */
  const clearAllData = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('clearData');
    } catch (e) {
      console.error('Failed to clear data', e);
      
      // 具体的なエラー情報を含むカスタムエラー
      const error = new Error('クリアデータの削除に失敗しました') as StorageError;
      error.type = 'delete';
      error.originalError = e;
      throw error;
    }
  };

  return { 
    loadClearData, 
    saveClearData,
    clearAllData
  };
};