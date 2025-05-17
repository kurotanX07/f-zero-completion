import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../src/components/Header';
import { getCourseInfo, getLeagueCourses } from '../src/data/courseData';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { AdBanner } from '../src/components/AdBanner';
import { ClearData, Screenshot, RaceRecord, GrandPrixRecord, CourseTime } from '../src/types';
import { Trophy, Clock, Edit, PlusCircle, ChevronRight, Calendar, ImageIcon, X, RefreshCcw, Trash, ArrowLeft } from 'lucide-react-native';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { i18n } from '../src/i18n/translations';
import { getGameDataByLanguage } from '../src/data';
import { resetGrandPrixData, resetGrandPrixState } from '../src/utils/resetGrandPrix';

// 拡張したClearDataItemの型
interface ExtendedClearDataItem {
  rank?: number | null;
  overallRank?: number | null;
  hasScreenshot?: boolean;
  screenshotUri?: string;
  lapTimes?: number[];
  screenshots?: Screenshot[];
  records?: RaceRecord[];
  bestRecord?: RaceRecord;
  grandPrixRecords?: GrandPrixRecord[];
}

// 拡張したClearDataの型
interface ExtendedClearData {
  [key: string]: ExtendedClearDataItem;
}

export default function ResultsScreen() {
  const params = useLocalSearchParams<{ 
    gameId: string; 
    machineName: string; 
    league: string; 
    reverseMode: string;
    mode: string; 
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  const gameId = parseInt(params.gameId || '1', 10);
  const machineName = decodeURIComponent(params.machineName || '');
  const league = decodeURIComponent(params.league || '');
  const reverseMode = params.reverseMode === 'true';
  const mode = params.mode || 'timeTrial'; // デフォルトはタイムアタック
  
  const [courses, setCourses] = useState<any[]>([]);
  const [clearData, setClearData] = useState<ExtendedClearData>({});
  const [grandPrixRecords, setGrandPrixRecords] = useState<GrandPrixRecord[]>([]);
  const [bestGrandPrixRank, setBestGrandPrixRank] = useState<number | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalContent, setModalContent] = useState<'datePicker' | 'courseList'>('datePicker');
  const [selectedGrandPrixForCourseList, setSelectedGrandPrixForCourseList] = useState<GrandPrixRecord | null>(null);

  const { loadClearData } = useClearDataStorage();
  
  // 言語に基づいて適切なゲームデータを選択
  const gameData = getGameDataByLanguage(language);
  const game = gameData.find(g => g.id === gameId) || gameData[0];
  const machine = game.machines.find(m => m.name === machineName) || game.machines[0];

  // データロード
  useEffect(() => {
    const loadData = async () => {
      const data = await loadClearData();
      setClearData(data as ExtendedClearData);
      
      // グランプリ記録を読み込む
      const gpKey = generateGrandPrixKey();
      if ((data as ExtendedClearData)[gpKey] && (data as ExtendedClearData)[gpKey].grandPrixRecords) {
        const records = (data as ExtendedClearData)[gpKey].grandPrixRecords || [];
        // 日付 (date) で降順ソート
        const sortedRecords = records.sort((a, b) => b.date - a.date);
        setGrandPrixRecords(sortedRecords);
        
        console.log('グランプリ記録:', sortedRecords.map(r => ({id: r.id, rank: r.rank, totalTime: r.totalTime})));
        
        // グランプリの最高順位を取得（ロジック改善）
        const validRanks = sortedRecords
          .map(record => {
            console.log(`記録ID ${record.id} の順位:`, record.rank, typeof record.rank);
            return record.rank;
          })
          .filter(rank => rank !== null && rank !== undefined);
        
        console.log('有効なランク:', validRanks); // デバッグ用
        
        if (validRanks.length > 0) {
          const minRank = Math.min(...validRanks as number[]);
          console.log('最高順位:', minRank); // デバッグ用
          setBestGrandPrixRank(minRank);
        } else {
          setBestGrandPrixRank(null);
        }
      }
    };
    loadData();
    
    // コース情報を取得
    const leagueCourses = getLeagueCourses(gameId, league);
    setCourses(leagueCourses);
  }, [gameId, machineName, league, reverseMode]);

  // グランプリ記録のキーを生成
  const generateGrandPrixKey = () => {
    return `gp-${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
  };
  
  // コース記録のキーを生成
  const generateCourseKey = (courseId: number) => {
    return `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}-${courseId}`;
  };
  
  // ミリ秒を「0:00.000」形式の文字列に変換する関数
  const msToTimeString = (ms: number): string => {
    if (ms === 0) return i18n.t('results.notEntered') || '未入力';
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };
  
  // コースの結果を取得
  const getCourseResult = (courseId: number) => {
    const key = generateCourseKey(courseId);
    return clearData[key];
  };
  
  // 特定コースのベストタイムを取得
  const getCourseBestTime = (courseId: number) => {
    const key = generateCourseKey(courseId);
    if (clearData[key] && clearData[key].bestRecord) {
      return clearData[key].bestRecord.totalTime;
    }
    return 0;
  };
  
  // 特定コースの最新の順位を取得
  const getCourseRank = (courseId: number) => {
    const key = generateCourseKey(courseId);
    if (clearData[key] && clearData[key].records && clearData[key].records.length > 0) {
      return clearData[key].records[clearData[key].records.length - 1].rank;
    }
    return null;
  };
  
  // スクリーンショットの有無を確認
  const hasScreenshots = (courseId: number) => {
    const key = generateCourseKey(courseId);
    return clearData[key] && clearData[key].screenshots && clearData[key].screenshots.length > 0;
  };
  
  // 新しいグランプリ記録を開始
  const handleStartNewGrandPrix = () => {
    router.push({
      pathname: '/detail',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false',
        courseId: '1', // デフォルトのコースID
        mode: 'grandprix',
        action: 'new'
      }
    });
  };
  
  // コース編集画面に移動
  const handleEditCourse = (courseId: number) => {
    router.push({
      pathname: '/detail',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false',
        courseId: courseId.toString(),
        mode: 'course'
      }
    });
  };
  
  // グランプリ詳細画面に移動
  const handleViewGrandPrix = (grandPrixId: string) => {
    router.push({
      pathname: '/detail',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false',
        mode: 'grandprix',
        grandprixId: grandPrixId
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setModalContent('datePicker');
    setSelectedGrandPrixForCourseList(null);
  };

  const handleDateSelect = (grandPrixId: string) => {
    const selectedGP = grandPrixRecords.find(gp => gp.id === grandPrixId);
    if (selectedGP) {
      setSelectedGrandPrixForCourseList(selectedGP);
      setModalContent('courseList');
    } else {
      hideDatePicker();
    }
  };

  const handleSelectCourseFromModal = (courseId: number) => {
    if (!selectedGrandPrixForCourseList) return;
    hideDatePicker();
    router.push({
      pathname: '/detail',
      params: { 
        gameId: selectedGrandPrixForCourseList.gameId.toString(),
        machineName: encodeURIComponent(selectedGrandPrixForCourseList.machineName),
        league: encodeURIComponent(selectedGrandPrixForCourseList.league),
        reverseMode: selectedGrandPrixForCourseList.reverseMode ? 'true' : 'false',
        courseId: courseId.toString(),
        mode: 'course',
      }
    });
  };
  
  // 前の画面に戻る
  const handleBackPress = () => {
    router.push({
      pathname: '/matrix',
      params: { 
        gameId: game.id.toString()
      }
    });
  };

  // タイムアタックモードでもグランプリの結果を見るための関数
  const handleViewGrandPrixResultsFromTimeTrial = () => {
    router.replace({
      pathname: '/results',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false',
        mode: 'grandPrix' // モードをグランプリに切り替え
      }
    });
  };

  // グランプリ記録をリセット（一つの記録を削除するよう修正）
  const handleResetGrandPrix = async (recordId: string) => {
    Alert.alert(
      i18n.t('common.warning'),
      i18n.t('detail.deleteGrandPrixRecordConfirm'),
      [
        {
          text: i18n.t('common.cancel'),
          style: 'cancel'
        },
        {
          text: i18n.t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            // 指定されたIDのグランプリ記録を削除
            const key = generateGrandPrixKey();
            const data = await loadClearData();
            const newClearData = { ...data } as ExtendedClearData;

            if (newClearData[key] && newClearData[key].grandPrixRecords) {
              // 削除対象のレコードを除外した新しい配列を作成
              const updatedRecords = newClearData[key].grandPrixRecords.filter(
                record => record.id !== recordId
              );
              
              // 更新されたデータを保存
              newClearData[key].grandPrixRecords = updatedRecords;
              await useClearDataStorage().saveClearData(newClearData as ClearData);
              
              // データを再読み込み
              const refreshedData = await loadClearData();
              setClearData(refreshedData as ExtendedClearData);
              
              // グランプリ記録を更新
              if (refreshedData[key] && refreshedData[key].grandPrixRecords) {
                const sortedRecords = refreshedData[key].grandPrixRecords.sort((a, b) => b.date - a.date);
                setGrandPrixRecords(sortedRecords);
                
                // 最高順位の再計算
                const validRanks = sortedRecords
                  .map(record => {
                    console.log(`記録ID ${record.id} の順位:`, record.rank, typeof record.rank);
                    return record.rank;
                  })
                  .filter(rank => rank !== null && rank !== undefined);
                
                console.log('有効なランク:', validRanks); // デバッグ用
                
                if (validRanks.length > 0) {
                  const minRank = Math.min(...validRanks as number[]);
                  console.log('最高順位:', minRank); // デバッグ用
                  setBestGrandPrixRank(minRank);
                } else {
                  setBestGrandPrixRank(null);
                }
              } else {
                setGrandPrixRecords([]);
                setBestGrandPrixRank(null);
              }
              
              Alert.alert(
                i18n.t('common.success'),
                i18n.t('detail.deleteGrandPrixRecordTitle')
              );
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header 
        title={`${game.title} - ${machine.name}`}
        subtitle={`${league}${reverseMode ? ' (Reverse)' : ''}`}
        onBackPress={handleBackPress}
      />
      
      {/* 戻るボタンを追加 */}
      <View style={{
        position: 'absolute',
        top: insets.top + 10,
        left: 16,
        zIndex: 10,
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.surfaceSecondary,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleBackPress}
        >
          <ArrowLeft size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {/* モード表示を削除 */}
        
        {/* グランプリ結果セクション（モードに関わらず表示） */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {i18n.t('results.grandPrixResults') || 'グランプリ結果'}
            </Text>
            <Trophy size={20} color={theme.primary} />
          </View>
          
          {grandPrixRecords.length > 0 ? (
            <>
              <View style={[styles.resultSummary, { backgroundColor: theme.surfaceSecondary }]}>
                <View style={styles.resultItem}>
                  <Text style={[styles.resultLabel, { color: theme.textSecondary }]}>
                    {i18n.t('detail.totalRank') || '総合順位'}（{i18n.t('results.bestRank') || '最高順位'}）
                  </Text>
                  <Text style={[styles.resultValue, { color: theme.text }]}>
                    {bestGrandPrixRank !== null && bestGrandPrixRank !== undefined ? `${bestGrandPrixRank}${i18n.t('detail.place') || '位'}` : '-'}
                  </Text>
                </View>
                
                <View style={styles.resultItem}>
                  <Text style={[styles.resultLabel, { color: theme.textSecondary }]}>
                    {i18n.t('results.recordCount') || '記録数'}
                  </Text>
                  <Text style={[styles.resultValue, { color: theme.text }]}>
                    {grandPrixRecords.length}
                  </Text>
                </View>
              </View>
              
              {/* グランプリ記録一覧 */}
              {grandPrixRecords.slice(0, 5).map((record, index) => (
                <View
                  key={`gp-${index}`}
                  style={[styles.gpRecordItem, { backgroundColor: theme.surfaceSecondary }]}
                >
                  <View style={styles.gpRecordHeader}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={[styles.gpRecordDate, { color: theme.text }]}>
                        {new Date(record.date).toLocaleDateString()}
                      </Text>
                      <Text style={[styles.gpRecordRank, { color: theme.primary, marginLeft: 8 }]}>
                        {record.rank !== null && record.rank !== undefined ? `${record.rank}${i18n.t('detail.place') || '位'}` : '-'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ padding: 4 }}
                      onPress={() => handleResetGrandPrix(record.id)}
                    >
                      <Trash size={16} color="#c53030" />
                    </TouchableOpacity>
                  </View>
                  
                  <TouchableOpacity
                    style={styles.gpRecordContent}
                    onPress={() => handleViewGrandPrix(record.id)}
                  >
                    <View style={styles.gpRecordDetails}>
                      <Text style={[styles.gpRecordTime, { color: theme.textSecondary }]}>
                        {i18n.t('results.totalTime') || '合計タイム'}: {msToTimeString(record.totalTime)}
                      </Text>
                      
                      {/* 総合順位を常に表示（タイムが0でも表示） */}
                      <Text style={[styles.gpRecordCourseCount, { color: theme.textSecondary, marginTop: 4 }]}>
                        {i18n.t('detail.totalRank') || '総合順位'}: 
                        {record.rank !== null && record.rank !== undefined ? ` ${record.rank}${i18n.t('detail.place') || '位'}` : ' -'}
                      </Text>

                      {/* コース数を表示 */}
                      <Text style={[styles.gpRecordCourseCount, { color: theme.textSecondary }]}>
                        {i18n.t('results.courseCount') || 'コース数'}: {record.courseTimes.length}
                      </Text>

                      {/* ポイント数を表示（存在する場合） */}
                      {record.points !== undefined && record.points !== null && (
                        <Text style={[styles.gpRecordCourseCount, { color: theme.textSecondary }]}>
                          {i18n.t('detail.points') || 'ポイント数'}: {record.points}
                        </Text>
                      )}

                      {/* マシン破壊数を表示（存在する場合） */}
                      {record.destroyedMachines !== undefined && record.destroyedMachines !== null && (
                        <Text style={[styles.gpRecordCourseCount, { color: theme.textSecondary }]}>
                          {i18n.t('detail.destroyedMachines') || 'マシン破壊数'}: {record.destroyedMachines}
                        </Text>
                      )}

                      {/* コース順位を表示 */}
                      <Text style={[styles.gpRecordCourseCount, { color: theme.textSecondary, marginTop: 4 }]}>
                        {i18n.t('results.courseRanks') || 'コース順位'}: 
                        {record.courseTimes
                          .filter(ct => ct.rank !== null)
                          .sort((a, b) => a.courseId - b.courseId)
                          .map((ct, i) => ` ${ct.rank}${i < record.courseTimes.filter(ct => ct.rank !== null).length - 1 ? ',' : ''}`)
                        }
                      </Text>
                    </View>
                    
                    {/* スクリーンショットがあれば最初の1枚を表示 */}
                    {record.screenshots && record.screenshots.length > 0 && (
                      <View style={styles.gpRecordImageContainer}>
                        <Image
                          source={{ uri: record.screenshots[0].uri }}
                          style={styles.gpRecordThumbnail}
                        />
                        {record.screenshots.length > 1 && (
                          <View style={styles.imageCountBadge}>
                            <Text style={styles.imageCountText}>+{record.screenshots.length - 1}</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              ))}
              
              {grandPrixRecords.length > 5 && (
                <TouchableOpacity
                  style={[styles.viewMoreButton, { borderColor: theme.border }]}
                  onPress={() => handleViewGrandPrix(grandPrixRecords[0].id)}
                >
                  <Text style={[styles.viewMoreText, { color: theme.textSecondary }]}>
                    {i18n.t('results.viewMore') || 'すべての記録を表示'}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                {i18n.t('results.noGrandPrixRecords') || 'グランプリの記録がありません'}
              </Text>
            </View>
          )}
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.accent }]}
              onPress={handleStartNewGrandPrix}
            >
              <PlusCircle size={16} color="white" style={{ marginRight: 8 }} />
              <Text style={[styles.actionButtonText, { color: 'white' }]}>
                {i18n.t('results.startNewGrandPrix') || 'グランプリ記録を追加する'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* 日付選択モーダル */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDatePickerVisible}
        onRequestClose={hideDatePicker}
      >
        <View style={styles.modalCenteredView}>
          <View style={[styles.modalView, { backgroundColor: theme.surface }]}>
            {modalContent === 'datePicker' && (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  {i18n.t('results.selectGrandPrixDate')}
                </Text>
                <FlatList
                  data={grandPrixRecords} // ソート済みの記録を使用
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={[styles.modalButton, { borderBottomColor: theme.border }]}
                      onPress={() => handleDateSelect(item.id)}
                    >
                      <Text style={[styles.modalButtonText, { color: theme.text }]}>
                        {new Date(item.date).toLocaleDateString()} - {i18n.t('results.rank')}: {item.rank !== null && item.rank !== undefined ? `${item.rank}${i18n.t('detail.place') || '位'}` : '-'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={[styles.emptyStateText, { color: theme.textSecondary, paddingVertical: 20 }]}>
                      {i18n.t('results.noGrandPrixRecords')}
                    </Text>
                  )}
                />
              </>
            )}

            {modalContent === 'courseList' && selectedGrandPrixForCourseList && (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  {i18n.t('results.selectedGrandPrixCoursesTitle')}
                </Text>
                <FlatList
                  data={selectedGrandPrixForCourseList.courseTimes.sort((a,b) => a.courseId - b.courseId)} // コースID順にソート
                  keyExtractor={(item) => item.courseId.toString()}
                  renderItem={({ item }) => {
                    const courseInfo = getCourseInfo(selectedGrandPrixForCourseList.gameId, item.courseId);
                    return (
                      <TouchableOpacity 
                        style={[styles.modalButton, { borderBottomColor: theme.border, paddingVertical: 8 }]}
                        onPress={() => handleSelectCourseFromModal(item.courseId)}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                          <Text style={[styles.modalButtonText, { color: theme.text, flexShrink: 1, textAlign: 'left' }]}>
                            {courseInfo?.name || `Course ID: ${item.courseId}`}
                          </Text>
                          <View style={{ alignItems: 'flex-end'}}>
                            <Text style={[styles.modalButtonText, { color: theme.primary, fontSize: 14 }]}>
                              {msToTimeString(item.time)}
                            </Text>
                            <Text style={[styles.modalButtonText, { color: theme.textSecondary, fontSize: 12 }]}>
                              {i18n.t('results.rank')}: {item.rank !== null && item.rank !== undefined ? `${item.rank}${i18n.t('detail.place') || '位'}` : '-'}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={() => (
                    <Text style={[styles.emptyStateText, { color: theme.textSecondary, paddingVertical: 20 }]}>
                      {i18n.t('results.noCourseTimes')}
                    </Text>
                  )}
                />
                <TouchableOpacity
                  style={[styles.buttonSmall, { backgroundColor: theme.surfaceSecondary, marginTop: 12, width: '100%' }]}
                  onPress={() => setModalContent('datePicker')}
                >
                  <Text style={[styles.buttonSmallText, { color: theme.text }]}>{i18n.t('results.backToDatePicker')}</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={[styles.buttonSmall, { backgroundColor: theme.primary, marginTop: 16, width: '100%' }]}
              onPress={hideDatePicker}
            >
              <Text style={styles.buttonSmallText}>{i18n.t('common.close')}</Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  // モードインジケータのスタイルを削除
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  // コースリストのスタイルは残しておく（他の機能で必要かもしれないため）
  courseList: {
    gap: 10,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  courseMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
    flexShrink: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    flexShrink: 1,
  },
  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  courseTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  courseTime: {
    fontSize: 16,
  },
  courseIcon: {
    marginLeft: 4,
  },
  rankBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rankText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  // グランプリ結果
  resultSummary: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  gpRecordItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  gpRecordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpRecordDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  gpRecordRank: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gpRecordContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpRecordDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  gpRecordTime: {
    fontSize: 14,
  },
  gpRecordCourseCount: {
    fontSize: 12,
  },
  gpRecordImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpRecordThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 4,
  },
  imageCountBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 2,
    paddingVertical: 1,
    marginLeft: 4,
  },
  imageCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
  },
  newRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  newRecordButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    elevation: 1, // Slight elevation for buttons
  },
  buttonSmallText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  buttonIconSmall: {
    marginRight: 6,
  },
  emptyState: {
    alignItems: 'center',
    padding: 16,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
  },
  editButton: {
    padding: 4,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 16,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  gpRecordTotalRank: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 