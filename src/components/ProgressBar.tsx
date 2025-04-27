import React, { memo } from 'react';
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

// Using memo to prevent unnecessary re-renders
const ProgressBar: React.FC<ProgressBarProps> = memo(({
  percentage,
  height = 8,
  color = '#3B82F6', // デフォルトはblue-500
  showLabel = false,
  label
}) => {
  // パーセンテージが0-100の範囲内に収まるようにする
  const safePercentage = Math.max(0, Math.min(100, percentage));
  
  // Round percentage to avoid tiny rendering changes
  const roundedPercentage = Math.round(safePercentage);
  
  return (
    <View style={styles.container}>
      <View style={[styles.baseBar, { height }]}>
        {roundedPercentage > 0 && (
          <View 
            style={{
              width: `${roundedPercentage}%`,
              height,
              backgroundColor: color,
              borderRadius: 4,
              position: 'absolute',
              left: 0,
              top: 0,
            }} 
          />
        )}
      </View>
      
      {showLabel && (
        <Text style={styles.label}>
          {label || `${roundedPercentage}%`}
        </Text>
      )}
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  // Only re-render if rounded percentage or colors change
  return (
    Math.round(prevProps.percentage) === Math.round(nextProps.percentage) &&
    prevProps.color === nextProps.color &&
    prevProps.height === nextProps.height
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  baseBar: {
    width: '100%',
    backgroundColor: '#374151', // gray-700
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  label: {
    color: '#D1D5DB', // gray-300
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  }
});

// Export with memo applied
export { ProgressBar };