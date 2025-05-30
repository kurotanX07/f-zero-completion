// src/data/gameData.ts の内容
import { Game } from '../types';

export const gameData: Game[] = [
  {
    id: 1,
    title: 'F-ZERO',
    leagues: ['Knight', 'Queen', 'King'],
    machines: [
      {
        name: 'BLUE FALCON',
        pilot: 'キャプテン・ファルコン',
        specs: { 
          body: 'B', 
          boost: 'B', 
          grip: 'B',
          // 詳細スペック
          topSpeed: 'A',
          boostSpeed: 'B',
          boostDuration: 'B',
          bodyStrength: 'B',
          cornering: 'B',
          balance: 'A',
          acceleration: 'B'
        },
        description: 'バウンティハンターとして知られるキャプテン・ファルコンの愛機。非常にバランスの取れた性能で、初心者から上級者まで扱いやすい。強力なG-ディフューザーシステムにより、あらゆるコースで安定した走りを実現する。ファルコンは正義の使者として悪に立ち向かう一方で、F-ZEROグランプリでの優勝を目指している。'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'ドクター・スチュワート',
        specs: { 
          body: 'C', 
          boost: 'A', 
          grip: 'E',
          // 詳細スペック
          topSpeed: 'B',
          boostSpeed: 'A',
          boostDuration: 'A',
          bodyStrength: 'C',
          cornering: 'D',
          balance: 'C',
          acceleration: 'A'
        },
        description: '天才外科医ロバート・スチュワートが操る金色の機体。父の遺志を継ぎF-ZEROレースに参戦。軽量で加速性能が高く、ブーストも強力だが、耐久性とコーナリング性能が低いハイリスク・ハイリターンなマシン。スチュワートは医師としての本業の傍ら、レースの賞金を医療研究に投じている。'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'ピコ',
        specs: { 
          body: 'A', 
          boost: 'D', 
          grip: 'C', 
          // 詳細スペック
          topSpeed: 'A',
          boostSpeed: 'D',
          boostDuration: 'D',
          bodyStrength: 'A',
          cornering: 'C',
          balance: 'B',
          acceleration: 'D'
        },
        description: '元軍人で現在は傭兵として活動するピコのマシン。重量があり最高速度も高いが、加速に時間がかかる。ただし、その重量を活かした体当たりは他のマシンを弾き飛ばすほど。ピコの故郷デスボーンは過酷な環境で知られ、そこで培った耐久力と狡猾さを駆使してレースに挑む。'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'サムライ・ゴロー',
        specs: { 
          body: 'B', 
          boost: 'C', 
          grip: 'A',
          // 詳細スペック
          topSpeed: 'A',
          boostSpeed: 'C',
          boostDuration: 'B',
          bodyStrength: 'B',
          cornering: 'A',
          balance: 'B',
          acceleration: 'C' 
        },
        description: '宇宙海賊と呼ばれるサムライ・ゴローの愛機。直線での最高速度は高く、コーナリング性能も優秀。ゴローはキャプテン・ファルコンのライバルであり、かつての親友。ファルコンへの複雑な感情を抱えながらも、F-ZEROグランプリでの勝利を目指し、時に正義のために行動する義賊としての一面も持つ。'
      }
    ]
  },
  /* ===== F-ZERO X (1998 / N64) ============================================ */
  {
    id: 2,
    title: 'F-ZERO X',
    leagues: ['Jack', 'Queen', 'King', 'Joker', 'X'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'マイティ・ガゼール',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '事故でサイボーグとなった元トップレーサーの愛機。脆い車体だが強烈なブーストが光る。序盤の立ち上がりをどう乗り切るかが鍵。'
      },
      {
        name: 'WHITE CAT',
        pilot: 'ジョディ・サマー',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '銀河警察の女性士官が操る白いマシン。最高のグリップで高速コーナーも安定。長丁場を堅実に走り切るコントロール型。'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'ドクター・スチュワート',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: '天才外科医のドクターが設計した軽量機。加速とブーストは驚異的だが耐久力が低い。短距離決戦向けのテクニカルマシン。'
      },
      {
        name: 'IRON TIGER',
        pilot: 'ババ',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'ジャングル出身の野性児ババが鍛え上げた鉄の虎。旋回性能に優れ、接触にも比較的強いが、加速力は控えめ。'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'サムライ・ゴロー',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: '宇宙をまたにかける義賊ゴローの紫電。重くて頑丈、トップスピードも高い。立ち上がりこそ遅いが長い直線で真価を発揮。'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'ピコ',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: '元宇宙軍の傭兵ピコが乗るグリーン機。車体もブーストもバランス良好。重量級らしい押し出しの強さが武器。'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'キャプテン・ファルコン',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'シリーズの顔とも言える万能マシン。クセのない操作性で初心者から上級者まで扱いやすい。まさに"青き鷹"。'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'オクトマン',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '惑星タクオンの海賊オクトマンが操る深海機。平均的な性能だが、重めのハンドリングが個性。'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr.EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: '任天堂社内ロボを模したMr.EADの専用車。紙装甲ながら一級品のブーストを持つロマン枠。体当たりは禁物。'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'ジェームズ・マクラウド',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '銀河傭兵団リーダーのワイバーン。軽量でコーナリングは素直。耐久力の低さを丁寧なライン取りで補いたい。'
      },
      {
        name: 'MAD WOLF',
        pilot: 'ビリー',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'ブルドッグ的な走破性を持つ荒くれマシン。平均性能でクセがなく、重量で押し込む戦法も取りやすい。'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'ケイト・アレン',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: '歌姫レーサーが駆る鮮烈なピラニア。軽快な操作感と安定の加速でテクニカルコースに強いオールラウンダー。'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'ゾーダ',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '悪名高い犯罪者ゾーダの漆黒マシン。ブースト依存度が高い尖った性能で、被弾すると一気に失速する諸刃の剣。'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'ジャック・レヴィン',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'アイドル的人気を誇る若手レーサーの愛機。高いグリップで切り返しが得意。ブーストは弱めなので丁寧さが求められる。'
      },
      {
        name: 'BIG FANG',
        pilot: 'バイオ・レックス',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '遺伝子改造で蘇った恐竜レーサーの猛牙。重心は高いがコーナー性能は良好。攻撃的な見た目に反して扱いやすい。'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'ザ・スカル',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '死神と噂される謎のドライバーが操る紫の亡霊。軽量級の中では高いブーストが魅力だが、グリップ不足に注意。'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'アントニオ・ガスター',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: '元マフィアの荒くれ者が放つ緑の獣。高耐久・高加速だが曲がりに粘りがない。重量を活かして敵を弾き飛ばせ。'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'ビーストマン',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '宇宙保安官ビーストマンの専用機。ハイグリップでライン維持がしやすい反面、トップスピードは平凡。'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'レオン',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '水棲生物レオンが乗る軽量機。旋回と立ち上がりに優れるテクニカル志向。乱戦を避けてタイムアタックで真価。'
      },
      {
        name: 'KING METEOR',
        pilot: 'スーパー・アロー',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '正義のヒーローが乗る王者の隕石。車体は脆いが挙動は素直。ライバル車との接触を避ければ高順位も狙える。'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'ミセス・アロー',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '夫婦ヒーローの連携で生まれた機体。キングメテオとほぼ同性能だが、やや軽めの操作感で女性にも人気。'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'ゴマー&シオー',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '双子エイリアンが同乗する超軽量機。加速とブーストは優秀だが耐久は紙。重量車を避けつつスラロームで稼ぐ。'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'シルバー・ニールセン',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: '歴戦の老将が乗る電光マシン。攻撃性能と加速は高いが、グリップが極端に低い。スリップに要注意。'
      },
      {
        name: 'WILD BOAR',
        pilot: 'マイケル・チェイン',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: '暴走族を束ねる元警察官の猛猪。重いが頑丈で打たれ強い。コーナーで膨らみやすいので早めのブレーキングが吉。'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'ブラッド・ファルコン',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'キャプテンのクローン体が駆る深紅の鷹。ブースト特化で終盤のラッシュが強烈。グリップ不足の補正が課題。'
      },
      {
        name: 'WONDER WASP',
        pilot: 'ジョン・タナカ',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: '銀河連邦代表タナカの業務用機。軽量ながら加速は十分。攻撃されると脆いのでクリアなライン確保が必須。'
      },
      {
        name: 'MIGHTY TYHOON',
        pilot: 'ドラッグ',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '怪力宇宙人ドラッグの旋風。軽量級トップクラスの加速を持つが、直線番長気味。ハイスピードコース向き。'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'ロジャー・バスター',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '豪腕レスラーが振り回す暴風号。性能は平均的だが車体が軽く、壁ドンに弱い。重量車との接触を避けたい。'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'ドクター・クラッシュ',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: '老科学者クラッシュ博士の怪力マシン。高い耐久と押し出し性能を誇るが、グリップが低くスライダー寄りの挙動。'
      },
      {
        name: 'BLACK BULL',
        pilot: 'ブラックシャドー',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: '闇の帝王ブラックシャドーの黒き暴牛。シリーズ随一の加速力を持つ反面、ブースト消費が激しい。制御できれば最強。'
      }
    ]
  },
  /* ======================================================================= */
  
  /* ===== F-ZERO GX / AX (2003 / GC・AC) ===================================== */
  {
    id: 3,
    title: 'F-ZERO GX',
    leagues: ['Ruby', 'Sapphire', 'Emerald', 'Diamond', 'AX'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '事故でサイボーグ化したマイティ・ガゼールの愛機。脆い車体だが瞬間的な加速と強いブーストで勝負する短距離仕様。'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '銀河警察士官ジョディの白猫マシン。最高クラスのグリップで高速コーナーも安定。長丁場を堅実に走り切る。'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: '天才外科医スチュワートが設計した金のキツネ。軽量ゆえ耐久は低いが、加速とブーストはトップクラス。'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '野生児ババが駆る鉄の虎。高グリップと耐久で攻守に優れるが、ブーストが弱く立ち上がりにもたつく重量級。'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: '義賊ゴローの紫電。重量とトップスピードで直線を制圧。序盤の加速の遅さをどう補うかがカギ。'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: '傭兵ピコの緑色ガチョウ。Aボディで当たりに強く、平均以上のブーストを備える安定志向マシン。'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'キャプテン・ファルコンの青き鷹。クセのない操作性でシリーズの基準機としても知られる万能タイプ。'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '海賊オクトマンの深海クロー。中量級で安定の B/B/C。重めの舵で滑りやすいが直進は素直。'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'アンドロイド Mr.EAD のスター号。紙装甲ながら強力なブーストを搭載したロマン枠、被弾管理が必須。'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ジェームズ率いる傭兵団の小型ワイバーン。軽量で曲がりやすいが耐久が低い、丁寧なライン取りが重要。'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '荒くれビリーの狂犬号。平均的な性能と程良い重量感で、接触戦もこなす中堅オールラウンダー。'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: '歌姫ケイトの鮮烈ピラニア。軽量で加速に優れ、テクニカルコース向き。壁ヒットには要注意。'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '犯罪者ゾーダの黒き錨。ブースト特化で終盤の爆発力が魅力だが、紙装甲につき被弾は禁物。'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'アイドル的人気を誇る若手レーサーの星のロビン。高いグリップで切り返しが得意だが、ブーストは弱め。'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '遺伝子改造恐竜バイオ・レックスの猛牙号。高い耐久と A グリップで攻守のバランスに優れる。'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '死神スカルの音速亡霊。軽量で高ブーストだがグリップが低くスライド多発。上級者向け。'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: '元マフィア・ガスターの緑豹。高耐久と強い加速で序盤から押しまくるパワー型。'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'ビーストマンの超速機。高グリップでライン維持がしやすく扱いやすい。'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '水棲レオンの青魚号。超軽量で旋回性能抜群、接触には弱いタイムアタック志向。'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '正義のヒーローが乗る王者の隕石。紙装甲だが素直な挙動で初心者も扱いやすい。'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ミセス・アローの女王隕石。キングと同等性能だがやや軽い操作感で取り回しが良い。'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '双子エイリアンが同乗する超軽量機。加速最速クラスだが耐久は紙。'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: '老将ニールセンの雷号。加速 A で力強いがグリップ E で滑りやすい玄人好み。'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: '元警官チェインの猛猪。重くて頑丈、押し出しが強いパワータイプ。'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'ブラッド・ファルコンの深紅機。ブースト A で終盤の伸びが凄まじいが制御が難しい。'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'ジョン・タナカの業務用ワスプ。軽量でブースト A。耐久 D ゆえクリーン走行が必須。'
      },
      {
        name: 'MIGHTY TYHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '怪力宇宙人ドラッグの颶風号。加速 A でコーナーも良好だがトップスピードは平凡。'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'レスラー・ロジャーの暴風号。平均的な性能で重量はあるが装甲薄く壁ドンに弱い。'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'クラッシュ博士の熊号。A ボディでタンク級だがグリップ E。壁当て戦法で真価を発揮。'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: '暗黒帝王ブラックシャドーの黒牛。加速 E だが高耐久と A グリップで最凶クラスの存在感。'
      },
      /* ------- GX/AX 隠しマシン ------- */
      {
        name: 'DARK SCHNEIDER',
        pilot: 'Deathborn',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: '死神デスボーンの"漆黒の翼"。高耐久と良好な加速を持つが低グリップで曲がりが鈍い。'
      },
      {
        name: 'FAT SHARK',
        pilot: 'Don Genie',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'ドン・ジーニーの極太サメ号。最重量級で直線番長。曲がる前にはしっかり減速を。'
      },
      {
        name: 'COSMIC DOLPHIN',
        pilot: 'Digi-Boy',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'デジボーイの宇宙イルカ。軽量でブースト A、操作も素直だが耐久 E ゆえ被弾厳禁。'
      },
      {
        name: 'PINK SPIDER',
        pilot: 'Dai San Gen',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '情報屋・大三元の桃色蜘蛛。C/C/A の万能型でテクニカルコースを得意とする。'
      },
      {
        name: 'MAGIC SEAGULL',
        pilot: 'Spade',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: '奇術師スペードの白カモメ。突進力とブーストが魅力だが滑りやすさを抑え込めるかが課題。'
      },
      {
        name: 'SILVER RAT',
        pilot: 'Daigoroh',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'ゴローの息子ダイゴロウの銀鼠。軽く扱いやすいが装甲薄め。ブースト依存のスプリント機。'
      },
      {
        name: 'SPARK MOON',
        pilot: 'Princia Ramode',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: '王女プリシアの月光号。B/C/B で目立った弱点がなく素直な操作感。'
      },
      {
        name: 'BUNNY FLASH',
        pilot: 'Lily Flyer',
        specs: { body: 'D', boost: 'B', grip: 'A' },
        description: '花売り娘リリーのウサギ号。卓越したグリップを武器にコーナリングで勝負する。'
      },
      {
        name: 'GROOVY TAXI',
        pilot: 'PJ',
        specs: { body: 'B', boost: 'D', grip: 'B' },
        description: '謎のドライバー PJ のタクシー。ロングブーストと中量ボディでハーフパイプを得意とする。'
      },
      {
        name: 'ROLLING TURTLE',
        pilot: 'QQQ',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'QQQ 三兄弟の回転亀。高耐久と直進安定に優れるがコーナーは早めの減速が必要。'
      },
      {
        name: 'RAINBOW PHOENIX',
        pilot: 'Phoenix',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '未来のレーサー・フェニックスの虹彩機。バランス型でピット運用と加速伸ばしが鍵。'
      }
    ]
  },
