// src/types/index.ts の改善版

/**
 * マシンのスペック評価
 * S: 最高、A: 優れている、B: 標準、C: 劣る、D: 最低
 */
export type SpecRating = 'S' | 'A' | 'B' | 'C' | 'D';

/**
 * マシンの詳細情報
 */
export interface Machine {
  /** マシンの名前 */
  name: string;
  
  /** パイロットの名前 */
  pilot: string;
  
  /** マシンのスペック */
  specs: {
    /** 加速力 */
    boost: SpecRating;
    
    /** 耐久性 */
    body: SpecRating;
    
    /** グリップ力 */
    grip: SpecRating;
  };
  
  /** マシンの説明文 */
  description: string;
  
  /** マシンの画像URI（オプション） */
  imageUri?: string;
}

/**
 * ゲームの情報
 */
export interface Game {
  /** ゲームID */
  id: number;
  
  /** ゲームタイトル */
  title: string;
  
  /** ゲーム内のリーグ */
  leagues: string[];
  
  /** 使用可能なマシンリスト */
  machines: Machine[];
  
  /** ゲームの説明（オプション） */
  description?: string;
  
  /** 発売年（オプション） */
  releaseYear?: number;
}

/**
 * レースの結果ランク
 * 1, 2, 3: 順位
 * 4: 入賞（4〜6位）
 * null: クリア前
 */
export type RaceRank = 1 | 2 | 3 | 4 | null;

/**
 * クリア情報の詳細
 */
export interface ClearInfo {
  /** クリアランク */
  rank: RaceRank;
  
  /** スクリーンショットの有無 */
  hasScreenshot: boolean;
  
  /** スクリーンショットのURI（任意） */
  screenshotUri?: string;
  
  /** クリア日時（任意） */
  clearedAt?: string;
  
  /** メモ（任意） */
  notes?: string;
}

/**
 * クリアデータ全体
 * キーは `${gameId}-${machineName}-${league}${reverseMode ? '-reverse' : ''}`
 */
export interface ClearData {
  [key: string]: ClearInfo;
}

/**
 * アプリの設定
 */
export interface AppSettings {
  /** ダークモード設定 */
  darkMode: boolean;
  
  /** 通知設定 */
  notifications: boolean;
  
  /** 起動回数 */
  launchCount: number;
  
  /** 最終起動日時 */
  lastLaunch: string;
}