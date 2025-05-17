// src/data/courseData.ts - コースとラップ数のデータ

export interface Course {
  id: number;
  name: string;
  laps: number;
  league: string; // コースが属するリーグ/カップ/シリーズ
}

export interface GameCourses {
  gameId: number;
  defaultLaps: number; // デフォルトのラップ数
  courses: Course[];
}

export const courseData: GameCourses[] = [
  // F-ZERO（オリジナル）- SNES
  {
    gameId: 1,
    defaultLaps: 5,
    courses: [
      // Knight League
      { id: 1, name: 'Mute City I', laps: 5, league: 'Knight' },
      { id: 2, name: 'Big Blue', laps: 5, league: 'Knight' },
      { id: 3, name: 'Sand Ocean', laps: 5, league: 'Knight' },
      { id: 4, name: 'Death Wind I', laps: 5, league: 'Knight' },
      { id: 5, name: 'Silence', laps: 5, league: 'Knight' },
      // Queen League
      { id: 6, name: 'Mute City II', laps: 5, league: 'Queen' },
      { id: 7, name: 'Port Town I', laps: 5, league: 'Queen' },
      { id: 8, name: 'Red Canyon I', laps: 5, league: 'Queen' },
      { id: 9, name: 'White Land I', laps: 5, league: 'Queen' },
      { id: 10, name: 'White Land II', laps: 5, league: 'Queen' },
      // King League
      { id: 11, name: 'Mute City III', laps: 5, league: 'King' },
      { id: 12, name: 'Death Wind II', laps: 5, league: 'King' },
      { id: 13, name: 'Port Town II', laps: 5, league: 'King' },
      { id: 14, name: 'Red Canyon II', laps: 5, league: 'King' },
      { id: 15, name: 'Fire Field', laps: 5, league: 'King' },
    ]
  },
  // F-ZERO X - N64
  {
    gameId: 2,
    defaultLaps: 3,
    courses: [
      // ジャックカップ
      { id: 1, name: 'Mute City: Figure Eight（ミュートシティ：フィギュアエイト）', laps: 3, league: 'Jack' },
      { id: 2, name: 'Silence: High Speed（サイレンス：ハイスピード）', laps: 3, league: 'Jack' },
      { id: 3, name: 'Sand Ocean: Pipe（サンドオーシャン：パイプ）', laps: 3, league: 'Jack' },
      { id: 4, name: 'Devil\'s Forest: Corkscrew（デビルズフォレスト：スクリュー）', laps: 3, league: 'Jack' },
      { id: 5, name: 'Big Blue: Cylinder（ビッグブルー：シリンダー）', laps: 3, league: 'Jack' },
      { id: 6, name: 'Port Town: High Jump（ポートタウン：ハイジャンプ）', laps: 3, league: 'Jack' },
      // クイーンカップ
      { id: 7, name: 'Sector α: Inverted Loop（セクターα：インヴァーテッドループ）', laps: 3, league: 'Queen' },
      { id: 8, name: 'Red Canyon: Multi Jump（レッドキャニオン：マルチジャンプ）', laps: 3, league: 'Queen' },
      { id: 9, name: 'Devil\'s Forest 2: Up and Down（デビルズフォレスト2：アップダウン）', laps: 3, league: 'Queen' },
      { id: 10, name: 'Mute City 2: Technique（ミュートシティ2：テクニカル）', laps: 3, league: 'Queen' },
      { id: 11, name: 'Big Blue 2: Quick Turn（ビッグブルー2：クイックターン）', laps: 3, league: 'Queen' },
      { id: 12, name: 'White Land: Dangerous Steps（ホワイトランド：デンジャラスステップ）', laps: 3, league: 'Queen' },
      // キングカップ
      { id: 13, name: 'Fire Field: Zig-Zag Jump（ファイアーフィールド：ジグザグジャンプ）', laps: 3, league: 'King' },
      { id: 14, name: 'Silence 2: Wavy Road（サイレンス2：ウェービーロード）', laps: 3, league: 'King' },
      { id: 15, name: 'Sector β: Double Somersault（セクターβ：ダブルサマーソルト）', laps: 3, league: 'King' },
      { id: 16, name: 'Red Canyon 2: Slim Line（レッドキャニオン2：スリムライン）', laps: 3, league: 'King' },
      { id: 17, name: 'White Land 2: Half Pipe（ホワイトランド2：ハーフパイプ）', laps: 3, league: 'King' },
      { id: 18, name: 'Mute City 3: Jumps of Doom（ミュートシティ3：ジャンプスオブドゥーム）', laps: 3, league: 'King' },
      // ジョーカーカップ
      { id: 19, name: 'Rainbow Road: Psychedelic Experience（レインボーロード：サイケデリックエクスペリエンス）', laps: 3, league: 'Joker' },
      { id: 20, name: 'Devil\'s Forest 3: Mirror Road（デビルズフォレスト3：ミラーロード）', laps: 3, league: 'Joker' },
      { id: 21, name: 'Space Plant: Cylinder & High Jump（スペースプラント：シリンダー＆ハイジャンプ）', laps: 3, league: 'Joker' },
      { id: 22, name: 'Sand Ocean 2: Wave Panic（サンドオーシャン2：ウェーブパニック）', laps: 3, league: 'Joker' },
      { id: 23, name: 'Port Town 2: Snake Road（ポートタウン2：スネークロード）', laps: 3, league: 'Joker' },
      { id: 24, name: 'Big Hand: Deadly Curves（ビッグハンド：デッドリーカーブ）', laps: 3, league: 'Joker' },
      // エックスカップ
      { id: 25, name: 'X（自動生成コース1）', laps: 3, league: 'X' },
      { id: 26, name: 'X（自動生成コース2）', laps: 3, league: 'X' },
      { id: 27, name: 'X（自動生成コース3）', laps: 3, league: 'X' },
      { id: 28, name: 'X（自動生成コース4）', laps: 3, league: 'X' },
      { id: 29, name: 'X（自動生成コース5）', laps: 3, league: 'X' },
      { id: 30, name: 'X（自動生成コース6）', laps: 3, league: 'X' },
    ]
  },
  // F-ZERO: Maximum Velocity - GBA
  {
    gameId: 4,
    defaultLaps: 5,
    courses: [
      // ポーンリーグ
      { id: 1, name: 'Bianca City: Stretch Circuit（ビアンカシティ：ストレッチサーキット）', laps: 5, league: 'Pawn' },
      { id: 2, name: 'Stark Farm: First Circuit（スタークファーム：ファーストサーキット）', laps: 5, league: 'Pawn' },
      { id: 3, name: 'Empyrean Colony: Dash Circuit（エンピリアンコロニー：ダッシュサーキット）', laps: 5, league: 'Pawn' },
      { id: 4, name: 'Stark Farm: Second Circuit（スタークファーム：セカンドサーキット）', laps: 5, league: 'Pawn' },
      { id: 5, name: 'Cloud Carpet: Long Jump Circuit（クラウドカーペット：ロングジャンプサーキット）', laps: 5, league: 'Pawn' },
      // ナイトリーグ
      { id: 6, name: 'Tenth Zone East: Snake Circuit（テンスゾーンイースト：スネークサーキット）', laps: 5, league: 'Knight' },
      { id: 7, name: 'Beacon Port: Crossroad Circuit（ビーコンポート：クロスロードサーキット）', laps: 5, league: 'Knight' },
      { id: 8, name: 'Synobazz: Explosive Circuit（シノバズ：エクスプローシブサーキット）', laps: 5, league: 'Knight' },
      { id: 9, name: 'Ancient Mesa: Split Circuit（エンシェントメサ：スプリットサーキット）', laps: 5, league: 'Knight' },
      { id: 10, name: 'Stark Farm: Third Circuit（スタークファーム：サードサーキット）', laps: 5, league: 'Knight' },
      // ビショップリーグ
      { id: 11, name: 'Bianca City: Tightrope Circuit（ビアンカシティ：タイトロープサーキット）', laps: 5, league: 'Bishop' },
      { id: 12, name: 'Ancient Mesa: Skating Circuit（エンシェントメサ：スケーティングサーキット）', laps: 5, league: 'Bishop' },
      { id: 13, name: 'Crater Land: Skid Zone Circuit（クレーターランド：スキッドゾーンサーキット）', laps: 5, league: 'Bishop' },
      { id: 14, name: 'Cloud Carpet: Icarus Circuit（クラウドカーペット：イカロスサーキット）', laps: 5, league: 'Bishop' },
      { id: 15, name: 'Bianca City: Ultimate Circuit（ビアンカシティ：アルティメットサーキット）', laps: 5, league: 'Bishop' },
      // クイーンリーグ
      { id: 16, name: 'Crater Land: Loop Circuit（クレーターランド：ループサーキット）', laps: 5, league: 'Queen' },
      { id: 17, name: 'Tenth Zone East: Plummet Circuit（テンスゾーンイースト：プラメットサーキット）', laps: 5, league: 'Queen' },
      { id: 18, name: 'Empyrean Colony: Twist Circuit（エンピリアンコロニー：ツイストサーキット）', laps: 5, league: 'Queen' },
      { id: 19, name: 'Fire Field: Land Mine Circuit（ファイアーフィールド：ランドマインサーキット）', laps: 5, league: 'Queen' },
      { id: 20, name: 'Fire Field: Warrior Circuit（ファイアーフィールド：ウォリアーサーキット）', laps: 5, league: 'Queen' },
    ]
  },
  // F-ZERO GX - GC
  {
    gameId: 3,
    defaultLaps: 3,
    courses: [
      // ルビーカップ
      { id: 1, name: 'Mute City: Twist Road（ミュートシティ：ツイストロード）', laps: 3, league: 'Ruby' },
      { id: 2, name: 'Casino Palace: Split Oval（カジノパレス：スプリットオーバル）', laps: 3, league: 'Ruby' },
      { id: 3, name: 'Sand Ocean: Surface Slide（サンドオーシャン：サーフェススライド）', laps: 3, league: 'Ruby' },
      { id: 4, name: 'Lightning: Loop Cross（ライトニング：ループクロス）', laps: 3, league: 'Ruby' },
      { id: 5, name: 'Aeropolis: Multiplex（エアロポリス：マルチプレックス）', laps: 3, league: 'Ruby' },
      // サファイアカップ
      { id: 6, name: 'Big Blue: Drift Highway（ビッグブルー：ドリフトハイウェイ）', laps: 3, league: 'Sapphire' },
      { id: 7, name: 'Port Town: Aero Dive（ポートタウン：エアロダイブ）', laps: 3, league: 'Sapphire' },
      { id: 8, name: 'Green Plant: Mobius Ring（グリーンプラント：メビウスリング）', laps: 3, league: 'Sapphire' },
      { id: 9, name: 'Port Town: Long Pipe（ポートタウン：ロングパイプ）', laps: 3, league: 'Sapphire' },
      { id: 10, name: 'Mute City: Serial Gaps（ミュートシティ：シリアルギャップ）', laps: 3, league: 'Sapphire' },
      // エメラルドカップ
      { id: 11, name: 'Fire Field: Cylinder Knot（ファイアーフィールド：シリンダーノット）', laps: 3, league: 'Emerald' },
      { id: 12, name: 'Green Plant: Intersection（グリーンプラント：インターセクション）', laps: 3, league: 'Emerald' },
      { id: 13, name: 'Casino Palace: Double Branches（カジノパレス：ダブルブランチズ）', laps: 3, league: 'Emerald' },
      { id: 14, name: 'Lightning: Half Pipe（ライトニング：ハーフパイプ）', laps: 3, league: 'Emerald' },
      { id: 15, name: 'Big Blue: Ordeal（ビッグブルー：オーディール）', laps: 3, league: 'Emerald' },
      // ダイヤモンドカップ
      { id: 16, name: 'Cosmo Terminal: Trident（コスモターミナル：トライデント）', laps: 3, league: 'Diamond' },
      { id: 17, name: 'Sand Ocean: Lateral Shift（サンドオーシャン：ラテラルシフト）', laps: 3, league: 'Diamond' },
      { id: 18, name: 'Fire Field: Undulation（ファイアーフィールド：アンデュレーション）', laps: 3, league: 'Diamond' },
      { id: 19, name: 'Aeropolis: Dragon Slope（エアロポリス：ドラゴンスロープ）', laps: 3, league: 'Diamond' },
      { id: 20, name: 'Phantom Road: Slim-Line Slits（ファントムロード：スリムラインスリット）', laps: 3, league: 'Diamond' },
      // AXカップ
      { id: 21, name: 'Mute City: Sonic Oval（ミュートシティ：ソニックオーバル）', laps: 3, league: 'AX' },
      { id: 22, name: 'Aeropolis: Screw Drive（エアロポリス：スクリュードライブ）', laps: 3, league: 'AX' },
      { id: 23, name: 'Outer Space: Meteor Stream（アウタースペース：メテオストリーム）', laps: 3, league: 'AX' },
      { id: 24, name: 'Port Town: Cylinder Wave（ポートタウン：シリンダーウェーブ）', laps: 3, league: 'AX' },
      { id: 25, name: 'Lightning: Thunder Road（ライトニング：サンダーロード）', laps: 3, league: 'AX' },
      { id: 26, name: 'Green Plant: Spiral（グリーンプラント：スパイラル）', laps: 3, league: 'AX' },
    ]
  },
  // F-ZERO: GP Legend - GBA
  {
    gameId: 5,
    defaultLaps: 5,
    courses: [
      // ブロンズカップ
      { id: 1, name: 'Mute City - Traditional Park（ミュートシティ：トラディショナルパーク）', laps: 5, league: 'Bronze' },
      { id: 2, name: 'Red Canyon - Junction（レッドキャニオン：ジャンクション）', laps: 5, league: 'Bronze' },
      { id: 3, name: 'Mist Flow - Clip Oval（ミストフロー：クリップオーバル）', laps: 5, league: 'Bronze' },
      { id: 4, name: 'Lightning - Volute（ライトニング：ボリュート）', laps: 5, league: 'Bronze' },
      { id: 5, name: 'Fire Field - Blast Track（ファイアーフィールド：ブラストトラック）', laps: 5, league: 'Bronze' },
      // シルバーカップ
      { id: 6, name: 'Silence - Box Rink（サイレンス：ボックスリンク）', laps: 5, league: 'Silver' },
      { id: 7, name: 'Sand Ocean - Caterpillar（サンドオーシャン：キャタピラー）', laps: 5, league: 'Silver' },
      { id: 8, name: 'Mute City - Expansion Park（ミュートシティ：エキスパンションパーク）', laps: 5, league: 'Silver' },
      { id: 9, name: 'Big Blue - Slip Highway（ビッグブルー：スリップハイウェイ）', laps: 5, league: 'Silver' },
      { id: 10, name: 'Mist Flow - Front & Back（ミストフロー：フロント＆バック）', laps: 5, league: 'Silver' },
      // ゴールドカップ
      { id: 11, name: 'Port Town - Forked Road（ポートタウン：フォークドロード）', laps: 5, league: 'Gold' },
      { id: 12, name: 'Silence - Honeycomb Rink（サイレンス：ハニカムリンク）', laps: 5, league: 'Gold' },
      { id: 13, name: 'White Land - Flower（ホワイトランド：フラワー）', laps: 5, league: 'Gold' },
      { id: 14, name: 'Fire Field - Wreckage Circuit（ファイアーフィールド：レッケージサーキット）', laps: 5, league: 'Gold' },
      { id: 15, name: 'Red Canyon - Peak Jump / Illusion - Abyss Drop（レッドキャニオン：ピークジャンプ／イリュージョン：アビスドロップ）', laps: 5, league: 'Gold' },
      // プラチナカップ（オリジナルF-ZERO再現コース）
      { id: 16, name: 'Mute City I（ミュートシティ1）', laps: 5, league: 'Platinum' },
      { id: 17, name: 'Big Blue（ビッグブルー）', laps: 5, league: 'Platinum' },
      { id: 18, name: 'Silence（サイレンス）', laps: 5, league: 'Platinum' },
      { id: 19, name: 'Port Town II（ポートタウン2）', laps: 5, league: 'Platinum' },
      { id: 20, name: 'Red Canyon II（レッドキャニオン2）', laps: 5, league: 'Platinum' },
      { id: 21, name: 'Sand Ocean（サンドオーシャン）', laps: 5, league: 'Platinum' },
      { id: 22, name: 'White Land II（ホワイトランド2）', laps: 5, league: 'Platinum' },
      { id: 23, name: 'Fire Field（ファイアーフィールド）', laps: 5, league: 'Platinum' },
    ]
  },
  // F-ZERO Climax - GBA
  {
    gameId: 6,
    defaultLaps: 3,
    courses: [
      // ブロンズカップ
      { id: 1, name: 'Mute City - Six Caret（ミュートシティ：シックスカラット）', laps: 3, league: 'Bronze' },
      { id: 2, name: 'Sand Ocean - High Speed Edge（サンドオーシャン：ハイスピードエッジ）', laps: 3, league: 'Bronze' },
      { id: 3, name: 'Port Town - Sky Highway（ポートタウン：スカイハイウェイ）', laps: 3, league: 'Bronze' },
      { id: 4, name: 'White Land - Wolf（ホワイトランド：ウルフ）', laps: 3, league: 'Bronze' },
      { id: 5, name: 'Fire Field - Heat Circuit（ファイアーフィールド：ヒートサーキット）', laps: 3, league: 'Bronze' },
      // シルバーカップ
      { id: 6, name: 'Big Blue - Slalom（ビッグブルー：スラローム）', laps: 3, league: 'Silver' },
      { id: 7, name: 'Red Canyon - Inside Out（レッドキャニオン：インサイドアウト）', laps: 3, league: 'Silver' },
      { id: 8, name: 'Mist Flow - Double Link（ミストフロー：ダブルリンク）', laps: 3, league: 'Silver' },
      { id: 9, name: 'Fire Field - Front Line I（ファイアーフィールド：フロントライン1）', laps: 3, league: 'Silver' },
      { id: 10, name: 'Silence - Nightmare（サイレンス：ナイトメア）', laps: 3, league: 'Silver' },
      // ゴールドカップ
      { id: 11, name: 'Lightning - R Trace（ライトニング：Rトレース）', laps: 3, league: 'Gold' },
      { id: 12, name: 'Port Town - Half Dome I（ポートタウン：ハーフドーム1）', laps: 3, league: 'Gold' },
      { id: 13, name: 'Sand Ocean - Key Break I（サンドオーシャン：キーブレイク1）', laps: 3, league: 'Gold' },
      { id: 14, name: 'Big Blue - Slip Down（ビッグブルー：スリップダウン）', laps: 3, league: 'Gold' },
      { id: 15, name: 'Illusion - Lost Way I（イリュージョン：ロストウェイ1）', laps: 3, league: 'Gold' },
      // プラチナカップ
      { id: 16, name: 'Mute City - Multiply（ミュートシティ：マルチプライ）', laps: 3, league: 'Platinum' },
      { id: 17, name: 'Big Blue - Big Billow（ビッグブルー：ビッグビロー）', laps: 3, league: 'Platinum' },
      { id: 18, name: 'Silence - Silence I（サイレンス：サイレンス1）', laps: 3, league: 'Platinum' },
      { id: 19, name: 'Port Town - Great Wings（ポートタウン：グレートウイングス）', laps: 3, league: 'Platinum' },
      { id: 20, name: 'Red Canyon - Red Canyon I（レッドキャニオン：レッドキャニオン1）', laps: 3, league: 'Platinum' },
      { id: 21, name: 'Sand Ocean - Sand Ocean（サンドオーシャン：サンドオーシャン）', laps: 3, league: 'Platinum' },
      { id: 22, name: 'White Land - White Land I（ホワイトランド：ホワイトランド1）', laps: 3, league: 'Platinum' },
      { id: 23, name: 'Fire Field - Fire Field（ファイアーフィールド：ファイアーフィールド）', laps: 3, league: 'Platinum' },
    ]
  },
  // F-ZERO 99 - Switch
  {
    gameId: 7,
    defaultLaps: 5,
    courses: [
      // ナイトリーグ
      { id: 1, name: 'Mute City I（ミュートシティ1）', laps: 5, league: 'Knight' },
      { id: 2, name: 'Big Blue（ビッグブルー）', laps: 5, league: 'Knight' },
      { id: 3, name: 'Sand Ocean（サンドオーシャン）', laps: 5, league: 'Knight' },
      { id: 4, name: 'Death Wind I（デスウインド1）', laps: 5, league: 'Knight' },
      { id: 5, name: 'Silence（サイレンス）', laps: 5, league: 'Knight' },
      // クイーンリーグ
      { id: 6, name: 'Mute City II（ミュートシティ2）', laps: 5, league: 'Queen' },
      { id: 7, name: 'Port Town I（ポートタウン1）', laps: 5, league: 'Queen' },
      { id: 8, name: 'Red Canyon I（レッドキャニオン1）', laps: 5, league: 'Queen' },
      { id: 9, name: 'White Land I（ホワイトランド1）', laps: 5, league: 'Queen' },
      { id: 10, name: 'White Land II（ホワイトランド2）', laps: 5, league: 'Queen' },
      // キングリーグ
      { id: 11, name: 'Mute City III（ミュートシティ3）', laps: 5, league: 'King' },
      { id: 12, name: 'Death Wind II（デスウインド2）', laps: 5, league: 'King' },
      { id: 13, name: 'Port Town II（ポートタウン2）', laps: 5, league: 'King' },
      { id: 14, name: 'Red Canyon II（レッドキャニオン2）', laps: 5, league: 'King' },
      { id: 15, name: 'Fire Field（ファイアーフィールド）', laps: 5, league: 'King' },
      // エースリーグ（BS F-ZERO版コース）
      { id: 16, name: 'Mute City IV（ミュートシティ4）', laps: 5, league: 'Ace' },
      { id: 17, name: 'Sand Storm I（サンドストーム1）', laps: 5, league: 'Ace' },
      { id: 18, name: 'Big Blue II（ビッグブルー2）', laps: 5, league: 'Ace' },
      { id: 19, name: 'Sand Storm II（サンドストーム2）', laps: 5, league: 'Ace' },
      { id: 20, name: 'Silence II（サイレンス2）', laps: 5, league: 'Ace' },
      // ミラーナイトリーグ
      { id: 21, name: 'Mute City I（ミュートシティ1）[Mirror]', laps: 5, league: 'MirrorKnight' },
      { id: 22, name: 'Big Blue（ビッグブルー）[Mirror]', laps: 5, league: 'MirrorKnight' },
      { id: 23, name: 'Sand Ocean（サンドオーシャン）[Mirror]', laps: 5, league: 'MirrorKnight' },
      { id: 24, name: 'Death Wind I（デスウインド1）[Mirror]', laps: 5, league: 'MirrorKnight' },
      { id: 25, name: 'Silence（サイレンス）[Mirror]', laps: 5, league: 'MirrorKnight' },
      // ミラークイーンリーグ
      { id: 26, name: 'Mute City II（ミュートシティ2）[Mirror]', laps: 5, league: 'MirrorQueen' },
      { id: 27, name: 'Port Town I（ポートタウン1）[Mirror]', laps: 5, league: 'MirrorQueen' },
      { id: 28, name: 'Red Canyon I（レッドキャニオン1）[Mirror]', laps: 5, league: 'MirrorQueen' },
      { id: 29, name: 'White Land I（ホワイトランド1）[Mirror]', laps: 5, league: 'MirrorQueen' },
      { id: 30, name: 'White Land II（ホワイトランド2）[Mirror]', laps: 5, league: 'MirrorQueen' },
      // ミラーキングリーグ
      { id: 31, name: 'Mute City III（ミュートシティ3）[Mirror]', laps: 5, league: 'MirrorKing' },
      { id: 32, name: 'Death Wind II（デスウインド2）[Mirror]', laps: 5, league: 'MirrorKing' },
      { id: 33, name: 'Port Town II（ポートタウン2）[Mirror]', laps: 5, league: 'MirrorKing' },
      { id: 34, name: 'Red Canyon II（レッドキャニオン2）[Mirror]', laps: 5, league: 'MirrorKing' },
      { id: 35, name: 'Fire Field（ファイアーフィールド）[Mirror]', laps: 5, league: 'MirrorKing' },
      // ミラーエースリーグ
      { id: 36, name: 'Mute City IV（ミュートシティ4）[Mirror]', laps: 5, league: 'MirrorAce' },
      { id: 37, name: 'Sand Storm I（サンドストーム1）[Mirror]', laps: 5, league: 'MirrorAce' },
      { id: 38, name: 'Big Blue II（ビッグブルー2）[Mirror]', laps: 5, league: 'MirrorAce' },
      { id: 39, name: 'Sand Storm II（サンドストーム2）[Mirror]', laps: 5, league: 'MirrorAce' },
      { id: 40, name: 'Silence II（サイレンス2）[Mirror]', laps: 5, league: 'MirrorAce' },
    ]
  }
];

// ゲームIDとコースIDからコース情報を取得する関数
export const getCourseInfo = (gameId: number, courseId: number): Course | undefined => {
  const game = courseData.find(g => g.gameId === gameId);
  if (!game) return undefined;
  
  return game.courses.find(c => c.id === courseId);
};

// ゲームIDからそのゲームのコース一覧を取得する関数
export const getGameCourses = (gameId: number): Course[] => {
  const game = courseData.find(g => g.gameId === gameId);
  return game ? game.courses : [];
};

// ゲームIDとリーグからそのリーグのコース一覧を取得する関数
export const getLeagueCourses = (gameId: number, league: string): Course[] => {
  const game = courseData.find(g => g.gameId === gameId);
  if (!game) return [];
  
  return game.courses.filter(c => c.league === league);
};

// ゲームIDからデフォルトのラップ数を取得する関数
export const getDefaultLaps = (gameId: number): number => {
  const game = courseData.find(g => g.gameId === gameId);
  return game ? game.defaultLaps : 3; // デフォルトは3周
}; 