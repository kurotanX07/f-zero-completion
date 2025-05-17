import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ScrollView, Modal, FlatList, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../src/components/Header';
import { gameData } from '../src/data/gameData';
import { gameDataEn } from '../src/data/gameDataEn';
import { getCourseInfo, getGameCourses, getLeagueCourses, getDefaultLaps } from '../src/data/courseData';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { useScreenshot } from '../src/hooks/useScreenshot';
import { AdBanner } from '../src/components/AdBanner';
import { ClearData, Game, Machine, Screenshot, RaceRecord } from '../src/types';
import { Camera, ImageIcon, Trash, Clock, ChevronDown, Trophy, Plus, X, ChevronLeft, ChevronRight, ArrowLeft, Calendar } from 'lucide-react-native';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { i18n } from '../src/i18n/translations';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

// 画面の幅を取得
const { width: screenWidth } = Dimensions.get('window');

// GrandPrixRecordインターフェースを直接定義（types.tsからインポートできない問題を解決）
interface GrandPrixRecord {
  id: string;
  gameId: number;
  machineName: string;
  league: string;
  reverseMode: boolean;
  rank: number | null;
  date: number;
  racedAt: number; // グランプリ挑戦日時
  totalTime: number;
  courseTimes: CourseTime[];
  screenshots: Screenshot[];
  points?: number | null; // ポイント数（任意）
  destroyedMachines?: number | null; // マシン破壊数（任意）
}

// 型安全なfindメソッドのためのutil関数
const findCourseTime = (courseTimes: CourseTime[], courseId: number): CourseTime | undefined => {
  return courseTimes.find(ct => ct.courseId === courseId);
};

// clearDataItemの型を拡張（grandPrixRecordsプロパティのため）
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

// clearDataの型を拡張
interface ExtendedClearData {
  [key: string]: ExtendedClearDataItem;
}

// CourseTimeインターフェースをローカルで定義
interface CourseTime {
  courseId: number;
  time: number;
  rank: number | null;
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4, // さらに削減してより広く
    paddingHorizontal: 2, // 左右のパディングを最小に
    paddingBottom: 60, // 広告スペース用の余白を確保
  },
  section: {
    borderRadius: 8,
    padding: 10, // 垂直方向も少し小さく
    paddingHorizontal: 6, // 水平方向のパディングを最小に
    marginBottom: 10, // 下部マージンも小さく
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  // 新しいUI用のスタイル
  statusPanel: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionBlock: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  // ラップタイム入力関連
  lapTimeInputContainer: {
    marginBottom: 12,
  },
  lapTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: theme.border, 
  },
  lapNumberText: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lapTimeInput: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    minWidth: 100,
    padding: 4,
    borderRadius: 4,
  },
  resetButton: {
    position: 'absolute',
    right: 8,
    padding: 4,
  },
  quickButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 6,
  },
  quickButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  quickButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  totalTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 2,
    paddingBottom: 8,
    borderColor: theme.border, 
  },
  totalTimeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalTimeValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ランク選択
  rankButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  rankButtonText: {
    fontWeight: '500',
  },
  // スクリーンショット関連
  screenshotContainer: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  screenshotImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  screenshotNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  screenshotActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  screenshotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  screenshotButtonText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '500',
  },
  // アクションボタン
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: theme.primary, 
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  // モーダル関連
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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
    textAlign: 'center',
  },
  courseItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: theme.border, 
  },
  courseItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // フルスクリーンビューア
  fullscreenViewerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fullscreenCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sectionHeaderWithHelp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 12,
    fontWeight: '400',
  },
  gpDetailHeader: {
    marginBottom: 16,
  },
  gpDetailHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpDetailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  gpDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gpScreenshotSection: {
    marginBottom: 16,
  },
  gpSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  gpThumbnailContainer: {
    marginRight: 8,
  },
  gpThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  gpCourseSection: {
    marginBottom: 16,
  },
  gpCourseItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: theme.border,
  },
  gpCourseItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpCourseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  gpCourseRank: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  gpCourseTime: {
    fontSize: 14,
    fontWeight: '400',
  },
  gpModalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  courseSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: theme.border,
  },
  courseSelectorText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

