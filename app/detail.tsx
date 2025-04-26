import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../src/components/Header';
import { gameData } from '../src/data/gameData';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { useScreenshot } from '../src/hooks/useScreenshot';
import { AdBanner } from '../src/components/AdBanner';
import { ClearData, Game, Machine } from '../src/types';
import { Camera, ImageIcon, Trash } from 'lucide-react-native';

export default function DetailScreen() {
  const params = useLocalSearchParams<{ 
    gameId: string; 
    machineName: string; 
    league: string; 
    reverseMode: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const gameId = parseInt(params.gameId || '1', 10);
  const machineName = decodeURIComponent(params.machineName || '');
  const league = decodeURIComponent(params.league || '');
  const reverseMode = params.reverseMode === 'true';
  
  const game = gameData.find(g => g.id === gameId) || gameData[0];
  const machine = game.machines.find(m => m.name === machineName) || game.machines[0];
  
  const { loadClearData, saveClearData } = useClearDataStorage();
  const { takeScreenshot, pickScreenshot } = useScreenshot();
  
  const [clearData, setClearData] = useState<ClearData>({});
  const [currentRank, setCurrentRank] = useState<number | null>(null);
  const [screenshotUri, setScreenshotUri] = useState<string | null>(null);

  // キーの生成関数
  const generateKey = () => {
    return `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
  };

  // データロード
  useEffect(() => {
    const loadData = async () => {
      const data = await loadClearData();
      setClearData(data);
      
      const key = generateKey();
      if (data[key]) {
        setCurrentRank(data[key].rank);
        setScreenshotUri(data[key].screenshotUri || null);
      }
    };
    loadData();
  }, [gameId, machineName, league, reverseMode]);

  // ランク設定
  const setRank = async (rank: number | null) => {
    const key = generateKey();
    const newClearData = { ...clearData };
    
    if (!newClearData[key]) {
      newClearData[key] = { rank, hasScreenshot: !!screenshotUri };
    } else {
      newClearData[key].rank = rank;
    }
    
    if (screenshotUri) {
      newClearData[key].screenshotUri = screenshotUri;
      newClearData[key].hasScreenshot = true;
    }
    
    await saveClearData(newClearData);
    setClearData(newClearData);
    setCurrentRank(rank);
  };

  // スクリーンショット追加
  const addScreenshot = async (method: 'take' | 'pick') => {
    try {
      const uri = method === 'take' 
        ? await takeScreenshot()
        : await pickScreenshot();
        
      if (uri) {
        setScreenshotUri(uri);
        
        // クリアデータも更新
        const key = generateKey();
        const newClearData = { ...clearData };
        
        if (!newClearData[key]) {
          newClearData[key] = { rank: currentRank, hasScreenshot: true, screenshotUri: uri };
        } else {
          newClearData[key].hasScreenshot = true;
          newClearData[key].screenshotUri = uri;
        }
        
        await saveClearData(newClearData);
        setClearData(newClearData);
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      Alert.alert('エラー', 'スクリーンショットの処理中にエラーが発生しました');
    }
  };

  // スクリーンショット削除
  const removeScreenshot = async () => {
    try {
      const key = generateKey();
      const newClearData = { ...clearData };
      
      if (newClearData[key]) {
        newClearData[key].hasScreenshot = false;
        delete newClearData[key].screenshotUri;
        
        await saveClearData(newClearData);
        setClearData(newClearData);
        setScreenshotUri(null);
      }
    } catch (error) {
      console.error('Screenshot removal error:', error);
      Alert.alert('エラー', 'スクリーンショットの削除中にエラーが発生しました');
    }
  };

  const handleBackPress = () => {
    router.push({
      pathname: '/matrix',
      params: { gameId: game.id.toString() }
    });
  };

  const confirmRemoveScreenshot = () => {
    Alert.alert(
      'スクリーンショット削除',
      'このスクリーンショットを削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: removeScreenshot }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title={`${machine.name}`}
        subtitle={`${league}リーグ ${reverseMode ? '(リバース)' : ''}`}
        showBackButton
        onBackPress={handleBackPress}
      />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>レース結果</Text>
          <View style={styles.rankButtons}>
            {[1, 2, 3, 4, null].map((rank) => (
              <TouchableOpacity
                key={`rank-${rank === null ? 'null' : rank}`}
                style={[
                  styles.rankButton,
                  currentRank === rank && styles.activeRankButton
                ]}
                onPress={() => setRank(rank)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.rankButtonText,
                  currentRank === rank && styles.activeRankButtonText
                ]}>
                  {rank === null ? 'クリア前' : rank === 4 ? '入賞' : `${rank}位`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>スクリーンショット</Text>
          
          {screenshotUri ? (
            <View style={styles.screenshotContainer}>
              <Image
                source={{ uri: screenshotUri }}
                style={styles.screenshot}
                resizeMode="contain"
              />
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmRemoveScreenshot}
                activeOpacity={0.7}
              >
                <Trash size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.deleteButtonText}>削除</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.screenshotActions}>
              <TouchableOpacity
                style={styles.screenshotButton}
                onPress={() => addScreenshot('take')}
                activeOpacity={0.7}
              >
                <Camera size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.screenshotButtonText}>写真を撮る</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.screenshotButton}
                onPress={() => addScreenshot('pick')}
                activeOpacity={0.7}
              >
                <ImageIcon size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.screenshotButtonText}>画像を選択</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>マシン情報</Text>
          <View style={styles.machineInfo}>
            <Text style={styles.machineInfoTitle}>パイロット</Text>
            <Text style={styles.machineInfoText}>{machine.pilot}</Text>
            
            <Text style={styles.machineInfoTitle}>スペック</Text>
            <View style={styles.specContainer}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>加速</Text>
                <Text style={styles.specValue}>{machine.specs.boost}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>耐久</Text>
                <Text style={styles.specValue}>{machine.specs.body}</Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>グリップ</Text>
                <Text style={styles.specValue}>{machine.specs.grip}</Text>
              </View>
            </View>
            
            <Text style={styles.machineInfoTitle}>説明</Text>
            <Text style={styles.machineInfoText}>{machine.description}</Text>
          </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
    marginBottom: 12,
  },
  rankButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rankButton: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  activeRankButton: {
    backgroundColor: '#1E40AF', // blue-800
  },
  rankButtonText: {
    color: '#D1D5DB', // gray-300
    fontWeight: '500',
  },
  activeRankButtonText: {
    color: 'white',
  },
  screenshotContainer: {
    alignItems: 'center',
  },
  screenshot: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#B91C1C', // red-800
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  screenshotActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenshotButton: {
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  screenshotButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  machineInfo: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 16,
  },
  machineInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
    marginBottom: 4,
    marginTop: 12,
  },
  machineInfoText: {
    color: '#D1D5DB', // gray-300
    marginBottom: 8,
  },
  specContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specItem: {
    alignItems: 'center',
    width: '30%',
  },
  specLabel: {
    color: '#D1D5DB', // gray-300
    fontSize: 12,
    marginBottom: 2,
  },
  specValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});