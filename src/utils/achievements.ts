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
 * @param includeReverse リバースモードをカウントに含めるかどうか (デフォルト: false)
 * @returns ゲームの達成度情報
 */
export function calculateGameAchievement(
  game: Game, 
  clearData: ClearData, 
  includeReverse: boolean = false
): GameAchievement {
  // 総コース数の計算（マシン数 x リーグ数）
  // リバースモードを含める場合のみ * 2
  const totalCourseCount = game.machines.length * game.leagues.length * (includeReverse ? 2 : 1);
  
  // 各ランクごとのカウント
  let rank1Count = 0;
  let rank2Count = 0;
  let rank3Count = 0;
  let totalClearCount = 0;
  
  // 総合順位を元に計算
  game.machines.forEach(machine => {
    game.leagues.forEach(league => {
      // 通常モード
      const overallKey = `${game.id}-${machine.name}-${league}-overall`;
      if (clearData[overallKey]) {
        const rank = clearData[overallKey].overallRank;
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
        }
      }
      
      // リバースモードは、includeReverse が true の場合のみカウント
      if (includeReverse) {
        const reverseOverallKey = `${game.id}-${machine.name}-${league}-reverse-overall`;
        if (clearData[reverseOverallKey]) {
          const rank = clearData[reverseOverallKey].overallRank;
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
          }
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