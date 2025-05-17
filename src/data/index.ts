import { gameData } from './gameData';
import { gameDataEn } from './gameDataEn';
import { LanguageCode } from '../i18n/translations';
import { Game } from '../types';

/**
 * 言語設定に基づいてゲームデータを取得する
 * @param language 言語コード
 * @returns 言語に対応したゲームデータ
 */
export const getGameDataByLanguage = (language: LanguageCode): Game[] => {
  switch (language) {
    case 'en':
      return gameDataEn;
    case 'ja':
    default:
      return gameData;
  }
};

export * from './gameData';
export * from './gameDataEn';
export * from './courseData'; 