// Expo Routerのためのデフォルトエクスポート
export default function DetailScreen() {
  const params = useLocalSearchParams<{
    gameId: string;
    machineName: string;
    league: string;
    courseId: string;
    reverseMode: string;
    mode: string;
    action: string;
    grandprixId: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const { loadClearData, saveClearData } = useClearDataStorage();
  
  // デバイスの向きを検出
  const [isLandscape, setIsLandscape] = useState(false);

  // URLパラメータを解析
  const gameId = parseInt(params.gameId || '1', 10);
  const machineName = decodeURIComponent(params.machineName || 'Blue Falcon');
  const league = decodeURIComponent(params.league || 'Knight League');
  const courseId = parseInt(params.courseId || '1', 10);
  const reverseMode = params.reverseMode === 'true';
  const mode = params.mode || 'course';
  const action = params.action || '';
  const grandprixId = params.grandprixId || '';
  
  // 選択中のコースID
  const [selectedCourseId, setSelectedCourseId] = useState(courseId);
  
  // タイムアタック関連の状態
  const [currentRank, setCurrentRank] = useState<number | null>(null);
  const [records, setRecords] = useState<RaceRecord[]>([]);
  const [currentRecordIndex, setCurrentRecordIndex] = useState<number>(0);
  const [showRecordHistory, setShowRecordHistory] = useState<boolean>(false);
  const [currentOverallRank, setCurrentOverallRank] = useState<number | null>(null);
  
  // 総合順位の初期化
  useEffect(() => {
    // コンポーネントマウント時に初期化
    console.log('DetailScreen mounted - currentOverallRankを初期化');
    setCurrentOverallRank(null);
  }, []);
  
  const { takeScreenshot, pickScreenshot } = useScreenshot();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  // 基本データ
  const [clearData, setClearData] = useState<ClearData>({});
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  
  // ラップタイム関連
  const [totalLaps, setTotalLaps] = useState<number>(5);
  const [lapTimes, setLapTimes] = useState<number[]>(Array(5).fill(0));
  const [totalTime, setTotalTime] = useState<number>(0);
  const [rankChanged, setRankChanged] = useState<boolean>(false); // 順位が変更されたかのフラグ
  
  // スクリーンショット関連
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<number>(0);
  const [screenshotViewerVisible, setScreenshotViewerVisible] = useState<boolean>(false);
  
  // モーダル表示関連
  const [courseModalVisible, setCourseModalVisible] = useState<boolean>(false);
  const [grandPrixRecordingMode, setGrandPrixRecordingMode] = useState<boolean>(false); // グランプリ記録モードフラグ
  const [grandPrixFlowStep, setGrandPrixFlowStep] = useState<number>(0); // 0: 未開始, 1: 日時設定, 2: タイムアタック中, 3: 総合順位入力
  const [grandPrixRacedAt, setGrandPrixRacedAt] = useState<number>(Date.now());
  const [tempRacedAt, setTempRacedAt] = useState<number>(Date.now()); // 追加：日付選択モーダル用の一時的な日付保持
  const [currentGrandPrixCourseTimes, setCurrentGrandPrixCourseTimes] = useState<CourseTime[]>([]);
  const [grandPrixScreenshots, setGrandPrixScreenshots] = useState<Screenshot[]>([]);
  const [grandPrixModalVisible, setGrandPrixModalVisible] = useState<boolean>(false);
  const [grandPrixDateModalVisible, setGrandPrixDateModalVisible] = useState<boolean>(false); // 新しい日付選択モーダル用
  
  // 総合結果用の状態変数
  const [isOverallResultMode, setIsOverallResultMode] = useState<boolean>(false);
  const [overallPoints, setOverallPoints] = useState<number | null>(null);
  const [destroyedMachines, setDestroyedMachines] = useState<number | null>(null);
  
  // 言語に基づいて適切なゲームデータを選択
  const data = language === 'en' ? gameDataEn : gameData;
  const game = data.find(g => g.id === gameId) || data[0];
  const machine = game.machines.find(m => m.name === machineName) || game.machines[0];
  
  // 総合順位用のキー生成関数
  const generateOverallKey = () => {
    // キーにモード情報を追加
    const modeInfo = mode === 'grandprix' ? '-grandprix' : '-timeTrial';
    return `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}${modeInfo}-overall`;
  };

  // コース情報の読み込み  
  useEffect(() => {
    // 特定のゲームでは、リーグ固有のコースのみを表示する
    const gamesThatRequireStrictLeagueFiltering = [4, 5, 6]; // Max Velocity, GP Legend, Climax
    
    // リーグに基づいてコースをフィルタリング
    const courses = getLeagueCourses(gameId, league);
    
    if (courses.length === 0) {
      // 特定のゲーム（Maximum Velocity、GP Legend、Climax）では、リーグが空の場合でも
      // 全コースを返さず、空のリストを設定する
      if (gamesThatRequireStrictLeagueFiltering.includes(gameId)) {
        console.warn(`${game.title}のリーグ「${league}」には対応コースがありません。`);
        setAvailableCourses([]);
      } else {
        // その他のゲームでは、従来通り全コースをフォールバックとして表示
      console.warn(`リーグ「${league}」には対応コースがありません。全コースから選択します。`);
      const allCourses = getGameCourses(gameId);
      setAvailableCourses(allCourses);
      
      // コースが選択されていない場合は最初のコースを選択
      if (allCourses.length > 0 && !allCourses.some(c => c.id === selectedCourseId)) {
        setSelectedCourseId(allCourses[0].id);
        }
      }
    } else {
      // 常にリーグに基づいたコースのみを表示する
      setAvailableCourses(courses);
      
      // もし選択中のコースIDがリーグに属していなければ、リーグの最初のコースを選択
      if (!courses.some(c => c.id === selectedCourseId)) {
        setSelectedCourseId(courses[0].id);
      }
    }
  }, [gameId, league, game.title]);

  // コース変更時の処理
  useEffect(() => {
    // コース変更時にそのコースのラップ数に合わせてラップタイム配列をリセット
    const newCourseInfo = getCourseInfo(gameId, selectedCourseId);
    const newTotalLaps = newCourseInfo?.laps || getDefaultLaps(gameId);
    
    // 選択したコースの保存済みデータを読み込む
    const key = generateKey(); // モード情報を含むキー
    if (clearData[key]) {
      if (clearData[key].records && clearData[key].records.length > 0) {
        // 新システム：複数記録から最新のものをロード
        const latestRecord = clearData[key].records[clearData[key].records.length - 1];
        setLapTimes(latestRecord.lapTimes);
        setTotalTime(latestRecord.totalTime);
        setCurrentRank(latestRecord.rank);
        setRecords(clearData[key].records);
        setCurrentRecordIndex(clearData[key].records.length - 1);
      } else if (clearData[key].lapTimes && clearData[key].lapTimes.length > 0) {
        // 下位互換性のための処理
        setLapTimes(clearData[key].lapTimes);
        const sum = clearData[key].lapTimes.reduce((acc, current) => acc + current, 0);
        setTotalTime(sum);
        setCurrentRank(clearData[key]?.rank ?? null);
        
        // 既存データから記録を作成
        const legacyRecord: RaceRecord = {
          rank: clearData[key]?.rank ?? null,
          date: Date.now() - 86400000, // 1日前（仮定）
          totalTime: sum,
          lapTimes: [...clearData[key].lapTimes],
          screenshots: clearData[key].screenshots
        };
        
        setRecords([legacyRecord]);
        setCurrentRecordIndex(0);
      } else {
        setLapTimes(Array(newTotalLaps).fill(0));
        setTotalTime(0);
        setRecords([]);
        setCurrentRecordIndex(-1);
      }
      
      // スクリーンショット情報の読み込み
      if (clearData[key].screenshots) {
        setScreenshots(clearData[key].screenshots);
      } else {
        setScreenshots([]);
      }
    } else {
      // 新規コース
      setLapTimes(Array(newTotalLaps).fill(0));
      setTotalTime(0);
      setCurrentRank(null);
      setScreenshots([]);
      setRecords([]);
      setCurrentRecordIndex(-1);
    }
    
    // 総合順位データの読み込み
    const overallKey = generateOverallKey();
    if (clearData[overallKey]) {
      setCurrentOverallRank(clearData[overallKey].overallRank || null);
    } else {
      setCurrentOverallRank(null);
    }
  }, [selectedCourseId, clearData, gameId, league, reverseMode, mode]); // mode も依存配列に追加

  // キーの生成関数を修正
  const generateKey = () => {
    // キーにモード情報（'timeTrial' または 'grandprix'）を追加して、モード間で記録を分離
    const modeInfo = mode === 'grandprix' ? '-grandprix' : '-timeTrial';
    return `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}${modeInfo}-${selectedCourseId}`;
  };

  // データロード
  useEffect(() => {
    const loadData = async () => {
      const data = await loadClearData();
      setClearData(data);
    };
    loadData();
  }, [gameId, machineName, league, reverseMode, mode]); // mode も依存配列に追加

  // 新しい記録を保存する
  const saveNewRecord = async (rank: number | null) => {
    // 現在のラップタイムと合計タイムからレコードを作成
    const newRecord: RaceRecord = {
      rank,
      date: Date.now(),
      totalTime,
      lapTimes: [...lapTimes],
      screenshots: screenshots.length > 0 ? [...screenshots] : undefined
    };
    
    // 記録リストに追加
    const updatedRecords = [...records, newRecord];
    
    // 最高記録の計算
    const bestRecord = calculateBestRecord(updatedRecords);
    
    // 保存
    const key = generateKey();
    const newClearData = { ...clearData };
    
    if (!newClearData[key]) {
      newClearData[key] = {
        rank, // 下位互換性のため
        hasScreenshot: screenshots.length > 0,
        lapTimes: [...lapTimes], // 下位互換性のため
        records: updatedRecords,
        bestRecord
      };
    } else {
      newClearData[key].rank = rank; // 下位互換性のため
      newClearData[key].lapTimes = [...lapTimes]; // 下位互換性のため
      newClearData[key].records = updatedRecords;
      newClearData[key].bestRecord = bestRecord;
      
      if (screenshots.length > 0) {
        newClearData[key].hasScreenshot = true;
        if (screenshots[0]) {
          newClearData[key].screenshotUri = screenshots[0].uri; // 下位互換性のため
        }
        newClearData[key].screenshots = screenshots; // 下位互換性のため
      }
    }
    
    await saveClearData(newClearData);
    setClearData(newClearData);
    setRecords(updatedRecords);
    setCurrentRecordIndex(updatedRecords.length - 1);
    setCurrentRank(rank);
    
    // 記録の保存を確認するメッセージを表示
    Alert.alert(
      i18n.t('detail.recordSaved'),
      i18n.t('detail.newRecordAdded'),
      [{ text: i18n.t('common.ok'), style: 'default' }]
    );
  };
  
  // 複数の記録から最高記録を計算する
  const calculateBestRecord = (recordList: RaceRecord[]): RaceRecord | undefined => {
    if (recordList.length === 0) return undefined;
    
    // 最速タイムの記録を選択（totalTimeが0以上の中から最小のもの）
    const validRecords = recordList.filter(r => r.totalTime > 0);
    if (validRecords.length === 0) return recordList[recordList.length - 1]; // タイムがない場合は最新
    
    return validRecords.reduce((best, current) => {
      // タイムが早い方、または同じなら順位が良い方を選択
      if (current.totalTime < best.totalTime) return current;
      if (current.totalTime === best.totalTime && 
          current.rank !== null && best.rank !== null && 
          current.rank < best.rank) return current;
      return best;
    }, validRecords[0]);
  };
  
  // 記録ヒストリーから特定の記録をロードする
  const loadRecord = (index: number) => {
    if (index >= 0 && index < records.length) {
      const record = records[index];
      setLapTimes(record.lapTimes);
      setTotalTime(record.totalTime);
      setCurrentRank(record.rank);
      setCurrentRecordIndex(index);
      
      // 関連するスクリーンショットがあれば表示
      if (record.screenshots && record.screenshots.length > 0) {
        setScreenshots(record.screenshots);
        setCurrentScreenshotIndex(0);
      }
    }
  };
  
  // ランク設定（コースごと）がボタンをクリックした時に呼ばれる
  const handleRankSelect = (rank: number | null) => {
    if (isOverallResultMode) {
      // 総合順位モードの場合は総合順位を更新
      console.log('総合順位を設定:', rank, typeof rank);
      setCurrentOverallRank(rank);
    } else {
      // 通常のコース順位の場合
      setCurrentRank(rank);
      setRankChanged(true); // 順位が変更されたことをマーク
    }
  };

  // 記録保存処理
  const saveCurrentRecord = async () => {
    await saveNewRecord(currentRank);
    setRankChanged(false); // 保存したので変更フラグをリセット
  };

  // グランプリ記録なら個別コースのランクを更新
  const updateGrandPrixCourseRank = async () => {
    if (mode === 'grandprix' && currentGrandPrixRecord) {
      // コースのランクを更新し、UIに反映
      await setGrandPrixCourseRank(selectedCourseId, currentRank);
      // 総合記録も更新（重要：これにより総合順位の問題を修正）
      await saveGrandPrixRecord();
      setRankChanged(false); // 保存したので変更フラグをリセット
    } else {
      await saveCurrentRecord();
    }
  };

  // ランク設定（コースごと）がボタンをクリックした時に呼ばれる
  const setRank = async (rank: number | null) => {
    // 新記録として保存
    await saveNewRecord(rank);
    
    // グランプリ記録も更新
    setCurrentRank(rank);
    await saveGrandPrixRecord();
    setRankChanged(false); // 保存したので変更フラグをリセット
  };
  
  // ラップタイム更新処理
  const updateLapTime = (index: number, timeText: string) => {
    // 1つのラップタイム更新
    const newLapTimes = [...lapTimes];
    
    // 時間の文字列を数値（ミリ秒）に変換
    const timeValue = timeStringToMs(timeText);
    newLapTimes[index] = timeValue;
    
    setLapTimes(newLapTimes);
    
    // 合計時間の更新
    const newTotalTime = newLapTimes.reduce((sum, time) => sum + time, 0);
    setTotalTime(newTotalTime);
    
    // 保存処理
    saveLapTimes(newLapTimes);
  };
  
  // ラップタイムの保存
  const saveLapTimes = async (newLapTimes: number[]) => {
    const key = generateKey();
    const newClearData = { ...clearData };
    
    if (!newClearData[key]) {
      newClearData[key] = { 
        rank: currentRank, 
        hasScreenshot: screenshots.length > 0,
        lapTimes: newLapTimes 
      };
    } else {
      newClearData[key].lapTimes = newLapTimes;
    }
    
    await saveClearData(newClearData);
    setClearData(newClearData);
  };

  // ミリ秒を「0:00.000」形式の文字列に変換する関数
  const msToTimeString = (ms: number): string => {
    if (ms === 0) return ''; // 0の場合は空文字列を返す
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };
  
  // 「0:00.000」形式の文字列をミリ秒に変換する関数
  const timeStringToMs = (timeString: string): number => {
    if (!timeString || timeString.trim() === '') return 0;
    
    // カンマをピリオドに置換して処理
    const cleanedTimeString = timeString.replace(',', '.');
    
    const regex = /^(\d+):(\d{2})\.(\d{1,3})$/;
    const match = cleanedTimeString.match(regex);
    
    if (!match) return 0;
    
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    const milliseconds = parseInt(match[3].padEnd(3, '0'), 10);
    
    return (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
  };

  // スクリーンショット追加
  const addScreenshot = async (method: 'take' | 'pick') => {
    try {
      if (mode !== 'grandprix' && (!selectedCourseId || !selectedCourseId)) {
        Alert.alert(
          i18n.t('detail.error'),
          i18n.t('detail.selectCourseFirst'),
          [{ text: i18n.t('common.ok') }]
        );
        return;
      }
      
      // スクリーンショットを撮影または選択
      const uri = method === 'take' 
        ? await takeScreenshot()
        : await pickScreenshot();
      
      if (uri) {
        // 新しいスクリーンショットを追加
        const newScreenshot: Screenshot = {
          uri,
          timestamp: Date.now(),
        };
        
        const updatedScreenshots = [...screenshots, newScreenshot];
        setScreenshots(updatedScreenshots);
        setCurrentScreenshotIndex(updatedScreenshots.length - 1);
        
        // クリアデータも更新
        const key = generateKey();
        const newClearData = { ...clearData };
        
        if (!newClearData[key]) {
          newClearData[key] = { 
            rank: currentRank, 
            hasScreenshot: true, 
            screenshotUri: uri,
            screenshots: updatedScreenshots,
            lapTimes: lapTimes
          };
        } else {
          newClearData[key].hasScreenshot = true;
          newClearData[key].screenshotUri = uri;
          newClearData[key].screenshots = updatedScreenshots;
        }
        
        await saveClearData(newClearData);
        setClearData(newClearData);
        
        // グランプリモードの場合はグランプリ記録にも保存
        if (mode === 'grandprix' && currentGrandPrixRecord) {
          // グランプリ記録にスクリーンショットを追加
          const updatedGrandPrixRecord = {
            ...currentGrandPrixRecord,
            screenshots: [...currentGrandPrixRecord.screenshots, newScreenshot]
          };
          
          setCurrentGrandPrixRecord(updatedGrandPrixRecord);
          await saveGrandPrixRecord(updatedGrandPrixRecord);
          
          // 成功メッセージを表示
          Alert.alert(
            i18n.t('detail.screenshotAdded') || 'スクリーンショット追加',
            i18n.t('detail.screenshotAddedToGrandPrix') || 'グランプリ記録にスクリーンショットが追加されました',
            [{ text: i18n.t('common.ok') || 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      Alert.alert(
        i18n.t('detail.error'),
        i18n.t('detail.screenshotError'),
        [{ text: i18n.t('common.ok') }]
      );
    }
  };

  // スクリーンショット削除を確認
  const confirmRemoveScreenshot = () => {
    Alert.alert(
      i18n.t('detail.screenshotRemoveTitle'),
      i18n.t('detail.screenshotRemoveConfirm'),
      [
        { text: i18n.t('common.cancel'), style: 'cancel' },
        { text: i18n.t('detail.delete'), style: 'destructive', onPress: () => removeScreenshot(currentScreenshotIndex) }
      ]
    );
  };
  
  // スクリーンショットを削除
  const removeScreenshot = async (index: number) => {
    try {
      if (screenshots.length === 0) return;
      
      const key = generateKey();
      const newClearData = { ...clearData };
      
      // スクリーンショットの配列から削除
      const updatedScreenshots = [...screenshots];
      updatedScreenshots.splice(index, 1);
      
      if (updatedScreenshots.length === 0) {
        // スクリーンショットがなくなった場合
        if (newClearData[key]) {
          newClearData[key].hasScreenshot = false;
          delete newClearData[key].screenshotUri;
          delete newClearData[key].screenshots;
        }
        setScreenshots([]);
        setCurrentScreenshotIndex(0);
      } else {
        // まだスクリーンショットが残っている場合
        if (newClearData[key]) {
          newClearData[key].screenshots = updatedScreenshots;
          newClearData[key].screenshotUri = updatedScreenshots[0].uri;
        }
        setScreenshots(updatedScreenshots);
        // 現在のインデックスが範囲外になる場合は調整
        setCurrentScreenshotIndex(Math.min(currentScreenshotIndex, updatedScreenshots.length - 1));
      }
      
      await saveClearData(newClearData);
      setClearData(newClearData);
      
      // グランプリモードの場合はグランプリ記録にも反映
      if (mode === 'grandprix' && currentGrandPrixRecord) {
        await saveGrandPrixRecord();
      }
    } catch (error) {
      console.error('Screenshot removal error:', error);
      Alert.alert(i18n.t('common.error'), i18n.t('detail.screenshotRemovalError'));
    }
  };
  
  // スクリーンショットビューワーを開く
  const openScreenshotViewer = (index: number) => {
    setCurrentScreenshotIndex(index);
    setScreenshotViewerVisible(true);
  };
  
  // 次のスクリーンショットを表示
  const showNextScreenshot = () => {
    if (screenshots.length > 1) {
      setCurrentScreenshotIndex((currentScreenshotIndex + 1) % screenshots.length);
    }
  };
  
  // 前のスクリーンショットを表示
  const showPreviousScreenshot = () => {
    if (screenshots.length > 1) {
      setCurrentScreenshotIndex((currentScreenshotIndex - 1 + screenshots.length) % screenshots.length);
    }
  };

  // コース選択
  const selectCourse = (courseId: number) => {
    // 総合結果が選択された場合の特別な処理
    if (courseId === -1) {
      setIsOverallResultMode(true);
      setCourseModalVisible(false);
      return;
    }
    
    // 通常のコース選択処理
    setIsOverallResultMode(false);
    setSelectedCourseId(courseId);
    setCourseModalVisible(false);
  };

  const handleBackPress = () => {
    router.push({
      pathname: '/results',
      params: { 
        gameId: game.id.toString(),
        machineName: encodeURIComponent(machine.name),
        league: encodeURIComponent(league),
        reverseMode: reverseMode ? 'true' : 'false'
      }
    });
  };

  // ラップタイム入力コンポーネント
  const LapTimeInput = ({ index }: { index: number }) => {
    const lapTime = lapTimes[index];
    const [inputValue, setInputValue] = useState(msToTimeString(lapTime));
    
    const handleChangeText = (text: string) => {
      // 数字とピリオド、コロン、カンマ以外は削除
      const sanitizedText = text.replace(/[^0-9.:,]/g, '');
      setInputValue(sanitizedText);
    };
    
    const handleEndEditing = () => {
      if (inputValue) {
        // 入力フォーマットの自動修正
        let formattedValue = inputValue;
        
        // 数字だけの場合は秒として解釈
        if (/^\d+$/.test(inputValue)) {
          const seconds = parseInt(inputValue, 10);
          formattedValue = `0:${seconds.toString().padStart(2, '0')}.000`;
        }
        // 小数点またはカンマを含む数字のみの場合は秒.ミリ秒として解釈
        else if (/^\d+[\.,]\d+$/.test(inputValue)) {
          const parts = inputValue.replace(',', '.').split('.');
          const seconds = parseInt(parts[0], 10);
          const milliseconds = parts[1].padEnd(3, '0').substring(0, 3);
          formattedValue = `0:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
        }
        // コロンを含む場合はそのまま分:秒として解釈
        else if (/^\d+:\d+$/.test(inputValue)) {
          const parts = inputValue.split(':');
          const minutes = parseInt(parts[0], 10);
          const seconds = parseInt(parts[1], 10);
          formattedValue = `${minutes}:${seconds.toString().padStart(2, '0')}.000`;
        }
        // コロンと小数点またはカンマを含む場合は分:秒.ミリ秒として解釈
        else if (/^\d+:\d+[\.,]\d+$/.test(inputValue)) {
          const colonParts = inputValue.split(':');
          const minutes = parseInt(colonParts[0], 10);
          const dotParts = colonParts[1].replace(',', '.').split('.');
          const seconds = parseInt(dotParts[0], 10);
          const milliseconds = dotParts[1].padEnd(3, '0').substring(0, 3);
          formattedValue = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
        }
        
        updateLapTime(index, formattedValue);
        setInputValue(formattedValue);
      } else {
        // 入力値が空の場合、0として保存
        updateLapTime(index, '');
      }
    };
    
    // タイムをリセットする関数
    const resetTime = () => {
      setInputValue('');
      updateLapTime(index, '');
    };
    
    // タイムを加算する関数
    const addTime = (ms: number) => {
      // 現在の値をミリ秒に変換
      const currentMs = timeStringToMs(inputValue);
      
      // 加算
      const newMs = currentMs + ms;
      
      // 文字列に戻す
      const newTimeString = msToTimeString(newMs);
      
      // 更新
      setInputValue(newTimeString);
      updateLapTime(index, newTimeString);
    };
    
    return (
      <View style={styles.lapTimeInputContainer}>
        <View style={styles.lapTimeRow}>
          <Text style={[styles.lapNumberText, { color: theme.text }]}>{i18n.t('detail.lap')} {index + 1}</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.lapTimeInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceSecondary }]}
              value={inputValue}
              onChangeText={handleChangeText}
              onEndEditing={handleEndEditing}
              placeholder="0:00.000 (任意)"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={10}
            />
            {inputValue ? (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetTime}
              >
                <X size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        
        {/* クイック入力ボタン */}
        <View style={styles.quickButtons}>
          <TouchableOpacity 
            style={[styles.quickButton, { backgroundColor: theme.error }]}
            onPress={resetTime}
          >
            <Text style={styles.quickButtonText}>{i18n.t('common.reset', { defaultValue: 'クリア' })}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: theme.primary }]}
            onPress={() => addTime(1000)}
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add1s', { defaultValue: '+1秒' })}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickButton, { backgroundColor: theme.primary }]}
            onPress={() => addTime(100)}
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add0_1s', { defaultValue: '+0.1秒' })}</Text>
          </TouchableOpacity>
        </View>
        {/* 追加のクイックボタン */}
        <View style={[styles.quickButtons, { marginTop: 4 }]}>
          <TouchableOpacity 
            style={[styles.quickButton, { backgroundColor: theme.accent, minWidth: 70 }]} // theme.secondary を theme.accent に変更
            onPress={() => addTime(60000)} // +1分
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add1m')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickButton, { backgroundColor: theme.accent, minWidth: 70 }]} // theme.secondary を theme.accent に変更
            onPress={() => addTime(10000)} // +10秒
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add10s')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickButton, { backgroundColor: theme.accent, minWidth: 70 }]} // theme.secondary を theme.accent に変更
            onPress={() => addTime(10)} // +0.01秒
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add0_01s')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickButton, { backgroundColor: theme.accent, minWidth: 70 }]} // theme.secondary を theme.accent に変更
            onPress={() => addTime(1)} // +0.001秒
          >
            <Text style={styles.quickButtonText}>{i18n.t('detail.add0_001s')}</Text>
          </TouchableOpacity>
        </View>
      </View> // lapTimeInputContainer の閉じタグ
    );
  };

  // 現在選択されているコース名を取得
  const getCurrentCourseName = () => {
    const course = availableCourses.find(c => c.id === selectedCourseId);
    return course ? course.name : i18n.t('detail.selectCourse');
  };

  // 記録の削除機能を追加
  const deleteRecord = async (index: number) => {
    if (index < 0 || index >= records.length) return;
    
    // 削除確認
    Alert.alert(
      i18n.t('detail.deleteRecordTitle') || '記録の削除',
      i18n.t('detail.deleteRecordConfirm') || 'この記録を削除してもよろしいですか？',
      [
        { 
          text: i18n.t('common.cancel') || 'キャンセル', 
          style: 'cancel' 
        },
        { 
          text: i18n.t('detail.delete') || '削除', 
          style: 'destructive', 
          onPress: async () => {
            // 記録を配列から削除
            const updatedRecords = [...records];
            updatedRecords.splice(index, 1);
            
            // ストレージの更新
            const key = generateKey();
            const newClearData = { ...clearData };
            
            if (updatedRecords.length === 0) {
              // 記録がなくなった場合
              if (newClearData[key]) {
                newClearData[key].records = [];
                delete newClearData[key].bestRecord;
                // ラップタイムとランクもリセット（下位互換性のため）
                newClearData[key].rank = null;
                newClearData[key].lapTimes = Array(totalLaps).fill(0);
              }
              
              setCurrentRank(null);
              setLapTimes(Array(totalLaps).fill(0));
              setTotalTime(0);
            } else {
              // まだ記録が残っている場合
              if (newClearData[key]) {
                newClearData[key].records = updatedRecords;
                // 最高記録の再計算
                newClearData[key].bestRecord = calculateBestRecord(updatedRecords);
                
                // 現在表示する記録のインデックスを調整
                let newIndex = currentRecordIndex;
                if (index === currentRecordIndex) {
                  // 削除した記録が表示中だった場合は最新の記録を表示
                  newIndex = updatedRecords.length - 1;
                } else if (index < currentRecordIndex) {
                  // 削除した記録が現在の記録より前にあった場合はインデックスを調整
                  newIndex--;
                }
                
                // 新しいインデックスで記録をロード
                const newRecord = updatedRecords[newIndex];
                newClearData[key].rank = newRecord.rank; // 下位互換性のため
                newClearData[key].lapTimes = [...newRecord.lapTimes]; // 下位互換性のため
                
                setCurrentRank(newRecord.rank);
                setLapTimes([...newRecord.lapTimes]);
                setTotalTime(newRecord.totalTime);
                setCurrentRecordIndex(newIndex);
              }
            }
            
            await saveClearData(newClearData);
            setClearData(newClearData);
            setRecords(updatedRecords);
            
            // 記録履歴モーダルを閉じる
            setShowRecordHistory(false);
          }
        }
      ]
    );
  };

  // グランプリ記録管理のための状態を追加
  const [grandPrixRecords, setGrandPrixRecords] = useState<GrandPrixRecord[]>([]);
  const [currentGrandPrixRecord, setCurrentGrandPrixRecord] = useState<GrandPrixRecord | null>(null);

  // リーグ内のすべてのコースを取得する関数
  const getLeagueAllCourses = (gameId: number, leagueName: string) => {
    return getLeagueCourses(gameId, leagueName);
  };

  // グランプリ記録のキーを生成
  const generateGrandPrixKey = () => {
    return `gp-${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
  };

  // グランプリ記録をロードする関数
  const loadGrandPrixRecord = async () => {
    const key = generateGrandPrixKey();
    const extendedClearData = clearData as ExtendedClearData;
    
    if (extendedClearData[key] && extendedClearData[key].grandPrixRecords) {
      setGrandPrixRecords(extendedClearData[key].grandPrixRecords);
      
      // 最新の記録を現在の記録として設定
      if (extendedClearData[key].grandPrixRecords.length > 0) {
        const latestRecord = extendedClearData[key].grandPrixRecords[extendedClearData[key].grandPrixRecords.length - 1];
        setCurrentGrandPrixRecord(latestRecord);
        
        // 選択中のコースのタイムを表示
        const courseTime = findCourseTime(latestRecord.courseTimes, selectedCourseId);
        if (courseTime) {
          // ラップタイムは仮に均等配分（実際のデータがない場合）
          const timePerLap = Math.floor(courseTime.time / totalLaps);
          const newLapTimes = Array(totalLaps).fill(timePerLap);
          setLapTimes(newLapTimes);
          setTotalTime(courseTime.time);
          setCurrentRank(courseTime.rank);
        }
      }
    } else {
      setGrandPrixRecords([]);
      setCurrentGrandPrixRecord(null);
    }
  };

  // コンポーネントマウント時にグランプリ記録もロード
  useEffect(() => {
    const loadAllData = async () => {
      const data = await loadClearData();
      setClearData(data);
      await loadGrandPrixRecord();
    };
    loadAllData();
  }, [gameId, machineName, league, reverseMode]);

  // グランプリ記録を保存する関数
  const saveGrandPrixRecord = async (recordToSave?: GrandPrixRecord) => {
    const record = recordToSave || currentGrandPrixRecord; // 引数があればそれを使用
    if (!record) return;

    const key = generateGrandPrixKey();
    const newClearData = { ...clearData } as ExtendedClearData;

    let existingRecords: GrandPrixRecord[] = [];
    if (newClearData[key] && newClearData[key].grandPrixRecords) {
      existingRecords = newClearData[key].grandPrixRecords.filter(r => r.id !== record.id);
    }
    
    const updatedRecords = [...existingRecords, record];
    // 日付 (racedAt) で降順ソート
    updatedRecords.sort((a, b) => b.racedAt - a.racedAt);

    if (!newClearData[key]) {
      newClearData[key] = {
        grandPrixRecords: updatedRecords,
        rank: null, 
        lapTimes: [] 
      };
    } else {
      newClearData[key].grandPrixRecords = updatedRecords;
    }

    await saveClearData(newClearData as unknown as ClearData);
    setClearData(newClearData as unknown as ClearData);
    setGrandPrixRecords(updatedRecords);
    // setCurrentGrandPrixRecord(record); // ここでセットすると編集中に問題が起きる可能性があるため、呼び出し元で管理
  };

  // グランプリの詳細を表示する関数を更新
  const showGrandPrixDetails = () => {
    if (!currentGrandPrixRecord) return;
    // モーダルを表示
    setGrandPrixModalVisible(true);
  };

  // グランプリモーダルのコース順位を設定する関数
  const setGrandPrixCourseRank = async (courseId: number, rank: number | null) => {
    if (!currentGrandPrixRecord) return;
    
    const courseIndex = currentGrandPrixRecord.courseTimes.findIndex(ct => ct.courseId === courseId);
    
    if (courseIndex >= 0) {
      // courseTimes配列を新しい配列としてコピー
      const newCourseTimes = [...currentGrandPrixRecord.courseTimes];
      // 更新対象のCourseTimeオブジェクトも新しいオブジェクトとしてコピーし、rankを更新
      newCourseTimes[courseIndex] = { 
        ...currentGrandPrixRecord.courseTimes[courseIndex], 
        rank: rank 
      };
      
      // currentGrandPrixRecord全体も新しいオブジェクトとしてコピーし、更新されたcourseTimesで置き換える
      const updatedRecord = { 
        ...currentGrandPrixRecord, 
        courseTimes: newCourseTimes 
      };
      
      // DetailScreenのUIで表示している現在のコースのランクも更新（これはグランプリ記録とは別だがUIの一貫性のため）
      if (courseId === selectedCourseId) {
        setCurrentRank(rank); 
      }
      
      setCurrentGrandPrixRecord(updatedRecord); // 更新されたレコードをReactのstateにセット
      await saveGrandPrixRecord(updatedRecord); // 更新されたレコードをストレージに保存
    }
  };

  // グランプリモーダルのコースをタップして選択する関数
  const selectCourseFromGrandPrix = (courseId: number) => {
    // モーダルを閉じて選択したコースを表示
    setGrandPrixModalVisible(false);
    setSelectedCourseId(courseId);
  };

  // グランプリ記録履歴用の状態を追加
  const [showGrandPrixHistory, setShowGrandPrixHistory] = useState<boolean>(false);
  const [currentGrandPrixIndex, setCurrentGrandPrixIndex] = useState<number>(-1);

  // グランプリ新記録を保存する関数
  const saveNewGrandPrixRecord = async (rank: number | null) => {
    // 既存のグランプリ記録をベースに新しい記録を作成
    const baseRecord = currentGrandPrixRecord || {
      id: generateGrandPrixKey(),
      gameId,
      machineName: machine.name,
      league,
      reverseMode,
      date: Date.now(),
      racedAt: Date.now(), // グランプリ挑戦日時
      totalTime: 0,
      rank: null,
      courseTimes: getLeagueAllCourses(gameId, league).map(course => ({
        courseId: course.id,
        time: 0,
        rank: null
      })),
      screenshots: []
    };
    
    // 新しいグランプリ記録を作成（ディープコピー）
    const newGrandPrixRecord: GrandPrixRecord = {
      ...baseRecord,
      rank: rank, // 新しい順位を設定
      date: Date.now() // 新しい日時を設定
    };
    
    // コースタイムはディープコピー
    newGrandPrixRecord.courseTimes = [...baseRecord.courseTimes.map(ct => ({...ct}))];
    
    // スクリーンショットがあれば追加
    if (screenshots.length > 0) {
      newGrandPrixRecord.screenshots = [...screenshots];
    }
    
    // 既存の記録リストに追加
    let updatedRecords = [...grandPrixRecords, newGrandPrixRecord];
    
    // 保存
    const key = generateGrandPrixKey();
    const newClearData = { ...clearData } as ExtendedClearData;
    
    if (!newClearData[key]) {
      newClearData[key] = { 
        grandPrixRecords: updatedRecords,
        // 従来の互換性のために必要な項目
        rank: null,
        lapTimes: []
      };
    } else {
      newClearData[key].grandPrixRecords = updatedRecords;
    }
    
    await saveClearData(newClearData as unknown as ClearData);
    setClearData(newClearData as unknown as ClearData);
    setGrandPrixRecords(updatedRecords);
    setCurrentGrandPrixRecord(newGrandPrixRecord);
    setCurrentGrandPrixIndex(updatedRecords.length - 1);
    setCurrentOverallRank(rank);
    
    // 記録の保存を確認するメッセージを表示
    Alert.alert(
      i18n.t('detail.recordSaved') || '記録を保存しました',
      i18n.t('detail.newGrandPrixRecordAdded') || 'グランプリの新記録を追加しました',
      [{ text: i18n.t('common.ok') || 'OK', style: 'default' }]
    );
  };

  // グランプリ記録を選択してロードする関数
  const loadGrandPrixRecordFromHistory = (index: number) => {
    if (index >= 0 && index < grandPrixRecords.length) {
      const record = grandPrixRecords[index];
      setCurrentGrandPrixRecord(record);
      setCurrentGrandPrixIndex(index);
      setCurrentOverallRank(record.rank);
      
      // 現在表示中のコースの情報も更新
      const courseTime = findCourseTime(record.courseTimes, selectedCourseId);
      if (courseTime) {
        setCurrentRank(courseTime.rank);
        setTotalTime(courseTime.time);
        
        // ラップタイムを均等配分（詳細なデータがない場合）
        const timePerLap = Math.floor(courseTime.time / totalLaps);
        setLapTimes(Array(totalLaps).fill(timePerLap));
      }
      
      // スクリーンショットの更新
      if (record.screenshots && record.screenshots.length > 0) {
        setScreenshots(record.screenshots);
        setCurrentScreenshotIndex(0);
      }
    }
  };

  // グランプリ記録を削除する関数
  const deleteGrandPrixRecord = async (index: number) => {
    if (index >= 0 && index < grandPrixRecords.length) {
      Alert.alert(
        i18n.t('detail.deleteGrandPrixRecordTitle') || 'グランプリ記録の削除',
        i18n.t('detail.deleteGrandPrixRecordConfirm') || 'このグランプリ記録を削除してもよろしいですか？',
        [
          {
            text: i18n.t('common.cancel') || 'キャンセル',
            style: 'cancel'
          },
          {
            text: i18n.t('common.delete') || '削除',
            style: 'destructive',
            onPress: async () => {
              const key = generateGrandPrixKey();
              const newClearData = { ...clearData } as ExtendedClearData;
              
              if (newClearData[key] && newClearData[key].grandPrixRecords) {
                const updatedRecords = [...newClearData[key].grandPrixRecords];
                updatedRecords.splice(index, 1);
                newClearData[key].grandPrixRecords = updatedRecords;
                
                await saveClearData(newClearData as unknown as ClearData);
                setClearData(newClearData as unknown as ClearData);
                setGrandPrixRecords(updatedRecords);
                
                // 現在表示している記録が削除された場合は最新の記録を表示
                if (currentGrandPrixIndex === index) {
                  if (updatedRecords.length > 0) {
                    loadGrandPrixRecordFromHistory(updatedRecords.length - 1);
                  } else {
                    setCurrentGrandPrixRecord(null);
                    setCurrentGrandPrixIndex(-1);
                  }
                }
              }
            }
          }
        ]
      );
    }
  };

  const handleCancelGrandPrixRecording = () => {
    Alert.alert(
      i18n.t('detail.cancelGrandPrixConfirmationTitle') || '記録のキャンセル',
      i18n.t('detail.cancelGrandPrixConfirmationMessage') || '現在のグランプリ記録を破棄して戻りますか？',
      [
        { text: i18n.t('common.no') || 'いいえ', style: 'cancel' },
        {
          text: i18n.t('common.yes') || 'はい',
          style: 'destructive',
          onPress: () => {
            setCurrentGrandPrixRecord(null); // 記録をリセット
            setGrandPrixRecordingMode(false); // 記録モードを終了
            setGrandPrixFlowStep(0); // フローをリセット
            // results画面に戻る
            router.push({
              pathname: '/results',
              params: {
                gameId: game.id.toString(),
                machineName: encodeURIComponent(machine.name),
                league: encodeURIComponent(league),
                reverseMode: reverseMode ? 'true' : 'false',
                mode: 'grandPrix' // results画面はグランプリモードで表示
              }
            });
          },
        },
      ]
    );
  };

  // グランプリレコーディング開始 (修正)
  const startGrandPrixRecording = () => {
    const leagueCourses = getLeagueAllCourses(gameId, league);
    if (leagueCourses.length === 0) {
      Alert.alert(
        i18n.t('detail.error') || 'エラー',
        i18n.t('detail.noCoursesFound') || 'コースが見つかりません',
        [{ text: i18n.t('common.ok') || 'OK' }]
      );
      return;
    }
    
    const newGrandPrixRecord: GrandPrixRecord = {
      id: generateGrandPrixKey() + '-' + Date.now(), // IDはユニークに
      gameId,
      machineName: machine.name,
      league,
      reverseMode,
      rank: null,
      date: Date.now(), // 作成日時は現在時刻
      racedAt: 0, // racedAtは後でユーザーが選択する <--- 変更: 初期値は0またはnull
      totalTime: 0,
      courseTimes: leagueCourses.map(course => ({
        courseId: course.id,
        time: 0,
        rank: null
      })),
      screenshots: []
    };
    
    setCurrentGrandPrixRecord(newGrandPrixRecord);
    setTempRacedAt(Date.now()); // モーダルのデフォルト日付を現在に設定
    setGrandPrixDateModalVisible(true); // <--- 変更: 日付選択モーダルを表示
    // setGrandPrixRecordingMode(true); // これは日付選択後に移動
    // saveGrandPrixRecord(); //これも日付選択後に移動
    // Alert も日付選択後に移動
  };

  // コンポーネントマウント時にモードに応じた処理を行う
  useEffect(() => {
    // 初期化時にデータを一度ロードする
    const initializeData = async () => {
      const data = await loadClearData();
      setClearData(data);
      
      // グランプリ記録開始モードの場合
      if (mode === 'grandprix' && action === 'new') {
        // UIの準備後に実行
        setTimeout(() => {
          startGrandPrixRecording();
        }, 500);
      }
      // 既存のグランプリ記録参照モードの場合
      else if (mode === 'grandprix' && grandprixId) {
        // グランプリIDに対応する記録を読み込む
        await loadGrandPrixRecord();
        if (grandPrixRecords.length > 0) {
          const record = grandPrixRecords.find(r => r.id === grandprixId);
          if (record) {
            setCurrentGrandPrixRecord(record);
            setCurrentGrandPrixIndex(grandPrixRecords.indexOf(record));
            setCurrentOverallRank(record.rank);
            
            // モーダルを表示
            setTimeout(() => {
              setGrandPrixModalVisible(true);
            }, 500);
          }
        }
      }
    };
    
    initializeData();
  }, []);

  // グランプリ挑戦日時を設定して次のステップへ (変更なし、モーダルから呼び出される)
  const setGrandPrixRaceDateAndContinue = (date: number) => {
    if (!currentGrandPrixRecord) return;
    
    const updatedRecord = { ...currentGrandPrixRecord, racedAt: date };
    setCurrentGrandPrixRecord(updatedRecord);
    
    setGrandPrixDateModalVisible(false); // モーダルを閉じる
    setGrandPrixRecordingMode(true); // ここで記録モードを開始
    setGrandPrixFlowStep(2); 
    
    const leagueCourses = getLeagueAllCourses(gameId, league);
    if (leagueCourses.length > 0) {
      const firstCourseInfo = getCourseInfo(gameId, leagueCourses[0].id);
      const firstCourseLaps = firstCourseInfo?.laps || getDefaultLaps(gameId);
      
      setSelectedCourseId(leagueCourses[0].id);
      setLapTimes(Array(firstCourseLaps).fill(0));
      setTotalTime(0);
      setCurrentRank(null);
      
      // グランプリ記録の保存（racedAtが設定された後）
      saveGrandPrixRecord(updatedRecord); // 更新された記録を渡して保存
    }
    
    Alert.alert(
      i18n.t('detail.grandPrixRecording') || 'グランプリ記録',
      i18n.t('detail.startCourseRecording') || '各コースの順位とタイムを記録してください',
      [{ text: i18n.t('common.ok') || 'OK' }]
    );
  };
  
  // タイムアタックを完了して次のコースへ移動
  const completeCurrentCourseAndContinue = async () => {
    if (!currentGrandPrixRecord) return;
    
    // 現在のコースの記録を保存
    await saveGrandPrixRecord();
    
    // 次のコースを探す
    const leagueCourses = getLeagueAllCourses(gameId, league);
    const currentCourseIndex = leagueCourses.findIndex(c => c.id === selectedCourseId);
    
    if (currentCourseIndex < leagueCourses.length - 1) {
      // 次のコースへ移動
      const nextCourse = leagueCourses[currentCourseIndex + 1];
      
      // 新しいコースのラップ数に合わせてリセット
      const nextCourseInfo = getCourseInfo(gameId, nextCourse.id);
      const nextTotalLaps = nextCourseInfo?.laps || getDefaultLaps(gameId);
      
      // ここで状態を確実に更新
      setLapTimes(Array(nextTotalLaps).fill(0));
      setTotalTime(0);
      setCurrentRank(null);
      
      // この行を最後に移動してコースID変更を最後に実行
      setSelectedCourseId(nextCourse.id);
      
      // コース移動メッセージ
      Alert.alert(
        i18n.t('detail.nextCourse') || '次のコース',
        `${nextCourse.name || `コース ${nextCourse.id}`}`,
        [{ text: i18n.t('common.ok') || 'OK' }]
      );
    } else {
      // すべてのコースが完了、総合順位入力へ
      setGrandPrixFlowStep(3);
      Alert.alert(
        i18n.t('detail.allCoursesCompleted') || 'すべてのコース完了',
        i18n.t('detail.enterOverallRank') || '総合順位を入力してください',
        [{ text: i18n.t('common.ok') || 'OK' }]
      );
    }
  };
  
  // グランプリ記録を完了して保存
  const completeGrandPrixRecording = async (
    overallRank: number | null,
    points: number | null = null,
    destroyedMachines: number | null = null
  ) => {
    if (!currentGrandPrixRecord) return;
    
    console.log('保存する総合順位:', overallRank, typeof overallRank); // デバッグ用
    
    // 文字列の場合は数値に変換を試みる
    let processedRank = overallRank;
    if (typeof overallRank === 'string') {
      const parsedRank = parseInt(overallRank as unknown as string, 10);
      processedRank = isNaN(parsedRank) ? null : parsedRank;
      console.log('文字列から変換された順位:', processedRank);
    }
    
    // 数値型に変換 (オブジェクトの場合など)
    if (overallRank !== null && typeof overallRank === 'object') {
      try {
        processedRank = Number(overallRank);
        if (isNaN(processedRank)) processedRank = null;
      } catch (e) {
        console.error('順位の数値変換エラー:', e);
        processedRank = null;
      }
    }
    
    // 総合時間を計算（各コースの時間の合計）
    const totalTime = currentGrandPrixRecord.courseTimes.reduce((sum, course) => sum + course.time, 0);
    
    // 更新するグランプリ記録に総合順位とポイント、マシン破壊数を設定
    const updatedGrandPrixRecord = {
      ...currentGrandPrixRecord,
      rank: processedRank, // 処理された順位を使用
      totalTime, // 計算した総合時間を設定
      date: Date.now(), // 更新日時
      // スクリーンショットを確実に含める
      screenshots: currentGrandPrixRecord.screenshots || [],
      // ポイントとマシン破壊数を追加
      points: points,
      destroyedMachines: destroyedMachines
    };
    
    // 既存の記録からこのレコードと同じIDを持つものを除外
    const filteredRecords = grandPrixRecords.filter(record => record.id !== updatedGrandPrixRecord.id);
    
    // 記録リストに追加
    const updatedRecords = [...filteredRecords, updatedGrandPrixRecord];
    
    // 保存
    const key = generateGrandPrixKey();
    const newClearData = { ...clearData } as ExtendedClearData;
    
    if (!newClearData[key]) {
      newClearData[key] = {
        grandPrixRecords: updatedRecords,
        // 従来の互換性のために必要な項目
        rank: null,
        lapTimes: []
      };
    } else {
      newClearData[key].grandPrixRecords = updatedRecords;
    }
    
    // 総合結果も保存する
    const overallKey = generateOverallKey();
    if (!newClearData[overallKey]) {
      newClearData[overallKey] = { 
        overallRank: overallRank,
        hasScreenshot: false,
      };
    } else {
      newClearData[overallKey].overallRank = overallRank;
    }
    
    await saveClearData(newClearData as unknown as ClearData);
    setClearData(newClearData as unknown as ClearData);
    setGrandPrixRecords(updatedRecords);
    setCurrentGrandPrixRecord(updatedGrandPrixRecord);
    
    // グランプリ記録モードを終了
    setGrandPrixRecordingMode(false);
    setGrandPrixFlowStep(0);
    
    // 完了メッセージ
    Alert.alert(
      i18n.t('detail.grandPrixCompleted') || 'グランプリ記録完了',
      i18n.t('detail.grandPrixRecordSaved') || 'グランプリの記録が保存されました',
      [{ 
        text: i18n.t('common.ok') || 'OK',
        onPress: () => {
          // 結果閲覧画面に戻る
          router.push({
            pathname: '/results',
            params: { 
              gameId: game.id.toString(),
              machineName: encodeURIComponent(machine.name),
              league: encodeURIComponent(league),
              reverseMode: reverseMode ? 'true' : 'false',
              mode: 'grandPrix' // モードをグランプリに明示的に指定
            }
          });
        }
      }]
    );
  };
  
  // 総合結果入力コンポーネント
  const OverallResultInput = () => {
    // 順位選択のハンドラー
    const handleRankSelect = (rank: number | null) => {
      // メインのhandleRankSelect関数を使用
      setCurrentOverallRank(rank);
      console.log('総合順位を設定:', rank, typeof rank);
    };
    
    return (
      <View style={styles.sectionBlock}>
        {/* 戻るボタンを追加 */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <TouchableOpacity
            style={{
              padding: 8,
              borderRadius: 4,
              backgroundColor: theme.surfaceSecondary,
            }}
            onPress={() => setIsOverallResultMode(false)}
          >
            <ArrowLeft size={20} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.sectionTitle, { color: theme.text, flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            {i18n.t('detail.overallResult') || '総合結果入力'}
          </Text>
          <View style={{ width: 36 }} /> {/* バランス用の空スペース */}
        </View>
        
        {/* 総合順位入力 */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            {i18n.t('detail.totalRank') || '総合順位'}
          </Text>
          <RankSelector 
            onSelectRank={handleRankSelect}
            currentRank={currentOverallRank}
          />
        </View>
        
        {/* ポイント数入力（任意） */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            {i18n.t('detail.points') || 'ポイント数'} ({i18n.t('common.optional') || '任意'})
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.lapTimeInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceSecondary }]}
              value={overallPoints !== null ? overallPoints.toString() : ''}
              onChangeText={(text) => setOverallPoints(text ? parseInt(text, 10) : null)}
              placeholder="0"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>
        
        {/* マシン破壊数入力（任意） */}
        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            {i18n.t('detail.destroyedMachines') || 'マシン破壊数'} ({i18n.t('common.optional') || '任意'})
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.lapTimeInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceSecondary }]}
              value={destroyedMachines !== null ? destroyedMachines.toString() : ''}
              onChangeText={(text) => setDestroyedMachines(text ? parseInt(text, 10) : null)}
              placeholder="0"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
        
        {/* 保存ボタン */}
        {grandPrixRecordingMode ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 16 }]} 
            onPress={() => completeGrandPrixRecording(currentOverallRank, overallPoints, destroyedMachines)}
          >
            <Text style={styles.actionButtonText}>
              {i18n.t('detail.finishAndSaveGrandPrix') || '記録を完了して保存'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 16 }]} 
            onPress={saveOverallData}
          >
            <Text style={styles.actionButtonText}>
              {i18n.t('detail.saveRank') || '順位を保存'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // 削除する不完全なコードブロック
  
  // 順位選択コンポーネント
  const RankSelector = ({ 
    onSelectRank, 
    currentRank
  }: { 
    onSelectRank: (rank: number | null) => void;
    currentRank: number | null;
  }) => {
    // 基本の1-6位+未設定ボタン
    const basicRanks = [1, 2, 3, 4, 5, 6, null];
    
    return (
      <View style={styles.rankButtonsContainer}>
        {basicRanks.map((rank) => (
              <TouchableOpacity
                key={`rank-${rank === null ? 'null' : rank}`}
                style={[
                  styles.rankButton,
              { backgroundColor: rank === currentRank ? theme.primary : theme.surfaceSecondary },
                ]}
            onPress={() => onSelectRank(rank)}
              >
                <Text style={[
                  styles.rankButtonText,
              { color: rank === currentRank ? 'white' : theme.text }
                ]}>
              {rank === null ? '-' : rank}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
    );
  };

  // 日付選択モーダルのJSX (カスタム日付選択機能追加)
  const GrandPrixDateModal = () => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const maxDate = new Date(); // 今日が最大日付

    const handleConfirm = (date: Date) => {
      setTempRacedAt(date.getTime());
      setDatePickerVisible(false);
    };

    const showDatePicker = () => {
      setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

    return (
      <Modal
        visible={grandPrixDateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGrandPrixDateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {i18n.t('detail.selectRaceDate') || 'グランプリ挑戦日の選択'}
            </Text>
            
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              {i18n.t('detail.selectedDateLabel') || '選択した日付:'} {new Date(tempRacedAt).toLocaleDateString()}
            </Text>
            
            {/* カスタム日付選択ボタン */}
            <View style={[{
              backgroundColor: theme.accent,
              borderRadius: 6,
              marginBottom: 16,
              width: '100%',
              padding: 12,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}
                onPress={showDatePicker}
              >
                <Calendar size={20} color="white" style={{marginRight: 8}} />
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  {i18n.t('detail.selectDate') || '日付を選択'}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={new Date(tempRacedAt)}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={maxDate}
            />
            
            {/* 今日ボタン */}
            <View style={[{
              backgroundColor: theme.primary,
              borderRadius: 6,
              marginBottom: 10,
              width: '100%',
              padding: 12,
              alignItems: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => setTempRacedAt(Date.now())}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  今日
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* 昨日ボタン */}
            <View style={[{
              backgroundColor: theme.primary,
              borderRadius: 6,
              marginBottom: 10,
              width: '100%',
              padding: 12,
              alignItems: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => {
                  const yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  setTempRacedAt(yesterday.getTime());
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  昨日
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* 一昨日ボタン */}
            <View style={[{
              backgroundColor: theme.primary,
              borderRadius: 6,
              marginBottom: 10,
              width: '100%',
              padding: 12,
              alignItems: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => {
                  const twoDaysAgo = new Date();
                  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
                  setTempRacedAt(twoDaysAgo.getTime());
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  一昨日
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* 決定ボタン */}
            <View style={[{
              backgroundColor: theme.primary,
              borderRadius: 6,
              marginTop: 20,
              width: '100%',
              padding: 12,
              alignItems: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => setGrandPrixRaceDateAndContinue(tempRacedAt)}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  決定
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* キャンセルボタン */}
            <View style={[{
              backgroundColor: theme.surfaceSecondary,
              borderRadius: 6,
              marginTop: 10,
              width: '100%',
              padding: 12,
              alignItems: 'center',
            }]}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => {
                  setGrandPrixDateModalVisible(false);
                  setCurrentGrandPrixRecord(null);
                  setGrandPrixRecordingMode(false);
                }}
              >
                <Text style={{
                  color: theme.text,
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  キャンセル
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // 総合結果データを保存する関数
  const saveOverallData = async () => {
    if (currentOverallRank === null && overallPoints === null && destroyedMachines === null) {
      // すべてのデータが未入力の場合は保存しない
      Alert.alert(
        i18n.t('detail.error') || 'エラー',
        i18n.t('detail.pleaseEnterRankOrTime') || '順位またはタイムを入力してください',
        [{ text: i18n.t('common.ok') || 'OK' }]
      );
      return;
    }

    const key = generateOverallKey();
    const newClearData = { ...clearData };
    
    if (!newClearData[key]) {
      newClearData[key] = { 
        overallRank: currentOverallRank,
        hasScreenshot: false,
      };
    } else {
      newClearData[key].overallRank = currentOverallRank;
    }
    
    // ポイント数とマシン破壊数を保存
    if (mode === 'grandprix') {
      // グランプリモードの場合は既存のグランプリ記録も更新
      if (currentGrandPrixRecord) {
        const updatedRecord = {
          ...currentGrandPrixRecord,
          rank: currentOverallRank,
          points: overallPoints,
          destroyedMachines: destroyedMachines,
          date: Date.now() // 更新日時
        };
        
        await saveGrandPrixRecord(updatedRecord);
      }
    }
    
    await saveClearData(newClearData);
    setClearData(newClearData);
    
    // 保存完了メッセージ
    Alert.alert(
      i18n.t('detail.recordSaved') || '記録保存完了',
      i18n.t('detail.newRecordAdded') || '新しい記録が追加されました',
      [{ text: i18n.t('common.ok') || 'OK' }]
    );
  };

  // メインレンダリング
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header 
        title={`${game.title} - ${machine.name}`}
        subtitle={`${league}${reverseMode ? ' (Reverse)' : ''}${mode === 'grandprix' ? ` - ${i18n.t('detail.grandPrixMode') || 'グランプリモード'}` : ''}`}
        onBackPress={handleBackPress}
      />
      
      {/* 戻るボタンを追加 */}
      <View style={{
        position: 'absolute',
        top: 60, // さらに上側に調整
        left: 15,
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
      
      {/* 日付選択モーダルをレンダリング */}
      <GrandPrixDateModal />
      
      {/* グランプリ詳細モーダル */}
      <Modal
        visible={grandPrixModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGrandPrixModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {i18n.t('detail.grandPrixDetails') || 'グランプリ詳細'}
            </Text>
            
            {currentGrandPrixRecord && (
              <ScrollView>
                {/* グランプリ基本情報 */}
                <View style={styles.gpDetailHeader}>
                  <View style={styles.gpDetailHeaderRow}>
                    <Text style={[styles.gpDetailLabel, { color: theme.textSecondary }]}>
                      {i18n.t('detail.date') || '日付'}:
                    </Text>
                    <Text style={[styles.gpDetailValue, { color: theme.text }]}>
                      {new Date(currentGrandPrixRecord.racedAt || currentGrandPrixRecord.date).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.gpDetailHeaderRow}>
                    <Text style={[styles.gpDetailLabel, { color: theme.textSecondary }]}>
                      {i18n.t('detail.totalRank') || '総合順位'}:
                    </Text>
                    <Text style={[styles.gpDetailValue, { color: theme.primary, fontWeight: 'bold' }]}>
                      {currentGrandPrixRecord.rank !== null ? `${currentGrandPrixRecord.rank}${i18n.t('detail.place') || '位'}` : '-'}
                    </Text>
                  </View>
                  
                  <View style={styles.gpDetailHeaderRow}>
                    <Text style={[styles.gpDetailLabel, { color: theme.textSecondary }]}>
                      {i18n.t('detail.totalTime') || '合計タイム'}:
                    </Text>
                    <Text style={[styles.gpDetailValue, { color: theme.text }]}>
                      {msToTimeString(currentGrandPrixRecord.totalTime)}
                    </Text>
                  </View>
                </View>
                
                {/* スクリーンショットがあれば表示 */}
                {currentGrandPrixRecord.screenshots && currentGrandPrixRecord.screenshots.length > 0 && (
                  <View style={styles.gpScreenshotSection}>
                    <Text style={[styles.gpSectionTitle, { color: theme.text }]}>
                      {i18n.t('detail.screenshots') || 'スクリーンショット'}
                    </Text>
                    <FlatList
                      horizontal
                      data={currentGrandPrixRecord.screenshots}
                      keyExtractor={(item, index) => `screenshot-${index}`}
                      renderItem={({ item }) => (
                        <TouchableOpacity 
                          style={styles.gpThumbnailContainer}
                          onPress={() => {
                            // スクリーンショットを表示する処理
                            setScreenshots([item]);
                            setCurrentScreenshotIndex(0);
                            setScreenshotViewerVisible(true);
                          }}
                        >
                          <Image 
                            source={{ uri: item.uri }}
                            style={styles.gpThumbnail}
                          />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
                
                {/* コース記録一覧 */}
                <View style={styles.gpCourseSection}>
                  <Text style={[styles.gpSectionTitle, { color: theme.text }]}>
                    {i18n.t('detail.courseResults') || 'コース記録'}
                  </Text>
                  
                  {currentGrandPrixRecord.courseTimes.sort((a, b) => a.courseId - b.courseId).map((courseTime, index) => {
                    const courseInfo = getCourseInfo(gameId, courseTime.courseId);
                    return (
                      <TouchableOpacity 
                        key={`course-${index}`}
                        style={[
                          styles.gpCourseItem, 
                          { borderBottomColor: theme.border },
                          selectedCourseId === courseTime.courseId && { backgroundColor: `${theme.primary}20` }
                        ]}
                        onPress={() => selectCourseFromGrandPrix(courseTime.courseId)}
                      >
                        <View style={styles.gpCourseItemRow}>
                          <Text style={[styles.gpCourseName, { color: theme.text }]}>
                            {courseInfo?.name || `Course ID: ${courseTime.courseId}`}
                          </Text>
                          <Text style={[styles.gpCourseRank, { color: theme.primary }]}>
                            {courseTime.rank !== null ? `${courseTime.rank}${i18n.t('detail.place') || '位'}` : '-'}
                          </Text>
                        </View>
                        <Text style={[styles.gpCourseTime, { color: theme.textSecondary }]}>
                          {msToTimeString(courseTime.time)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            )}
            
            <View style={styles.gpModalButtonsRow}>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.primary }]}
                onPress={() => setGrandPrixModalVisible(false)}
              >
                <Text style={[styles.closeButtonText, { color: 'white' }]}>
                  {i18n.t('common.close') || '閉じる'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      <ScrollView 
        style={[{ flex: 1, backgroundColor: theme.background }]}
        contentContainerStyle={[styles.content, { paddingTop: 0, paddingBottom: 10 }]} // 下部にパディングを追加
      >
        {/* メインコンテンツ */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          {/* コース選択ヘッダー */}
          <TouchableOpacity
            style={styles.courseSelector}
            onPress={() => setCourseModalVisible(true)}
          >
            <Text style={[styles.courseSelectorText, { color: theme.text }]}>
              {isOverallResultMode ? (i18n.t('detail.overallResult') || '総合結果') : getCurrentCourseName()}
            </Text>
            <ChevronDown size={20} color={theme.text} />
          </TouchableOpacity>
          
          {/* 総合結果モードの場合はOverallResultInputを表示、それ以外は通常のコース詳細 */}
          {isOverallResultMode ? (
            <View>
              {/* 総合順位入力 */}
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary, marginTop: 16 }]}>
                  {i18n.t('detail.totalRank') || '総合順位'}
                </Text>
                <RankSelector 
                  onSelectRank={handleRankSelect}
                  currentRank={currentOverallRank}
                />
              </View>
              
              {/* ポイント数入力（任意） */}
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                  {i18n.t('detail.points') || 'ポイント数'} ({i18n.t('common.optional') || '任意'})
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.lapTimeInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceSecondary }]}
                    value={overallPoints !== null ? overallPoints.toString() : ''}
                    onChangeText={(text) => setOverallPoints(text ? parseInt(text, 10) : null)}
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
              </View>
              
              {/* マシン破壊数入力（任意） */}
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                  {i18n.t('detail.destroyedMachines') || 'マシン破壊数'} ({i18n.t('common.optional') || '任意'})
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.lapTimeInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surfaceSecondary }]}
                    value={destroyedMachines !== null ? destroyedMachines.toString() : ''}
                    onChangeText={(text) => setDestroyedMachines(text ? parseInt(text, 10) : null)}
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
              </View>
              
              {/* 保存ボタン */}
              {grandPrixRecordingMode ? (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 16 }]} 
                  onPress={() => completeGrandPrixRecording(currentOverallRank, overallPoints, destroyedMachines)}
                >
                  <Text style={styles.actionButtonText}>
                    {i18n.t('detail.finishAndSaveGrandPrix') || '記録を完了して保存'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 16 }]} 
                  onPress={saveOverallData}
                >
                  <Text style={styles.actionButtonText}>
                    {i18n.t('detail.saveRank') || '順位を保存'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            // 通常の入力画面（既存のコンテンツ）
            <View>
              {/* グランプリ記録モード時のステータス表示 */}
              {grandPrixRecordingMode && (
                <View style={[styles.statusPanel, { backgroundColor: `${theme.primary}20` }]}>
                  <Text style={[styles.statusText, { color: theme.text }]}>
                    {i18n.t('detail.recordingGrandPrix') || 'グランプリ記録中'}
                      </Text>
                  </View>
                )}
              
              {/* 順位選択 */}
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                  {mode === 'grandprix' 
                    ? i18n.t('detail.selectGrandPrixRank') || 'グランプリ順位の選択'
                    : i18n.t('detail.courseResult') || 'コース順位'}
                </Text>
                <RankSelector onSelectRank={handleRankSelect} currentRank={currentRank} />
                
                {/* 順位保存ボタン（変更があった場合のみ表示） */}
                {rankChanged && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 12 }]}
                    onPress={updateGrandPrixCourseRank}
                  >
                    <Text style={styles.actionButtonText}>
                      {i18n.t('detail.saveRank') || '順位を保存'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              
              {/* ラップタイム入力セクション */}
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderWithHelp}>
                  <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                    {i18n.t('detail.lapTimes')} （任意）
                  </Text>
                  <Text style={[styles.helpText, { color: theme.textSecondary }]}>
                    {i18n.t('detail.lapTimesOptional') || 'タイム入力は省略可能です'}
                  </Text>
                </View>
                
                  {Array.from({ length: totalLaps }).map((_, index) => (
                    <LapTimeInput key={`lap-${index}`} index={index} />
                  ))}
                  
                  {/* 合計時間 */}
                  <View style={styles.totalTimeRow}>
                  <Text style={[styles.totalTimeLabel, { color: theme.text }]}>
                    {i18n.t('detail.totalTime')}
                  </Text>
                  <Text style={[styles.totalTimeValue, { color: theme.primary }]}>
                    {totalTime > 0 ? msToTimeString(totalTime) : '未入力'}
                  </Text>
                </View>
              </View>
              
              {/* スクリーンショット追加セクション */}
              <View style={styles.sectionBlock}>
                <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                  {i18n.t('detail.screenshot')} （任意）
                </Text>
                
                {screenshots.length > 0 ? (
                  <View style={styles.screenshotContainer}>
                    <TouchableOpacity
                      onPress={() => openScreenshotViewer(currentScreenshotIndex)}
                    >
                      <Image
                        source={{ uri: screenshots[currentScreenshotIndex]?.uri }}
                        style={styles.screenshotImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    
                        {screenshots.length > 1 && (
                      <View style={styles.screenshotNavigator}>
                        <TouchableOpacity onPress={showPreviousScreenshot}>
                          <ChevronLeft size={20} color={theme.text} />
                            </TouchableOpacity>
                        <Text style={{ color: theme.text }}>
                              {currentScreenshotIndex + 1}/{screenshots.length}
                            </Text>
                        <TouchableOpacity onPress={showNextScreenshot}>
                          <ChevronRight size={20} color={theme.text} />
                            </TouchableOpacity>
                      </View>
                    )}
                      
                    <View style={styles.screenshotActions}>
                      <TouchableOpacity
                        style={[styles.screenshotButton, { backgroundColor: theme.error }]} 
                        onPress={confirmRemoveScreenshot}
                      >
                        <Trash size={16} color="white" />
                        <Text style={styles.screenshotButtonText}>{i18n.t('detail.delete')}</Text>
                      </TouchableOpacity>
                          <TouchableOpacity
                        style={[styles.screenshotButton, { backgroundColor: theme.primary }]} 
                        onPress={() => addScreenshot('take')}
                      >
                        <Camera size={16} color="white" />
                        <Text style={styles.screenshotButtonText}>{i18n.t('detail.takeNew')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.screenshotActions}>
                    <TouchableOpacity
                      style={[styles.screenshotButton, { backgroundColor: theme.primary }]}
                      onPress={() => addScreenshot('take')}
                    >
                      <Camera size={16} color="white" />
                      <Text style={styles.screenshotButtonText}>{i18n.t('detail.takeScreenshot')}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[styles.screenshotButton, { backgroundColor: theme.primary }]}
                      onPress={() => addScreenshot('pick')}
                    >
                      <ImageIcon size={16} color="white" />
                      <Text style={styles.screenshotButtonText}>{i18n.t('detail.pickScreenshot')}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              {/* グランプリ記録モードのナビゲーションボタン */}
              {grandPrixRecordingMode && grandPrixFlowStep === 2 && ( // フローがタイムアタック中の場合のみ表示
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.error, flex: 0.8 }]}
                    onPress={handleCancelGrandPrixRecording}
                  >
                    <Text style={styles.actionButtonText}>
                      {i18n.t('detail.cancelGrandPrix') || 'キャンセル'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.surfaceSecondary, flex: 0.8 }]}
                    onPress={handleBackPress}
                  >
                    <Text style={[styles.actionButtonText, { color: theme.text }]}>
                      {i18n.t('detail.backToResults') || '結果に戻る'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.primary }]}
                    onPress={completeCurrentCourseAndContinue}
                  >
                    <Text style={styles.actionButtonText}>
                      {i18n.t('detail.nextCourse') || '次のコースへ'}
                    </Text>
                  </TouchableOpacity>
                  {/* 「グランプリ完了」ボタンはここから削除し、総合順位入力セクションに移動 */}
                </View>
              )}

              {/* グランプリ総合順位入力セクション */} 
              {grandPrixRecordingMode && grandPrixFlowStep === 3 && (
                <View style={[styles.sectionBlock, { marginTop: 16 }]}>
                  <Text style={[styles.sectionTitle, { color: theme.text, textAlign: 'center' }]}>
                    {i18n.t('detail.enterGrandPrixOverallRank') || 'グランプリ総合順位'}
                  </Text>
                  <RankSelector 
                    onSelectRank={handleRankSelect} // 総合順位用のstateを更新
                    currentRank={currentOverallRank} 
                  />
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.primary, marginTop: 16 }]} 
                    onPress={() => completeGrandPrixRecording(currentOverallRank)} // 選択された総合順位で完了
                  >
                    <Text style={styles.actionButtonText}>
                      {i18n.t('detail.finishAndSaveGrandPrix') || '記録を完了して保存'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              
              {/* グランプリ記録開始ボタンは削除 */}
            </View>
          )}
        </View>
        
        {/* コース選択モーダル */}
        <Modal
          visible={courseModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCourseModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {i18n.t('detail.selectCourse') || 'コースを選択'}
              </Text>
              
                <FlatList
                data={[
                  { id: -1, name: i18n.t('detail.overallResult') || '総合結果' }, // 総合結果オプションを追加
                  ...availableCourses
                ]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                      styles.courseItem,
                        { borderBottomColor: theme.border },
                      (selectedCourseId === item.id || (isOverallResultMode && item.id === -1)) && { backgroundColor: `${theme.primary}20` }
                    ]}
                    onPress={() => selectCourse(item.id)}
                  >
                    <Text style={[styles.courseItemText, { color: theme.text }]}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.primary }]}
                onPress={() => setCourseModalVisible(false)}
              >
                <Text style={[styles.closeButtonText, { color: 'white' }]}>{i18n.t('common.close') || '閉じる'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* スクリーンショットビューワーモーダル */}
        <Modal
          visible={screenshotViewerVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setScreenshotViewerVisible(false)}
        >
          <View style={styles.fullscreenViewerContainer}>
            <TouchableOpacity
              style={styles.fullscreenCloseButton}
              onPress={() => setScreenshotViewerVisible(false)}
            >
              <X size={24} color="white" />
            </TouchableOpacity>
            
            <Image
              source={{ uri: screenshots[currentScreenshotIndex]?.uri }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
        
      </ScrollView>
      
      {/* 広告を固定位置に配置 */}
      <AdBanner />
    </View>
  );
}