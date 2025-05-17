import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClearData } from '../types';

/**
 * グランプリデータをリセットする関数
 * @param gameId ゲームID
 * @param machineName マシン名
 * @param league リーグ名
 * @param reverseMode リバースモード
 * @returns 成功したかどうか
 */
export const resetGrandPrixData = async (
  gameId: number,
  machineName: string,
  league: string,
  reverseMode: boolean
): Promise<boolean> => {
  try {
    // 現在のクリアデータを取得
    const dataJson = await AsyncStorage.getItem('clearData');
    if (!dataJson) return true; // データがない場合は何もせず成功扱い
    
    const data = JSON.parse(dataJson) as ClearData;
    
    // グランプリキーを生成
    const gpKey = `gp-${gameId}-${machineName}-${league}${reverseMode ? '-reverse' : ''}`;
    
    // キーが存在する場合のみ処理する
    if (data[gpKey]) {
      // グランプリレコードを空にする
      if (data[gpKey].grandPrixRecords) {
        data[gpKey].grandPrixRecords = [];
      }
      
      // 保存
      await AsyncStorage.setItem('clearData', JSON.stringify(data));
    }
    
    return true;
  } catch (error) {
    console.error('グランプリデータのリセットに失敗しました', error);
    return false;
  }
};

/**
 * 特定のグランプリ記録を削除する関数
 * @param gameId ゲームID
 * @param machineName マシン名
 * @param league リーグ名
 * @param reverseMode リバースモード
 * @param grandPrixId 削除するグランプリID
 * @returns 成功したかどうか
 */
export const deleteGrandPrixRecord = async (
  gameId: number,
  machineName: string,
  league: string,
  reverseMode: boolean,
  grandPrixId: string
): Promise<boolean> => {
  try {
    // 現在のクリアデータを取得
    const dataJson = await AsyncStorage.getItem('clearData');
    if (!dataJson) return false;
    
    const data = JSON.parse(dataJson) as ClearData;
    
    // グランプリキーを生成
    const gpKey = `gp-${gameId}-${machineName}-${league}${reverseMode ? '-reverse' : ''}`;
    
    // キーが存在し、グランプリ記録がある場合
    if (data[gpKey] && data[gpKey].grandPrixRecords) {
      // 対象のグランプリ記録を削除
      data[gpKey].grandPrixRecords = data[gpKey].grandPrixRecords.filter(
        record => record.id !== grandPrixId
      );
      
      // 保存
      await AsyncStorage.setItem('clearData', JSON.stringify(data));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('グランプリ記録の削除に失敗しました', error);
    return false;
  }
};

/**
 * グランプリの記録状態をリセットする (編集中/進行中の状態をクリア)
 */
export const resetGrandPrixState = async (): Promise<boolean> => {
  try {
    // 進行中のグランプリ記録をクリア
    await AsyncStorage.removeItem('current_grandprix_recording');
    return true;
  } catch (error) {
    console.error('グランプリ状態のリセットに失敗しました', error);
    return false;
  }
}; 