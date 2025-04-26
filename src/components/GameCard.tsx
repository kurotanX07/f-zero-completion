import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { Game } from '../types';
import { GameAchievement } from '../utils/achievements';
import { ProgressBar } from './ProgressBar';

interface GameCardProps {
  /**
   * ゲーム情報
   */
  game: Game;
  
  /**
   * 達成度情報
   */
  achievement: GameAchievement;
  
  /**
   * タップ時のコールバック
   */
  onPress: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, achievement, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.info}>
          {game.leagues.length}リーグ / {game.machines.length}マシン
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.rankRow}>
          <View style={styles.rankIcon}>
            <Trophy size={14} color="#F59E0B" />
            <Text style={styles.rankText}>1位</Text>
          </View>
          <View style={styles.progressWrapper}>
            <ProgressBar 
              percentage={achievement.rank1Percentage} 
              color="#F59E0B" // amber-500
              height={6}
            />
            <Text style={styles.percentageText}>
              {Math.round(achievement.rank1Percentage)}% ({achievement.rank1Count}/{achievement.totalCourseCount})
            </Text>
          </View>
        </View>
        
        <View style={styles.rankRow}>
          <View style={styles.rankIcon}>
            <Trophy size={14} color="#9CA3AF" />
            <Text style={styles.rankText}>2位+</Text>
          </View>
          <View style={styles.progressWrapper}>
            <ProgressBar 
              percentage={achievement.rank2Percentage} 
              color="#9CA3AF" // gray-400
              height={6}
            />
            <Text style={styles.percentageText}>
              {Math.round(achievement.rank2Percentage)}% ({achievement.rank2Count}/{achievement.totalCourseCount})
            </Text>
          </View>
        </View>
        
        <View style={styles.rankRow}>
          <View style={styles.rankIcon}>
            <Trophy size={14} color="#B45309" />
            <Text style={styles.rankText}>3位+</Text>
          </View>
          <View style={styles.progressWrapper}>
            <ProgressBar 
              percentage={achievement.rank3Percentage} 
              color="#B45309" // amber-700
              height={6}
            />
            <Text style={styles.percentageText}>
              {Math.round(achievement.rank3Percentage)}% ({achievement.rank3Count}/{achievement.totalCourseCount})
            </Text>
          </View>
        </View>
        
        <View style={styles.rankRow}>
          <View style={styles.rankIcon}>
            <Trophy size={14} color="#059669" />
            <Text style={styles.rankText}>クリア</Text>
          </View>
          <View style={styles.progressWrapper}>
            <ProgressBar 
              percentage={achievement.rankAllPercentage} 
              color="#059669" // green-600
              height={6}
            />
            <Text style={styles.percentageText}>
              {Math.round(achievement.rankAllPercentage)}% ({achievement.totalClearCount}/{achievement.totalCourseCount})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    marginRight: 8,
  },
  rankText: {
    color: '#D1D5DB', // gray-300
    fontSize: 12,
    marginLeft: 4,
  },
  progressWrapper: {
    flex: 1,
  },
  percentageText: {
    color: '#D1D5DB', // gray-300
    fontSize: 10,
    marginTop: 2,
    textAlign: 'right',
  }
});