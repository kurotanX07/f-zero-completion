import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ArrowLeft, Info, Camera, User, Car, ArrowDown, Trophy } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AdBanner } from '../src/components/AdBanner';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { ClearData, Game, Machine } from '../src/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { i18n } from '../src/i18n/translations';
import { useLanguage } from '../src/contexts/LanguageContext';
import { getGameDataByLanguage } from '../src/data';
import { useTheme } from '../src/contexts/ThemeContext';

// CourseTimeインターフェース
interface CourseTime {
  courseId: number;
  time: number;
  rank: number | null;
}

// GrandPrixRecordインターフェースを直接定義
interface GrandPrixRecord {
  id: string;
  gameId: number;
  machineName: string;
  league: string;
  reverseMode: boolean;
  rank: number | null;
  date: number;
  racedAt?: number; // グランプリ挑戦日時
  totalTime: number;
  courseTimes: CourseTime[];
  screenshots: {
    uri: string;
    timestamp: number;
  }[];
}

// ClearDataの拡張インターフェース
interface ExtendedClearDataItem {
  rank?: number | null;
  overallRank?: number | null;
  hasScreenshot?: boolean;
  screenshotUri?: string;
  lapTimes?: number[];
  screenshots?: any[];
  records?: any[];
  bestRecord?: any;
  grandPrixRecords?: GrandPrixRecord[];
}

interface ExtendedClearData {
  [key: string]: ExtendedClearDataItem;
}

// ダークモード用のrankColors
const darkRankColors = {
  null: '#4B5563', // gray-600
  1: '#F59E0B', // yellow-500
  2: '#9CA3AF', // gray-400
  3: '#B45309', // yellow-700
  4: '#059669', // green-600
};

// ライトモード用のrankColors
const lightRankColors = {
  null: '#D1D5DB', // light gray
  1: '#CC9000', // darker gold for contrast
  2: '#707070', // darker silver for contrast
  3: '#8B5A1B', // darker bronze for contrast
  4: '#047857', // darker green for contrast
};

// Only F-ZERO X (2) and F-ZERO GX (3) have reverse mode
const GAMES_WITH_REVERSE_MODE = [2, 3];

