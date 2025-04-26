// src/hooks/useStorage.ts の内容
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClearData } from '../types';

export const useClearDataStorage = () => {
  const loadClearData = async (): Promise<ClearData> => {
    try {
      const data = await AsyncStorage.getItem('clearData');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Failed to load clear data', e);
      return {};
    }
  };

  const saveClearData = async (data: ClearData): Promise<void> => {
    try {
      await AsyncStorage.setItem('clearData', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save clear data', e);
    }
  };

  return { loadClearData, saveClearData };
};