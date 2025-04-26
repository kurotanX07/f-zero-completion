import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  /**
   * 達成率（0〜100の数値）
   */
  percentage: number;
  
  /**
   * プログレスバーの高さ
   */
  height?: number;
  
  /**
   * プログレスバーの色
   */
  color?: string;
  
  /**
   * ラベルを表示するかどうか
   */
  showLabel?: boolean;
  
  /**
   * ラベルのカスタムテキスト（指定しない場合は％表示）
   */
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  height = 8,
  color = '#3B82F6', // デフォルトはblue-500
  showLabel = false,
  label
}) => {
  // パーセンテージが0-100の範囲内に収まるようにする
  const safePercentage = Math.max(0, Math.min(100, percentage));
  
  return (
    <View style={styles.container}>
      <View style={[styles.baseBar, { height }]}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${safePercentage}%`,
              height,
              backgroundColor: color
            }
          ]} 
        />
      </View>
      
      {showLabel && (
        <Text style={styles.label}>
          {label || `${Math.round(safePercentage)}%`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  baseBar: {
    width: '100%',
    backgroundColor: '#374151', // gray-700
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 4,
  },
  label: {
    color: '#D1D5DB', // gray-300
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  }
});