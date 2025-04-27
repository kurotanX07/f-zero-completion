import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Download, Upload } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdBanner } from '../src/components/AdBanner';
import { gameData } from '../src/data/gameData';
import { useClearDataStorage } from '../src/hooks/useStorage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ClearData, Game } from '../src/types';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loadClearData, saveClearData } = useClearDataStorage();
  const [clearData, setClearData] = useState<ClearData>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadClearData();
        setClearData(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
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
      const data = JSON.stringify(clearData);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileUri = `${FileSystem.documentDirectory}fzero_backup_${timestamp}.json`;
      
      await FileSystem.writeAsStringAsync(fileUri, data);
      await FileSystem.shareAsync(fileUri);
      
      Alert.alert('成功', 'バックアップファイルを保存または共有できます');
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

  // カスタムゲームカードレンダラー
  const renderGameItem = ({ item }: { item: Game }) => {
    // ゲームごとにランダムな進捗率を生成（テスト用）
    const progress1 = Math.random() * 100;
    const progress2 = Math.random() * 100;
    const progress3 = Math.random() * 100;
    
    return (
      <TouchableOpacity 
        style={styles.gameCard}
        onPress={() => handleGameSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle}>{item.title}</Text>
          <Text style={styles.gameSubtitle}>
            {item.leagues.length}リーグ / {item.machines.length}マシン
          </Text>
        </View>
        
        <View style={styles.progressSection}>
          {/* 1位の進捗バー */}
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>1位</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${progress1}%`,
                    backgroundColor: '#F59E0B' 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>{Math.round(progress1)}%</Text>
          </View>
          
          {/* 2位の進捗バー */}
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>2位+</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${progress2}%`,
                    backgroundColor: '#9CA3AF' 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>{Math.round(progress2)}%</Text>
          </View>
          
          {/* 3位の進捗バー */}
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>3位+</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${progress3}%`,
                    backgroundColor: '#B45309' 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>{Math.round(progress3)}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        { paddingTop: insets.top > 0 ? insets.top : 16 }
      ]}>
        <Text style={styles.title}>F-ZERO クリア状況管理</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>ゲームを選択</Text>
        <FlatList
          data={gameData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameItem}
          contentContainerStyle={styles.listContainer}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleBackupData}
            activeOpacity={0.7}
          >
            <Download size={16} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>データバックアップ</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleRestoreData}
            activeOpacity={0.7}
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
  listContainer: {
    paddingBottom: 16,
  },
  gameCard: {
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  gameInfo: {
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  gameSubtitle: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
    marginTop: 4,
  },
  progressSection: {
    marginTop: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    width: 40,
    fontSize: 12,
    color: '#D1D5DB', // gray-300
    marginRight: 8,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151', // gray-700
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    width: 40,
    fontSize: 12,
    color: '#D1D5DB', // gray-300
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
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