/* ===== F-ZERO: Maximum Velocity (GBA / 2001) ==================== */
   {
    id: 4,
    title: 'F-ZERO: Maximum Velocity',
    leagues: ['Pawn', 'Knight', 'Bishop', 'Queen'],
    machines: [
      { 
        name: 'HOT VIOLET',
        pilot: 'Megan',
        specs: { 
          body: 'D', 
          boost: 'C', 
          grip: 'B',
          // 詳細スペック
          topSpeed: 'C',
          boostSpeed: 'C',
          boostDuration: 'C',
          bodyStrength: 'D',
          cornering: 'B',
          balance: 'B',
          acceleration: 'B'
        }, 
        description: '平均的な性能で初心者向け。瞬発力に優れるが装甲はやや脆い。メーガンは元F-ZEROパイロットの娘で、若くして頭角を現した新世代のレーサー。母譲りの繊細なマシンコントロールと、強い精神力で難コースでも安定した走りを見せる。' 
      },
      { 
        name: 'FIRE BALL',
        pilot: 'Mickey Marcus',
        specs: { 
          body: 'B', 
          boost: 'C', 
          grip: 'C',
          // 詳細スペック
          topSpeed: 'A',
          boostSpeed: 'C',
          boostDuration: 'C',
          bodyStrength: 'B',
          cornering: 'C',
          balance: 'B',
          acceleration: 'C'
        }, 
        description: '最高速が高く装甲も厚め。加速とコーナリングは並みだが扱いやすい。ミッキー・マーカスは元軍のテストパイロットで、極限状態での操縦技術には定評がある。冷静な判断力と熱いレース魂を持ち合わせ、幅広いファンから支持を得ている。' 
      },
      { 
        name: 'J.B. CRYSTAL',
        pilot: 'Jane B. Christie',
        specs: { 
          body: 'D', 
          boost: 'E', 
          grip: 'C',
          // 詳細スペック
          topSpeed: 'D',
          boostSpeed: 'D',
          boostDuration: 'A+',
          bodyStrength: 'D',
          cornering: 'C',
          balance: 'C',
          acceleration: 'D'
        }, 
        description: '長時間ブーストが特徴。安定性は高いが最高速はワーストクラス。ジェーン・B・クリスティは名門レーサー家系の末裔。理論派として知られ、完璧な走行ラインの計算と燃料効率の良さを武器に、不利な条件でも巧みにレースをコントロールする。' 
      },
      { 
        name: 'WIND WALKER',
        pilot: 'Nichi',
        specs: { 
          body: 'E', 
          boost: 'B', 
          grip: 'A',
          // 詳細スペック
          topSpeed: 'B',
          boostSpeed: 'B',
          boostDuration: 'B',
          bodyStrength: 'E',
          cornering: 'A+',
          balance: 'B',
          acceleration: 'A'
        }, 
        description: '超軽量で旋回性能が抜群。紙装甲のため接触ダメージに注意。ニチは砂漠の遊牧民出身の若きレーサー。自然の風を読む特殊な能力を持ち、風のように軽やかな操縦で他のパイロットを翻弄する。わずかな接触でもマシンが大ダメージを受けるため、クリーンなレースが必須。' 
      },
      { 
        name: 'SLY JOKER',
        pilot: 'Lord Cyber',
        specs: { 
          body: 'C', 
          boost: 'A', 
          grip: 'C',
          // 詳細スペック
          topSpeed: 'B',
          boostSpeed: 'A+',
          boostDuration: 'D',
          bodyStrength: 'C',
          cornering: 'C',
          balance: 'B',
          acceleration: 'A'
        }, 
        description: '最短3秒の超強力ブーストを持つ切り札。加速と耐久は平均的。ロード・サイバーは謎に包まれたサイボーグレーサー。人間時代の記憶を失っているが、マシンとの一体感は群を抜いており、短時間で驚異的な加速を見せる。その正体については様々な噂が飛び交っている。' 
      },
      { 
        name: 'SILVER THUNDER',
        pilot: 'Blitz Wagner',
        specs: { 
          body: 'A', 
          boost: 'A', 
          grip: 'D',
          // 詳細スペック
          topSpeed: 'A+',
          boostSpeed: 'A',
          boostDuration: 'D',
          bodyStrength: 'A',
          cornering: 'D',
          balance: 'D',
          acceleration: 'C'
        }, 
        description: '装甲・最高速ともトップ。曲がりにくく、ブースト持続も短い。ブリッツ・ワグナーは元F-ZEROチャンピオンの息子。父の栄光を超えるべく、持ち前の度胸と圧倒的なパワーで他のマシンを威圧する激しい走りが特徴。テクニカルなコースでは苦戦することも。' 
      },
      { 
        name: 'THE STINGRAY',
        pilot: 'Alexander O\'Neil',
        specs: { 
          body: 'B', 
          boost: 'E', 
          grip: 'C',
          // 詳細スペック
          topSpeed: 'C',
          boostSpeed: 'D',
          boostDuration: 'A+',
          bodyStrength: 'B',
          cornering: 'C',
          balance: 'C',
          acceleration: 'E'
        }, 
        description: '12秒という最長ブーストが武器。加速が遅く扱いには熟練を要する。アレクサンダー・オニールは古参レーサーで戦略家として知られる。立ち上がりの遅さを補う長時間ブーストと経験に基づく燃料管理で、後半に力を発揮する粘り強いレース運びが持ち味。' 
      },
      { 
        name: 'FALCON MK-2',
        pilot: 'Kent Akechi',
        specs: { 
          body: 'D', 
          boost: 'C', 
          grip: 'C',
          // 詳細スペック
          topSpeed: 'B',
          boostSpeed: 'B',
          boostDuration: 'C',
          bodyStrength: 'D',
          cornering: 'C',
          balance: 'A',
          acceleration: 'B'
        }, 
        description: 'ブルーファルコン直系の改良機。バランス型だが装甲は薄い。ケント・アケチは伝説のパイロット、キャプテン・ファルコンを敬愛する若手レーサー。オリジナルのブルーファルコンを参考に設計したマシンで、バランスの良さを活かした柔軟なレーススタイルが特徴。' 
      },
      { 
        name: 'JET VERMILION',
        pilot: 'Hideo Otsuki',
        specs: { 
          body: 'C', 
          boost: 'B', 
          grip: 'D',
          // 詳細スペック
          topSpeed: 'A',
          boostSpeed: 'B',
          boostDuration: 'B',
          bodyStrength: 'C',
          cornering: 'D',
          balance: 'C',
          acceleration: 'B'
        }, 
        description: '最高速と加速が優れた赤いジェット機。ただしコーナーリングは苦手で直線番長タイプ。大手企業の御曹司ヒデオ・オオツキのマシン。豊富な資金力を背景に最新技術を惜しみなく投入した機体だが、操縦技術はやや未熟。レースでの経験を積みながら日々成長している。' 
      },
      { 
        name: 'THUNDER OVAL',
        pilot: 'John Derek',
        specs: { 
          body: 'B', 
          boost: 'D', 
          grip: 'B',
          // 詳細スペック
          topSpeed: 'B',
          boostSpeed: 'C',
          boostDuration: 'B',
          bodyStrength: 'B',
          cornering: 'B',
          balance: 'A+',
          acceleration: 'D'
        }, 
        description: '安定感に優れた堅実派マシン。加速は鈍いが一度勢いに乗ると強い。ジョン・デレクは元エンジニアで自らマシンを設計・開発。その経験と知識を活かし、理論値ではなく実戦での使いやすさを重視した設計が特徴。サーキットの解析力と戦略的レース運びに長けている。' 
      }
    ]
  },
   
    /* ===== F-ZERO: GP Legend  (GBA / 2003) ==================== */
  {
    id: 5,
    title: 'F-ZERO: GP Legend',
    leagues: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '事故でサイボーグ化したマイティ・ガゼールの愛機。脆い車体だが瞬間的な加速と強いブーストで勝負する短距離仕様。'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '銀河警察士官ジョディの白猫マシン。最高クラスのグリップで高速コーナーも安定。長丁場を堅実に走り切る。'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: '天才外科医スチュワートが設計した金のキツネ。軽量ゆえ耐久は低いが、加速とブーストはトップクラス。'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '野生児ババが駆る鉄の虎。高グリップと耐久で攻守に優れるが、ブーストが弱く立ち上がりにもたつく重量級。'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: '義賊ゴローの紫電。重量とトップスピードで直線を制圧。序盤の加速の遅さをどう補うかがカギ。'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: '傭兵ピコの緑色ガチョウ。Aボディで当たりに強く、平均以上のブーストを備える安定志向マシン。'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'キャプテン・ファルコンの青き鷹。クセのない操作性でシリーズの基準機としても知られる万能タイプ。'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '海賊オクトマンの深海クロー。中量級で安定の B/B/C。重めの舵で滑りやすいが直進は素直。'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'アンドロイド Mr.EAD のスター号。紙装甲ながら強力なブーストを搭載したロマン枠、被弾管理が必須。'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ジェームズ率いる傭兵団の小型ワイバーン。軽量で曲がりやすいが耐久が低い、丁寧なライン取りが重要。'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '荒くれビリーの狂犬号。平均的な性能と程良い重量感で、接触戦もこなす中堅オールラウンダー。'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: '歌姫ケイトの鮮烈ピラニア。軽量で加速に優れ、テクニカルコース向き。壁ヒットには要注意。'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '犯罪者ゾーダの黒き錨。ブースト特化で終盤の爆発力が魅力だが、紙装甲につき被弾は禁物。'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'アイドル的人気を誇る若手レーサーの星のロビン。高いグリップで切り返しが得意だが、ブーストは弱め。'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '遺伝子改造恐竜バイオ・レックスの猛牙号。高い耐久と A グリップで攻守のバランスに優れる。'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '死神スカルの音速亡霊。軽量で高ブーストだがグリップが低くスライド多発。上級者向け。'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: '元マフィア・ガスターの緑豹。高耐久と強い加速で序盤から押しまくるパワー型。'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'ビーストマンの超速機。高グリップでライン維持がしやすく扱いやすい。'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '水棲レオンの青魚号。超軽量で旋回性能抜群、接触には弱いタイムアタック志向。'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '正義のヒーローが乗る王者の隕石。車体は脆いが挙動は素直。ライバル車との接触を避ければ高順位も狙える。'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ミセス・アローの女王隕石。キングと同等性能だがやや軽い操作感で取り回しが良い。'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '双子エイリアンが同乗する超軽量機。加速最速クラスだが耐久は紙。'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: '老将ニールセンの雷号。加速 A で力強いがグリップ E で滑りやすい玄人好み。'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: '元警官チェインの猛猪。重くて頑丈、押し出しが強いパワータイプ。'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'ブラッド・ファルコンの深紅機。ブースト A で終盤の伸びが凄まじいが制御が難しい。'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'ジョン・タナカの業務用ワスプ。軽量でブースト A。耐久 D ゆえクリーン走行が必須。'
      },
      {
        name: 'MIGHTY TYHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '怪力宇宙人ドラッグの颶風号。加速 A でコーナーも良好だがトップスピードは平凡。'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'レスラー・ロジャーの暴風号。平均的な性能で重量はあるが装甲薄く壁ドンに弱い。'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'クラッシュ博士の熊号。A ボディでタンク級だがグリップ E。壁当て戦法で真価を発揮。'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: '暗黒帝王ブラックシャドーの黒牛。加速 E だが高耐久と A グリップで最凶クラスの存在感。'
      },
      { name: 'DRAGON BIRD',      pilot: 'Rick Wheeler',              specs: { body: 'B', boost: 'B', grip: 'B' }, description: '銀河警察の新鋭機。全性能が平均以上でクセがなく操作しやすい。' },
      { name: 'ELEGANCE LIBERTY', pilot: 'Lucy Liberty',              specs: { body: 'C', boost: 'C', grip: 'A' }, description: '高加速とコーナリングに特化した女性用マシン。最高速は低め。' },
      { name: 'MOON SHADOW',      pilot: 'Misaki Haruka / Miss Killer', specs: { body: 'B', boost: 'C', grip: 'B' }, description: '謎多き暗黒レーサー。バランス型で実戦向きの性能。' },
      { name: 'PANZER EMERALD',   pilot: 'Lisa Brilliant',            specs: { body: 'A', boost: 'C', grip: 'D' }, description: '重装甲＆高重量で体当たりが得意。反面、曲がりは鈍重。' },
    ]
  },
   
  /* ===== F-ZERO: Climax  (GBA / 2004) ==================== */
  {
    id: 6,
    title: 'F-ZERO: Climax',
    leagues: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    machines: [
      // ■ GP Legend（ID 5）の全機体を展開
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '事故でサイボーグ化したマイティ・ガゼールの愛機。脆い車体だが瞬間的な加速と強いブーストで勝負する短距離仕様。'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '銀河警察士官ジョディの白猫マシン。最高クラスのグリップで高速コーナーも安定。長丁場を堅実に走り切る。'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: '天才外科医スチュワートが設計した金のキツネ。軽量ゆえ耐久は低いが、加速とブーストはトップクラス。'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '野生児ババが駆る鉄の虎。高グリップと耐久で攻守に優れるが、ブーストが弱く立ち上がりにもたつく重量級。'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: '義賊ゴローの紫電。重量とトップスピードで直線を制圧。序盤の加速の遅さをどう補うかがカギ。'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: '傭兵ピコの緑色ガチョウ。Aボディで当たりに強く、平均以上のブーストを備える安定志向マシン。'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'キャプテン・ファルコンの青き鷹。クセのない操作性でシリーズの基準機としても知られる万能タイプ。'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '海賊オクトマンの深海クロー。中量級で安定の B/B/C。重めの舵で滑りやすいが直進は素直。'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'アンドロイド Mr.EAD のスター号。紙装甲ながら強力なブーストを搭載したロマン枠、被弾管理が必須。'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ジェームズ率いる傭兵団の小型ワイバーン。軽量で曲がりやすいが耐久が低い、丁寧なライン取りが重要。'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: '荒くれビリーの狂犬号。平均的な性能と程良い重量感で、接触戦もこなす中堅オールラウンダー。'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: '歌姫ケイトの鮮烈ピラニア。軽量で加速に優れ、テクニカルコース向き。壁ヒットには要注意。'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '犯罪者ゾーダの黒き錨。ブースト特化で終盤の爆発力が魅力だが、紙装甲につき被弾は禁物。'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'アイドル的人気を誇る若手レーサーの星のロビン。高いグリップで切り返しが得意だが、ブーストは弱め。'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: '遺伝子改造恐竜バイオ・レックスの猛牙号。高い耐久と A グリップで攻守のバランスに優れる。'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '死神スカルの音速亡霊。軽量で高ブーストだがグリップが低くスライド多発。上級者向け。'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: '元マフィア・ガスターの緑豹。高耐久と強い加速で序盤から押しまくるパワー型。'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'ビーストマンの超速機。高グリップでライン維持がしやすく扱いやすい。'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: '水棲レオンの青魚号。超軽量で旋回性能抜群、接触には弱いタイムアタック志向。'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: '正義のヒーローが乗る王者の隕石。紙装甲だが素直な挙動で初心者も扱いやすい。'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'ミセス・アローの女王隕石。キングと同等性能だがやや軽い操作感で取り回しが良い。'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: '双子エイリアンが同乗する超軽量機。加速最速クラスだが耐久は紙。'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: '老将ニールセンの雷号。加速 A で力強いがグリップ E で滑りやすい玄人好み。'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: '元警官チェインの猛猪。重くて頑丈、押し出しが強いパワータイプ。'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'ブラッド・ファルコンの深紅機。ブースト A で終盤の伸びが凄まじいが制御が難しい。'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'ジョン・タナカの業務用ワスプ。軽量でブースト A。耐久 D ゆえクリーン走行が必須。'
      },
      {
        name: 'MIGHTY TYHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: '怪力宇宙人ドラッグの颶風号。加速 A でコーナーも良好だがトップスピードは平凡。'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'レスラー・ロジャーの暴風号。平均的な性能で重量はあるが装甲薄く壁ドンに弱い。'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'クラッシュ博士の熊号。A ボディでタンク級だがグリップ E。壁当て戦法で真価を発揮。'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: '暗黒帝王ブラックシャドーの黒牛。加速 E だが高耐久と A グリップで最凶クラスの存在感。'
      },

      // GP 専用機体 4 機
      { name: 'DRAGON BIRD',      pilot: 'Rick Wheeler',              specs: { body: 'B', boost: 'B', grip: 'B' }, description: '銀河警察の新鋭機。全性能が平均以上でクセがなく操作しやすい。' },
      { name: 'ELEGANCE LIBERTY', pilot: 'Lucy Liberty',              specs: { body: 'C', boost: 'C', grip: 'A' }, description: '高加速とコーナリングに特化した女性用マシン。最高速は低め。' },
      { name: 'MOON SHADOW',      pilot: 'Misaki Haruka / Miss Killer', specs: { body: 'B', boost: 'C', grip: 'B' }, description: '謎多き暗黒レーサー。バランス型で実戦向きの性能。' },
      { name: 'PANZER EMERALD',   pilot: 'Lisa Brilliant',            specs: { body: 'A', boost: 'C', grip: 'D' }, description: '重装甲＆高重量で体当たりが得意。反面、曲がりは鈍重。' },

      // ■ Climax 専用機体 4 機
      {
        name: 'DRAGON BIRD GT',
        pilot: 'Clank Hughes',
        specs: { body: 'B', boost: 'A', grip: 'B' },
        description: 'ドラゴンバードの強化型。ブースト性能が大幅に向上した上位互換。'
      },
      {
        name: 'RED BULL',
        pilot: 'Berserker',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: '血のような赤い巨体。重量・装甲・最高速のいずれもトップクラス。'
      },
      {
        name: 'HYPER DEATH ANCHOR',
        pilot: 'Hyper Zoda',
        specs: { body: 'B', boost: 'A', grip: 'C' },
        description: 'デスアンカーの暴走形態。加速とブーストが凶悪だが滑りやすい。'
      },
      {
        name: 'SOLDIER ANCHOR',
        pilot: 'Dark Soldier',
        specs: { body: 'D', boost: 'B', grip: 'B' },
        description: '量産仕様のアンカー系。軽量で扱いやすく初心者にも最適。'
      }
    ]
  },
   
  /* ===== F-ZERO 99  (Nintendo Switch Online / 2023) ==================== */
  {
    id: 7,
    title: 'F-ZERO 99',
    leagues: ['Knight', 'Queen', 'King', 'Ace', 'Miranight', 'Miraqueen', 'Miraking', 'Mirace'],
    machines: [
      { name: 'BLUE FALCON',  pilot: 'Captain Falcon', specs: { body: 'B', boost: 'B', grip: 'B' } },
      { name: 'GOLDEN FOX',   pilot: 'Dr. Stewart',    specs: { body: 'C', boost: 'A', grip: 'E' } },
      { name: 'WILD GOOSE',   pilot: 'Pico',           specs: { body: 'A', boost: 'D', grip: 'C' } },
      { name: 'FIRE STINGRAY',pilot: 'Samurai Goroh',  specs: { body: 'B', boost: 'C', grip: 'A' } }
    ]
  },
  /* =============================================================== */
]