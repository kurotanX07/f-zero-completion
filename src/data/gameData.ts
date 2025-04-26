// src/data/gameData.ts の内容
import { Game } from '../types';

export const gameData: Game[] = [
  {
    id: 1,
    title: 'F-ZERO',
    leagues: ['ナイト', 'クイーン', 'キング'],
    machines: [
      {
        name: 'BLUE FALCON',
        pilot: 'キャプテン・ファルコン',
        specs: {
          boost: 'B',
          body: 'B',
          grip: 'B'
        },
        description: 'バウンティハンターのキャプテン・ファルコンが操縦するマシン。バランスの取れた性能を持つ。'
      },
      // 他のマシンデータも同様に設定
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr.スチュワート',
        specs: {
          boost: 'A',
          body: 'C',
          grip: 'A'
        },
        description: '天才医師Dr.スチュワートのマシン。加速とグリップに優れるが耐久性が低い。'
      },
      // 省略 - クライアントから実際のデータを入手
    ]
  },
  // 省略 - クライアントから実際のデータを入手
];