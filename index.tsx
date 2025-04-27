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

// シンプルな進捗バーコンポーネント（直接定義）
const SimpleProgressBar = ({ percentage, color }: { percentage: number, color: string }) => (
  <View style={{ width: '100%', height: 6, backgroundColor: '#374151', borderRadius: 4, overflow: 'hidden' }}>
    <View style={{ 
      width: `${Math.max(0, Math.min(100, percentage))}%`, 
      height: 6, 
      backgroundColor: color,
      borderRadius: 4
    }} />
  </View>
);

// ゲームカードコンポーネント（直接定義）
const SimpleGameCard = ({ 
  game, 
  clearCount, 
  totalCount, 
  onPress 
}: { 
  game: Game; 
  clearCount: number;
  totalCount: number;
  onPress: () => void; 
}) => {
  // 進捗率を計算
  const percentage = totalCount > 0 ? (clearCount / totalCount) * 100 : 0;

  return (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flex: 2 }}>
        <Text style={styles.gameTitle}>{game.title}</Text>
        <Text style={styles.gameInfo}>
          {game.leagues.length}リーグ / {game.machines.length}マシン
        </Text>
      </View>
      
      <View style={{ flex: 3, marginLeft: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: '#D1D5DB', fontSize: 12, width: 40 }}>クリア:</Text>
          <View style={{ flex: 1, marginRight: 4 }}>
            <SimpleProgressBar percentage={percentage} color="#059669" />
          </View>
          <Text style={{ color: '#D1D5DB', fontSize: 10 }}>
            {Math.round(percentage)}% ({clearCount}/{totalCount})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loadClearData, saveClearData } = useClearDataStorage();
  const [clearData, setClearData] = useState<ClearData>({});
  
  // テスト用のクリアデータカウント（各ゲーム用）
  const [gameClearCounts, setGameClearCounts] = useState<{[key: number]: number}>({});

  useEffect(() => {
    // データ読み込みと同時にテスト用のサンプルデータを作成
    const loadData = async () => {
      try {
        const data = await loadClearData();
        setClearData(data);
        
        // サンプルの進捗データを作成（テスト用）
        const counts: {[key: number]: number} = {};
        gameData.forEach(game => {
          // ゲームごとにランダムなクリア数を設定
          const totalCourses = game.machines.length * game.leagues.length * 2;
          const cleared = Math.floor(Math.random() * totalCourses);
          counts[game.id] = cleared;
        });
        setGameClearCounts(counts);
        
      } catch (error) {
        console.error("Failed to load data:", error);
        setClearData({});
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

  // シンプルなバックアップ関数（既存のものと同様）
  const createAndShareBackup = async () => {
    try {
      const data = JSON.stringify(clearData);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileUri = `${FileSystem.documentDirectory}fzero_backup_${timestamp}.json`;
      
      await FileSystem.writeAsStringAsync(fileUri, data);
      await FileSystem.shareAsync(fileUri);
      return true;
    } catch (error) {
      console.error("Backup error:", error);
      return false;
    }
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
          renderItem={({ item }) => {
            const totalCourses = item.machines.length * item.leagues.length * 2;
            const clearCount = gameClearCounts[item.id] || 0;
            
            return (
              <SimpleGameCard
                game={item}
                clearCount={clearCount}
                totalCount={totalCourses}
                onPress={() => handleGameSelect(item)}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
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
  gameCard: {
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row', // 水平レイアウト
    alignItems: 'center',
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