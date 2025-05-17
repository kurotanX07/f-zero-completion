// スクリーンショット情報
export interface Screenshot {
  uri: string;
  timestamp: number;
}

// コース時間情報
export interface CourseTime {
  courseId: number;
  time: number;
  rank: number | null;
}

// レース記録
export interface RaceRecord {
  rank: number | null;
  date: number;
  totalTime: number;
  lapTimes: number[];
  screenshots?: Screenshot[];
}

// クリアデータ保存用アイテム
export interface ClearDataItem {
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

// グランプリ（リーグ全体）の記録用インターフェース
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

// クリアデータの型
export interface ClearData {
  [key: string]: ClearDataItem;
}

// ゲームとリーグの型
export interface Game {
  id: number;
  title: string;
  leagues: string[];
  machines: Machine[];
}

// マシンの型
export interface Machine {
  name: string;
  pilot: string;
  specs: {
    body: string;
    boost: string;
    grip: string;
    [key: string]: any;
  };
  description?: string;
} 