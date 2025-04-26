// src/utils/backup.ts の内容
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createAndShareBackup = async () => {
  try {
    const clearData = await AsyncStorage.getItem('clearData');
    
    const fileUri = `${FileSystem.documentDirectory}fzero_backup.json`;
    await FileSystem.writeAsStringAsync(fileUri, clearData || '{}');
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      return true;
    }
    return false;
  } catch (e) {
    console.error('Backup failed', e);
    return false;
  }
};

export const restoreFromBackup = async (fileUri: string) => {
  try {
    const content = await FileSystem.readAsStringAsync(fileUri);
    await AsyncStorage.setItem('clearData', content);
    return true;
  } catch (e) {
    console.error('Restore failed', e);
    return false;
  }
};