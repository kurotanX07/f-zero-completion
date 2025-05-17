// src/types/index.ts - Type definitions only

// Types for Machine specifications
export type MachineSpecs = {
  body: string;
  boost: string;
  grip: string;
  // 詳細スペック追加
  topSpeed?: string;
  boostSpeed?: string;
  boostDuration?: string;
  bodyStrength?: string;
  cornering?: string;
  balance?: string;
  acceleration?: string;
};

// Machine representation
export interface Machine {
  name: string;
  pilot: string;
  specs: MachineSpecs;
  description?: string;
}

// Game representation
export interface Game {
  id: number;
  title: string;
  leagues: string[];
  machines: Machine[];
}

// スクリーンショット情報
export interface Screenshot {
  uri: string;
  timestamp: number; // 撮影日時
  description?: string; // オプションの説明
}

// 単一の記録（複数回の挑戦をサポート）
export interface RaceRecord {
  rank: number | null;       // レース結果の順位
  date: number;              // 記録日時（タイムスタンプ）
  totalTime: number;         // 合計タイム（ミリ秒）
  lapTimes: number[];        // 各周回のラップタイム
  screenshots?: Screenshot[]; // 記録に関連するスクリーンショット
  notes?: string;            // メモやコメント
}

// コースごとの時間と順位
export interface CourseTime {
  courseId: number;
  time: number;
  rank: number | null;
}

// グランプリ記録
export interface GrandPrixRecord {
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

// Clear data for a specific race
export interface ClearDataItem {
  rank: number | null;        // コースごとの順位（下位互換性のため残す）
  overallRank?: number | null; // リーグ/シリーズ全体の総合順位
  hasScreenshot: boolean;
  screenshotUri?: string;     // 下位互換性のため残す
  screenshots?: Screenshot[];  // 複数のスクリーンショット（下位互換性のため残す）
  lapTimes?: number[];        // ラップタイム（下位互換性のため残す）
  
  // 新機能：複数回の挑戦記録
  records?: RaceRecord[];      // 複数回のレース記録
  bestRecord?: RaceRecord;     // 最高記録（自動計算される）
}

// Collection of all clear data
export interface ClearData {
  [key: string]: ClearDataItem;
}