export default function MatrixScreen() {
  const params = useLocalSearchParams<{ gameId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const { theme, themeMode } = useTheme();
  
  // テーマに応じたrankColorsを選択
  const rankColors = themeMode === 'dark' ? darkRankColors : lightRankColors;
  
  const gameId = parseInt(params.gameId || '1', 10);
  const [localGameData, setLocalGameData] = useState<Game[]>([]);
  
  // 表示モード切替
  const [displayMode, setDisplayMode] = useState<'timeTrial' | 'grandPrix'>('grandPrix');
  const [showGrandPrixDetails, setShowGrandPrixDetails] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [grandPrixRecords, setGrandPrixRecords] = useState<GrandPrixRecord[]>([]);
  
  // 言語に基づいてゲームデータを更新
  useEffect(() => {
    setLocalGameData(getGameDataByLanguage(language));
  }, [language]);
  
  const game = useMemo(() => 
    localGameData.find(g => g.id === gameId) || (localGameData.length > 0 ? localGameData[0] : null)
  , [gameId, localGameData]);
  
  const [clearData, setClearData] = useState<ExtendedClearData>({});
  const [showPilotNames, setShowPilotNames] = useState(false);
  const [reverseMode, setReverseMode] = useState(false);
  const { loadClearData, saveClearData } = useClearDataStorage();

  // リバースモードは常にfalseにリセット
  useEffect(() => {
    setReverseMode(false);
  }, [gameId]); // ゲームが変わるたびにリセット

  // Check if the current game has reverse mode
  const hasReverseMode = useMemo(() => 
    game && GAMES_WITH_REVERSE_MODE.includes(game.id)
  , [game]);

  useEffect(() => {
    const loadData = async () => {
      const data = await loadClearData();
      setClearData(data as ExtendedClearData);
    };
    loadData();
  }, []);

  // Save changes
  useEffect(() => {
    saveClearData(clearData as ClearData);
  }, [clearData]);

  const goToHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleCombinationSelect = useCallback((machine: Machine, league: string) => {
    if (!game) return;
    
    router.push({
      pathname: '/results',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false',
        mode: displayMode // タイムアタックかグランプリかを伝える
      }
    });
  }, [game, reverseMode, router, displayMode]);

  const handleMachineInfoSelect = useCallback((machine: Machine) => {
    if (!game) return;
    
    router.push({
      pathname: '/machine-info',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name)
      }
    });
  }, [game, router]);

  // グランプリの最高順位を取得する関数
  const getBestGrandPrixRank = useCallback((game: Game, machine: Machine, league: string) => {
    const key = `gp-${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
    
    if (!clearData[key] || !clearData[key].grandPrixRecords || clearData[key].grandPrixRecords.length === 0) {
      return null;
    }
    
    // すべてのグランプリ記録から最高順位（数値が小さいほど良い）を取得
    const validRanks = clearData[key].grandPrixRecords
      .map(record => record.rank)
      .filter(rank => rank !== null && rank !== undefined && rank > 0) as number[];
    
    if (validRanks.length === 0) return null;
    
    return Math.min(...validRanks);
  }, [clearData, reverseMode]);

  // 総合順位を取得する関数（タイムアタックモード用）
  const getOverallRank = useCallback((game: Game, machine: Machine, league: string) => {
    const key = `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}-overall`;
    return clearData[key]?.overallRank || null;
  }, [clearData, reverseMode]);

  // スクリーンショットの有無を取得する関数
  const hasScreenshot = useCallback((game: Game, machine: Machine, league: string) => {
    if (displayMode === 'grandPrix') {
      // グランプリモードではグランプリ記録のスクリーンショットを確認
      const key = `gp-${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
      return clearData[key]?.grandPrixRecords?.some(record => record.screenshots && record.screenshots.length > 0) || false;
    } else {
      // タイムアタックモードでは各コースのスクリーンショットを確認
      const checkKey = `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
      for (const key in clearData) {
        if (key.startsWith(checkKey) && clearData[key]?.hasScreenshot) {
          return true;
        }
      }
      return false;
    }
  }, [clearData, reverseMode, displayMode]);

  const toggleNameDisplay = useCallback(() => {
    setShowPilotNames(!showPilotNames);
  }, [showPilotNames]);

  const toggleReverseMode = useCallback(() => {
    setReverseMode(!reverseMode);
  }, [reverseMode]);

  // グランプリ詳細を表示する関数
  const showGrandPrixDetail = useCallback((machine: Machine, league: string) => {
    setSelectedMachine(machine);
    setSelectedLeague(league);
    
    // グランプリ記録を取得
    const key = `gp-${game?.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
    if (clearData[key] && clearData[key].grandPrixRecords) {
      setGrandPrixRecords(clearData[key].grandPrixRecords);
    } else {
      setGrandPrixRecords([]);
    }
    
    setShowGrandPrixDetails(true);
  }, [game, clearData, reverseMode]);

  // ミリ秒を「0:00.000」形式の文字列に変換する関数
  const msToTimeString = (ms: number): string => {
    if (ms === 0) return '-';
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  // ゲームデータがロードされるまで何も表示しない
  if (!game) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.header, 
        { paddingTop: insets.top > 0 ? insets.top + 16 : 20, backgroundColor: theme.surface }
      ]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={goToHome}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.primary} />
            <Text style={[styles.backButtonText, { color: theme.text }]}>{i18n.t('matrix.backToHome')}</Text>
          </TouchableOpacity>
          
          <View style={styles.headerControls}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: theme.surfaceSecondary }]}
              onPress={toggleNameDisplay}
              activeOpacity={0.7}
            >
              {showPilotNames ? 
                <Car size={14} color={theme.primary} style={styles.buttonIcon} /> : 
                <User size={14} color={theme.primary} style={styles.buttonIcon} />
              }
              <Text style={[styles.controlButtonText, { color: theme.text }]}>
                {showPilotNames ? i18n.t('matrix.machineName') : i18n.t('matrix.pilotName')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.text }]}>{game.title}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
          <View style={styles.tableHeader}>
              <View style={[styles.tableMachineCell, { backgroundColor: theme.primaryDark, borderBottomColor: theme.border }]}>
                <Text style={[styles.tableHeaderText, { color: 'white' }]}>{i18n.t('matrix.machine')}</Text>
              </View>
              {game.leagues.map(league => (
                <View key={league} style={[styles.tableHeaderCell, { backgroundColor: theme.primaryDark, borderBottomColor: theme.border }]}>
                  <Text style={[styles.tableHeaderText, { color: 'white' }]}>
                    {league.replace(' Cup', '').replace(' Series', '')}
                  </Text>
                </View>
              ))}
            </View>
            
            {game.machines.map(machine => (
              <View key={machine.name} style={styles.tableRow}>
                <TouchableOpacity 
                  style={[styles.tableMachineCell, { backgroundColor: theme.primary, borderBottomColor: theme.border }]}
                  onPress={() => handleMachineInfoSelect(machine)}
                  activeOpacity={0.7}
                >
                  <View style={styles.machineNameContainer}>
                    <Text style={[styles.machineNameText, { color: 'white' }]}>
                      {showPilotNames ? machine.pilot : machine.name}
                    </Text>
                    <Info size={12} color="white" />
                  </View>
                </TouchableOpacity>
                
                {game.leagues.map(league => {
                  // 表示モードに応じて適切な順位を取得
                  const rank = displayMode === 'grandPrix' ? 
                    getBestGrandPrixRank(game, machine, league) : 
                    getOverallRank(game, machine, league);
                    
                  const hasImage = hasScreenshot(game, machine, league);
                  
                  return (
                    <TouchableOpacity
                      key={league}
                      style={[
                        styles.tableCell,
                        { borderBottomColor: theme.border },
                        rank !== null && { backgroundColor: rankColors[rank as keyof typeof rankColors] }
                      ]}
                      onPress={() => {
                        // グランプリモードでも常にresults画面へ遷移するよう変更
                        handleCombinationSelect(machine, league);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.rankText, { color: themeMode === 'light' && rank === null ? theme.text : 'white' }]}>
                        {rank !== null ? rank : '-'}
                      </Text>
                      {hasImage && (
                        <Camera size={12} color={themeMode === 'light' ? theme.primary : 'white'} style={styles.cameraIcon} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      
      {/* グランプリ詳細モーダル */}
      <Modal
        visible={showGrandPrixDetails}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGrandPrixDetails(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {selectedMachine?.name} - {selectedLeague}
              {reverseMode ? ' (Reverse)' : ''}
            </Text>
            
            {grandPrixRecords.length > 0 ? (
              <FlatList
                data={grandPrixRecords}
                keyExtractor={(item, index) => `gp-${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.gpRecordItem, { borderBottomColor: theme.border }]}
                    onPress={() => {
                      // 詳細画面へ移動
                      router.push({
                        pathname: '/detail',
                        params: {
                          gameId: game.id.toString(),
                          machineName: encodeURIComponent(selectedMachine?.name || ''),
                          league: encodeURIComponent(selectedLeague || ''),
                          reverseMode: reverseMode ? 'true' : 'false',
                          mode: 'grandprix',
                          grandprixId: item.id
                        }
                      });
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.gpRecordHeader}>
                                             <Text style={[styles.gpRecordDate, { color: theme.textSecondary }]}>                         {new Date(item.racedAt || item.date).toLocaleDateString()}                       </Text>
                      <Text style={[styles.gpRecordRank, { color: theme.primary }]}>
                        {item.rank !== null ? `${item.rank}${i18n.t('detail.place') || '位'}` : '-'}
                      </Text>
                    </View>
                    <Text style={[styles.gpRecordTime, { color: theme.text }]}>
                      {i18n.t('detail.totalTime') || '合計タイム'}: {msToTimeString(item.totalTime)}
                    </Text>
                    <Text style={[styles.gpRecordCompleted, { color: theme.textSecondary }]}>
                      {i18n.t('detail.completedCourses') || '完了コース'}: 
                      {item.courseTimes.filter(ct => ct.time > 0).length} / {item.courseTimes.length}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.emptyRecords}>
                <Text style={[styles.emptyRecordsText, { color: theme.textSecondary }]}>
                  {i18n.t('detail.noRecords') || '記録がありません'}
                </Text>
              </View>
            )}
            
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.primary }]}
                onPress={() => setShowGrandPrixDetails(false)}
              >
                <Text style={styles.closeButtonText}>{i18n.t('common.close') || '閉じる'}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.newRecordButton, { backgroundColor: theme.primary }]}
                onPress={() => {
                  // 新しいグランプリ記録画面へ
                  router.push({
                    pathname: '/detail',
                    params: {
                      gameId: game.id.toString(),
                      machineName: encodeURIComponent(selectedMachine?.name || ''),
                      league: encodeURIComponent(selectedLeague || ''),
                      reverseMode: reverseMode ? 'true' : 'false',
                      mode: 'grandprix',
                      action: 'new'
                    }
                  });
                }}
              >
                <Text style={styles.closeButtonText}>{i18n.t('detail.newRecord') || '新規記録'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#93C5FD', // blue-300
  },
  headerControls: {
    flexDirection: 'row',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 4,
  },
  activeControlButton: {
    backgroundColor: '#1D4ED8', // blue-700
  },
  buttonIcon: {
    marginRight: 4,
  },
  controlButtonText: {
    fontSize: 12,
    color: '#93C5FD', // blue-300
  },
  activeButtonText: {
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
    marginLeft: 15,
  },
  modeTitle: {
    fontSize: 14,
    color: '#9CA3AF', // gray-400
    marginBottom: 2,
  },
  reverseText: {
    fontSize: 12,
    color: '#9CA3AF', // gray-400
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tableMachineCell: {
    width: 120,
    padding: 12,
    borderTopLeftRadius: 8,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  tableHeaderCell: {
    width: 80,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    fontWeight: '500',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: 80,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // gray-700
    position: 'relative',
  },
  machineNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  machineNameText: {
    marginRight: 4,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
  // モーダル関連のスタイル
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    backgroundColor: '#1E293B', // slate-800
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  gpRecordItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // gray-700
  },
  gpRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpRecordDate: {
    fontSize: 14,
    color: '#9CA3AF', // gray-400
  },
  gpRecordRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
  },
  gpRecordTime: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  gpRecordCompleted: {
    fontSize: 12,
    color: '#9CA3AF', // gray-400
  },
  emptyRecords: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyRecordsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#9CA3AF', // gray-400
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  closeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1D4ED8', // blue-700
    marginRight: 8,
  },
  newRecordButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#1D4ED8', // blue-700
    marginLeft: 8,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});