import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdBanner } from '../src/components/AdBanner';
import { useClearDataStorage } from '../src/hooks/useStorage';
import { ClearData, Game } from '../src/types';
import { calculateGameAchievement } from '../src/utils/achievements';
import { i18n } from '../src/i18n/translations';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { getGameDataByLanguage } from '../src/data';

// ゲーム達成度の型定義
type GameAchievement = {
  rank1Count: number;
  rank2Count: number;
  rank3Count: number;
  totalCount: number;
};

// シンプルな進捗バーコンポーネント（直接定義）
const SimpleProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
  <View style={{ width: '100%', height: 6, backgroundColor: '#374151', borderRadius: 4, overflow: 'hidden' }}>
    <View style={{ 
      width: `${Math.max(0, Math.min(100, percentage))}%`, 
      height: 6, 
      backgroundColor: color,
      borderRadius: 4
    }} />
  </View>
);

// ゲームカードコンポーネント（直接定義）
const SimpleGameCard = ({ 
  game, 
  achievement,
  onPress,
  theme 
}: { 
  game: Game; 
  achievement: GameAchievement;
  onPress: () => void;
  theme: any;
}) => {
  // Calculate percentages
  const rank1Percentage = achievement.totalCount > 0 
    ? (achievement.rank1Count / achievement.totalCount) * 100 
    : 0;
  
  const rank2Percentage = achievement.totalCount > 0 
    ? (achievement.rank2Count / achievement.totalCount) * 100 
    : 0;
  
  const rank3Percentage = achievement.totalCount > 0 
    ? (achievement.rank3Count / achievement.totalCount) * 100 
    : 0;

  // コンポーネント内でスタイルを作成
  const cardStyles = createStyles(theme);

  return (
    <TouchableOpacity
      style={cardStyles.gameCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={{ flex: 2 }}>
        <Text style={cardStyles.gameTitle}>{game.title}</Text>
        <Text style={cardStyles.gameInfo}>
          {game.leagues.length}{i18n.t('home.league')} / {game.machines.length}{i18n.t('home.machine')}
        </Text>
      </View>
      
      <View style={{ flex: 3, marginLeft: 8 }}>
        {/* 1st Place Progress */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: theme.rankGold, fontSize: 12, width: 40 }}>{i18n.t('home.firstPlace')}:</Text>
          <View style={{ flex: 1, marginRight: 4 }}>
            <SimpleProgressBar percentage={rank1Percentage} color={theme.rankGold} />
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 10 }}>
            {Math.round(rank1Percentage)}% ({achievement.rank1Count}/{achievement.totalCount})
          </Text>
        </View>
        
        {/* 2nd Place Progress */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: theme.rankSilver, fontSize: 12, width: 40 }}>{i18n.t('home.secondPlace')}:</Text>
          <View style={{ flex: 1, marginRight: 4 }}>
            <SimpleProgressBar percentage={rank2Percentage} color={theme.rankSilver} />
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 10 }}>
            {Math.round(rank2Percentage)}% ({achievement.rank2Count}/{achievement.totalCount})
          </Text>
        </View>
        
        {/* 3rd Place Progress */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: theme.rankBronze, fontSize: 12, width: 40 }}>{i18n.t('home.thirdPlace')}:</Text>
          <View style={{ flex: 1, marginRight: 4 }}>
            <SimpleProgressBar percentage={rank3Percentage} color={theme.rankBronze} />
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 10 }}>
            {Math.round(rank3Percentage)}% ({achievement.rank3Count}/{achievement.totalCount})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loadClearData } = useClearDataStorage();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [clearData, setClearData] = useState<ClearData>({});
  const [localGameData, setLocalGameData] = useState<Game[]>([]);
  
  // ゲームごとの達成度データ
  const [gameAchievements, setGameAchievements] = useState<Record<number, GameAchievement>>({});
  
  // テーマに基づいたスタイルを生成
  const styles = createStyles(theme);

  // 言語が変更されたときにゲームデータを更新
  useEffect(() => {
    setLocalGameData(getGameDataByLanguage(language));
  }, [language]);

  useEffect(() => {
    // データ読み込みと同時に各ゲームの達成度を計算
    const loadData = async () => {
      try {
        const data = await loadClearData();
        setClearData(data);
        
        // 各ゲームの達成度を計算
        const achievements: Record<number, GameAchievement> = {};
        
        localGameData.forEach(game => {
          // リバースモードを含めずに達成度を計算
          const achievement = calculateGameAchievement(game, data, false);
          
          achievements[game.id] = {
            rank1Count: achievement.rank1Count,
            rank2Count: achievement.rank2Count,
            rank3Count: achievement.rank3Count,
            totalCount: achievement.totalCourseCount
          };
        });
        
        setGameAchievements(achievements);
        
      } catch (error) {
        console.error("Failed to load data:", error);
        setClearData({});
      }
    };
    
    if (localGameData.length > 0) {
      loadData();
    }
  }, [localGameData]);

  const handleGameSelect = (game: Game) => {
    router.push({
      pathname: '/matrix',
      params: { gameId: game.id.toString() }
    });
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        { paddingTop: insets.top > 0 ? insets.top : 12 } // 上部パディングを縮小
      ]}>
        <Text style={styles.title}>{i18n.t('home.title')}</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={handleSettingsPress}
          activeOpacity={0.7}
        >
          <Settings size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{i18n.t('home.selectGame')}</Text>
        <FlatList
          data={localGameData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const achievement = gameAchievements[item.id] || { 
              rank1Count: 0, 
              rank2Count: 0,
              rank3Count: 0,
              totalCount: item.machines.length * item.leagues.length
            };
            
            return (
              <SimpleGameCard
                game={item}
                achievement={achievement}
                onPress={() => handleGameSelect(item)}
                theme={theme}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }} // 広告のためのスペースを確保
        />
      </View>
      
      <AdBanner sticky={true} /> {/* 広告を固定表示に変更 */}
    </View>
  );
}

// スタイルはテーマに応じて生成
const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 10, // 余白を小さく
    paddingHorizontal: 12,
    backgroundColor: theme.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 中央揃えに変更
    position: 'relative', // 相対配置に変更
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  settingsButton: {
    padding: 6, // タッチ領域を適度に
    position: 'absolute', // 絶対配置に変更
    right: 12, // 右端からの距離
    top: '50%', // 上端からの距離
    transform: [{ translateY: -12 }], // 垂直方向の中央揃え調整
  },
  content: {
    flex: 1,
    padding: 10, // 余白を小さく
    paddingTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.accent,
    marginBottom: 10, // 下部マージンを小さく
  },
  gameCard: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: 12, // パディングを小さく
    marginBottom: 12, // 下部マージンを小さく
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  gameInfo: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 4,
  },
});