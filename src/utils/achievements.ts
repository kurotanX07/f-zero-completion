import { ClearData, Game } from '../types';

/**
 * ゲームの達成度情報
 */
export interface GameAchievement {
  /**
   * 1位クリア率
   */
  rank1Percentage: number;
  
  /**
   * 2位以上クリア率
   */
  rank2Percentage: number;
  
  /**
   * 3位以上クリア率
   */
  rank3Percentage: number;
  
  /**
   * 入賞以上クリア率
   */
  rankAllPercentage: number;
  
  /**
   * 1位のクリア数
   */
  rank1Count: number;
  
  /**
   * 2位以上のクリア数
   */
  rank2Count: number;
  
  /**
   * 3位以上のクリア数
   */
  rank3Count: number;
  
  /**
   * 合計クリア数
   */
  totalClearCount: number;
  
  /**
   * コース総数
   */
  totalCourseCount: number;
}

/**
 * ゲームごとの達成度を計算
 * @param game ゲーム情報
 * @param clearData クリアデータ
 * @returns ゲームの達成度情報
 */
export function calculateGameAchievement(game: Game, clearData: ClearData): GameAchievement {
  // 総コース数の計算（マシン数 x リーグ数 x モード（通常+リバース））
  const totalCourseCount = game.machines.length * game.leagues.length * 2; // 通常 + リバース
  
  // 各ランクごとのカウント
  let rank1Count = 0;
  let rank2Count = 0;
  let rank3Count = 0;
  let totalClearCount = 0;
  
  // 全コース（通常+リバース）でループ
  game.machines.forEach(machine => {
    game.leagues.forEach(league => {
      // 通常モード
      const normalKey = `${game.id}-${machine.name}-${league}`;
      if (clearData[normalKey]) {
        const rank = clearData[normalKey].rank;
        if (rank === 1) {
          rank1Count++;
          rank2Count++;
          rank3Count++;
          totalClearCount++;
        } else if (rank === 2) {
          rank2Count++;
          rank3Count++;
          totalClearCount++;
        } else if (rank === 3) {
          rank3Count++;
          totalClearCount++;
        } else if (rank === 4) {
          totalClearCount++;
        }
      }
      
      // リバースモード
      const reverseKey = `${game.id}-${machine.name}-${league}-reverse`;
      if (clearData[reverseKey]) {
        const rank = clearData[reverseKey].rank;
        if (rank === 1) {
          rank1Count++;
          rank2Count++;
          rank3Count++;
          totalClearCount++;
        } else if (rank === 2) {
          rank2Count++;
          rank3Count++;
          totalClearCount++;
        } else if (rank === 3) {
          rank3Count++;
          totalClearCount++;
        } else if (rank === 4) {
          totalClearCount++;
        }
      }
    });
  });
  
  // パーセンテージの計算（コース総数が0の場合を考慮）
  const rank1Percentage = totalCourseCount > 0 ? (rank1Count / totalCourseCount) * 100 : 0;
  const rank2Percentage = totalCourseCount > 0 ? (rank2Count / totalCourseCount) * 100 : 0;
  const rank3Percentage = totalCourseCount > 0 ? (rank3Count / totalCourseCount) * 100 : 0;
  const rankAllPercentage = totalCourseCount > 0 ? (totalClearCount / totalCourseCount) * 100 : 0;
  
  return {
    rank1Percentage,
    rank2Percentage,
    rank3Percentage,
    rankAllPercentage,
    rank1Count,
    rank2Count,
    rank3Count,
    totalClearCount,
    totalCourseCount
  };
}