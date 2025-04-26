// src/utils/backup.ts の改善版
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClearData } from '../types';

export interface BackupError extends Error {
  type: 'create' | 'share' | 'restore' | 'validation';
  originalError?: any;
}

/**
 * バックアップファイルを作成して共有する
 * @returns Promise<boolean> 成功時はtrue
 * @throws BackupError バックアップ処理中にエラーが発生した場合
 */
export const createAndShareBackup = async (): Promise<boolean> => {
  try {
    // データの取得
    const clearDataString = await AsyncStorage.getItem('clearData');
    
    // データが存在しない場合でも空のオブジェクトで処理
    const clearData = clearDataString ? clearDataString : '{}';
    
    // タイムスタンプを含むファイル名の生成
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileUri = `${FileSystem.documentDirectory}fzero_backup_${timestamp}.json`;
    
    // ファイルの書き込み
    await FileSystem.writeAsStringAsync(fileUri, clearData);
    
    // 共有機能のチェック
    if (!(await Sharing.isAvailableAsync())) {
      throw new Error('この端末では共有機能が利用できません');
    }
    
    // ファイルの共有
    await Sharing.shareAsync(fileUri, {
      mimeType: 'application/json',
      dialogTitle: 'F-ZERO クリアデータのバックアップ',
      UTI: 'public.json'  // iOS用
    });
    
    return true;
  } catch (e) {
    console.error('Backup failed', e);
    
    // エラーの種類を特定
    const errorMessage = e instanceof Error ? e.message : '不明なエラーが発生しました';
    const isShareError = errorMessage.includes('共有');
    
    // 具体的なエラータイプを含むカスタムエラー
    const error = new Error(`バックアップに失敗しました: ${errorMessage}`) as BackupError;
    error.type = isShareError ? 'share' : 'create';
    error.originalError = e;
    throw error;
    
    // エラー時はfalseを返す
    return false;
  }
};

/**
 * バックアップファイルからデータを復元する
 * @param fileUri 復元するバックアップファイルのURI
 * @returns Promise<ClearData> 復元されたクリアデータ
 * @throws BackupError 復元処理中にエラーが発生した場合
 */
export const restoreFromBackup = async (fileUri: string): Promise<ClearData> => {
  try {
    // ファイルの読み込み
    const content = await FileSystem.readAsStringAsync(fileUri);
    
    // JSONの検証
    let parsedData: ClearData;
    try {
      parsedData = JSON.parse(content);
      
      // 基本的な形式チェック
      if (typeof parsedData !== 'object' || parsedData === null) {
        throw new Error('無効なバックアップデータ形式です');
      }
    } catch (parseError) {
      console.error('JSON parse error', parseError);
      
      const error = new Error('バックアップファイルの形式が無効です') as BackupError;
      error.type = 'validation';
      error.originalError = parseError;
      throw error;
    }
    
    // データの保存
    await AsyncStorage.setItem('clearData', content);
    
    return parsedData;
  } catch (e) {
    console.error('Restore failed', e);
    
    // すでにBackupErrorの場合はそのまま再スロー
    if ((e as BackupError).type) {
      throw e;
    }
    
    // その他のエラーは復元エラーとして包む
    const error = new Error('データの復元に失敗しました') as BackupError;
    error.type = 'restore';
    error.originalError = e;
    throw error;
  }
};

/**
 * バックアップファイルの内容を検証する（実際に復元せずに）
 * @param fileUri 検証するバックアップファイルのURI
 * @returns Promise<{isValid: boolean, data?: ClearData, error?: string}> 検証結果
 */
export const validateBackupFile = async (fileUri: string): Promise<{
  isValid: boolean;
  data?: ClearData;
  error?: string;
}> => {
  try {
    // ファイルの読み込み
    const content = await FileSystem.readAsStringAsync(fileUri);
    
    // JSONの検証
    const parsedData = JSON.parse(content) as ClearData;
    
    // オブジェクトであることを確認
    if (typeof parsedData !== 'object' || parsedData === null) {
      return {
        isValid: false,
        error: 'バックアップファイルに有効なデータがありません'
      };
    }
    
    // データの概要を確認（ここで追加の検証ロジックを実装可能）
    const keyCount = Object.keys(parsedData).length;
    
    return {
      isValid: true,
      data: parsedData,
      // 追加情報があればここに含める
    };
  } catch (e) {
    console.error('Validation failed', e);
    
    return {
      isValid: false,
      error: e instanceof Error ? e.message : '不明なエラーによりファイルの検証に失敗しました'
    };
  }
};