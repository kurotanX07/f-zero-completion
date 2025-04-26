import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '../src/components/Header';
import { gameData } from '../src/data/gameData';
import { AdBanner } from '../src/components/AdBanner';
import { Game, Machine } from '../src/types';

export default function MachineInfoScreen() {
  const params = useLocalSearchParams<{ gameId: string; machineName: string }>();
  const router = useRouter();
  
  const gameId = parseInt(params.gameId || '1', 10);
  const machineName = decodeURIComponent(params.machineName || '');
  
  const game = gameData.find(g => g.id === gameId) || gameData[0];
  const machine = game.machines.find(m => m.name === machineName) || game.machines[0];

  const handleBackPress = () => {
    router.push({
      pathname: '/matrix',
      params: { gameId: game.id.toString() }
    });
  };

  // マシンのスペックを視覚的に表示するためのヘルパー関数
  const renderSpecBar = (value: string) => {
    let percentage = 0;
    
    switch (value) {
      case 'S': percentage = 100; break;
      case 'A': percentage = 80; break;
      case 'B': percentage = 60; break;
      case 'C': percentage = 40; break;
      case 'D': percentage = 20; break;
      default: percentage = 0;
    }
    
    return (
      <View style={styles.specBarContainer}>
        <View style={[styles.specBar, { width: `${percentage}%` }]} />
      </View>
    );
  };

  // スペックの評価を色で表示
  const getSpecColor = (value: string) => {
    switch (value) {
      case 'S': return '#059669'; // green-600
      case 'A': return '#2563EB'; // blue-600
      case 'B': return '#7C3AED'; // violet-600
      case 'C': return '#F59E0B'; // amber-500
      case 'D': return '#B91C1C'; // red-700
      default: return '#4B5563'; // gray-600
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title={machine.name}
        subtitle={`パイロット: ${machine.pilot}`}
        showBackButton
        onBackPress={handleBackPress}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.machineImageContainer}>
          {/* マシン画像があれば表示（今回は仮のプレースホルダー） */}
          <View style={styles.machinePlaceholder}>
            <Text style={styles.machinePlaceholderText}>{machine.name}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本情報</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>マシン名</Text>
              <Text style={styles.infoValue}>{machine.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>パイロット</Text>
              <Text style={styles.infoValue}>{machine.pilot}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ゲーム</Text>
              <Text style={styles.infoValue}>{game.title}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>マシンスペック</Text>
          <View style={styles.specContainer}>
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>加速力</Text>
              <View style={styles.specValueContainer}>
                <Text style={[styles.specValue, { color: getSpecColor(machine.specs.boost) }]}>
                  {machine.specs.boost}
                </Text>
                {renderSpecBar(machine.specs.boost)}
              </View>
            </View>
            
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>耐久性</Text>
              <View style={styles.specValueContainer}>
                <Text style={[styles.specValue, { color: getSpecColor(machine.specs.body) }]}>
                  {machine.specs.body}
                </Text>
                {renderSpecBar(machine.specs.body)}
              </View>
            </View>
            
            <View style={styles.specRow}>
              <Text style={styles.specLabel}>グリップ</Text>
              <View style={styles.specValueContainer}>
                <Text style={[styles.specValue, { color: getSpecColor(machine.specs.grip) }]}>
                  {machine.specs.grip}
                </Text>
                {renderSpecBar(machine.specs.grip)}
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>説明</Text>
          <Text style={styles.description}>{machine.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>おすすめコース</Text>
          <Text style={styles.recommendedText}>
            {machine.specs.boost === 'A' || machine.specs.boost === 'S' 
              ? '加速力が高いため、コーナーが多いコースが有利です。'
              : machine.specs.grip === 'A' || machine.specs.grip === 'S'
              ? 'グリップ力が高いため、曲がりくねったコースが得意です。'
              : machine.specs.body === 'A' || machine.specs.body === 'S'
              ? '耐久性が高いため、激しい接触が予想されるコースでも安心です。'
              : 'バランスの取れたマシンなので、幅広いコースに対応できます。'
            }
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>プレイスタイル</Text>
          <Text style={styles.recommendedText}>
            {machine.specs.boost === 'A' || machine.specs.boost === 'S' 
              ? '加速に優れているため、コーナーからの立ち上がりを重視したプレイスタイルが効果的です。'
              : machine.specs.grip === 'A' || machine.specs.grip === 'S'
              ? 'グリップ力が高いので、コーナーでの減速を最小限に抑えることができます。'
              : machine.specs.body === 'A' || machine.specs.body === 'S'
              ? '耐久性に優れているため、他のマシンとの接触を恐れず攻めたプレイが可能です。'
              : 'バランスの取れたマシンなので、オールラウンドなプレイスタイルが合っています。'
            }
          </Text>
        </View>
      </ScrollView>
      
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // gray-900
  },
  content: {
    flex: 1,
    padding: 16,
  },
  machineImageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  machinePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#1E40AF', // blue-800
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  machinePlaceholderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    color: '#D1D5DB', // gray-300
    fontSize: 14,
  },
  infoValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  specContainer: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 16,
  },
  specRow: {
    marginBottom: 16,
  },
  specLabel: {
    color: '#D1D5DB', // gray-300
    fontSize: 14,
    marginBottom: 4,
  },
  specValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  specBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#374151', // gray-700
    borderRadius: 4,
    overflow: 'hidden',
  },
  specBar: {
    height: '100%',
    backgroundColor: '#3B82F6', // blue-500
  },
  description: {
    color: '#D1D5DB', // gray-300
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 16,
  },
  recommendedText: {
    color: '#D1D5DB', // gray-300
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 8,
    padding: 16,
  },
});