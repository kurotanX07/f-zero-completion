import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Download, Upload } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { AdBanner } from '../src/components/AdBanner';
import { gameData } from '../src/data/gameData';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { createAndShareBackup } from '../src/utils/backup';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ClearData, Game } from '../src/types';

export default function HomeScreen() {
  const router = useRouter();
  const { loadClearData, saveClearData } = useClearDataStorage();
  const [clearData, setClearData] = useState<ClearData>({});

  useEffect(() => {
    const loadData = async () => {
      const data = await loadClearData();
      setClearData(data);
    };
    loadData();
  }, []);

  const handleGameSelect = (game: Game) => {
    router.push({
      pathname: '/matrix',
      params: { gameId: game.id.toString() }
    });
  };

  const handleBackupData = async () => {
    try {
      const success = await createAndShareBackup();
      if (success) {
        Alert.alert('成功', 'バックアップファイルを保存または共有できます');
      } else {
        Alert.alert('エラー', 'バックアップの作成に失敗しました');
      }
    } catch (error) {
      console.error('Backup error:', error);
      Alert.alert('エラー', 'バックアップ中に問題が発生しました');
    }
  };

  const handleRestoreData = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;
      
      const fileUri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(fileUri);
      const parsedData = JSON.parse(content);
      
      await saveClearData(parsedData);
      setClearData(parsedData);
      
      Alert.alert('成功', 'データを復元しました');
    } catch (error) {
      console.error('Restore error:', error);
      Alert.alert('エラー', 'データの復元中にエラーが発生しました。ファイル形式が正しいか確認してください。');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>F-ZERO クリア状況管理</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>ゲームを選択</Text>
        <FlatList
          data={gameData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gameCard}
              onPress={() => handleGameSelect(item)}
            >
              <Text style={styles.gameTitle}>{item.title}</Text>
              <Text style={styles.gameInfo}>
                {item.leagues.length}リーグ / {item.machines.length}マシン
              </Text>
            </TouchableOpacity>
          )}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleBackupData}
          >
            <Download size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>データバックアップ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleRestoreData}
          >
            <Upload size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>データ復元</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // gray-900
  },
  header: {
    padding: 16,
    backgroundColor: '#1E3A8A', // blue-900
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
    marginBottom: 16,
  },
  gameCard: {
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  gameInfo: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#4338CA', // indigo-700
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});