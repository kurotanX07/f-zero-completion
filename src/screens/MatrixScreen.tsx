// src/screens/MatrixScreen.tsx の内容
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Info, Camera, User, Car, ArrowDown } from 'lucide-react-native';
import { AdBanner } from '../components/AdBanner';
import { useClearDataStorage } from '../hooks/useStorage';

const rankColors = {
  null: '#4B5563', // gray-600
  1: '#F59E0B', // yellow-500
  2: '#9CA3AF', // gray-400
  3: '#B45309', // yellow-700
  4: '#059669', // green-600
};

export const MatrixScreen = ({ route, navigation }) => {
  const { game, clearData: initialClearData } = route.params;
  const [clearData, setClearData] = useState(initialClearData || {});
  const [showPilotNames, setShowPilotNames] = useState(false);
  const [reverseMode, setReverseMode] = useState(false);
  const { saveClearData } = useClearDataStorage();

  useEffect(() => {
    // 画面が表示されるたびにクリアデータを更新
    const unsubscribe = navigation.addListener('focus', () => {
      // 親画面から渡されたclearDataを使用
      setClearData(route.params.clearData || {});
    });

    return unsubscribe;
  }, [navigation, route.params]);

  // 変更があった場合に保存
  useEffect(() => {
    saveClearData(clearData);
  }, [clearData]);

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const handleCombinationSelect = (machine, league) => {
    navigation.navigate('Detail', { 
      game, 
      machine, 
      league, 
      clearData,
      reverseMode 
    });
  };

  const handleMachineInfoSelect = (machine) => {
    navigation.navigate('MachineInfo', { 
      game, 
      machine 
    });
  };

  const getCurrentRank = (game, machine, league) => {
    const key = `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
    return clearData[key]?.rank || null;
  };

  const hasScreenshot = (game, machine, league) => {
    const key = `${game.id}-${machine.name}-${league}${reverseMode ? '-reverse' : ''}`;
    return clearData[key]?.hasScreenshot || false;
  };

  const toggleNameDisplay = () => {
    setShowPilotNames(!showPilotNames);
  };

  const toggleReverseMode = () => {
    setReverseMode(!reverseMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={goToHome}
          >
            <ArrowLeft size={20} color="#93C5FD" />
            <Text style={styles.backButtonText}>ホームに戻る</Text>
          </TouchableOpacity>
          
          <View style={styles.headerControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleNameDisplay}
            >
              {showPilotNames ? 
                <Car size={14} color="#93C5FD" style={styles.buttonIcon} /> : 
                <User size={14} color="#93C5FD" style={styles.buttonIcon} />
              }
              <Text style={styles.controlButtonText}>
                {showPilotNames ? 'マシン名' : 'パイロット名'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.controlButton,
                reverseMode && styles.activeControlButton
              ]}
              onPress={toggleReverseMode}
            >
              <ArrowDown size={14} color={reverseMode ? 'white' : '#93C5FD'} style={styles.buttonIcon} />
              <Text style={[
                styles.controlButtonText,
                reverseMode && styles.activeButtonText
              ]}>
                リバース{reverseMode ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.title}>{game.title}</Text>
        {reverseMode && (
          <Text style={styles.reverseText}>
            リバースモード: COMマシンを表彰台に立たせる縛りプレイ
          </Text>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        <ScrollView horizontal>
          <View>
            <View style={styles.tableHeader}>
              <View style={styles.tableHeaderCell} />
              {game.leagues.map(league => (
                <View key={league} style={styles.tableHeaderCell}>
                  <Text style={styles.tableHeaderText}>{league}</Text>
                </View>
              ))}
            </View>
            
            {game.machines.map(machine => (
              <View key={machine.name} style={styles.tableRow}>
                <TouchableOpacity 
                  style={styles.tableMachineCell}
                  onPress={() => handleMachineInfoSelect(machine)}
                >
                  <View style={styles.machineNameContainer}>
                    <Text style={styles.machineNameText} numberOfLines={1}>
                      {showPilotNames ? machine.pilot : machine.name}
                    </Text>
                    <Info size={12} color="#60A5FA" />
                  </View>
                </TouchableOpacity>
                
                {game.leagues.map(league => {
                  const rank = getCurrentRank(game, machine, league);
                  const hasImage = hasScreenshot(game, machine, league);
                  
                  return (
                    <TouchableOpacity
                      key={league}
                      style={[
                        styles.tableCell,
                        rank !== null && { backgroundColor: rankColors[rank] }
                      ]}
                      onPress={() => handleCombinationSelect(machine, league)}
                    >
                      <View style={styles.cellContent}>
                        {rank !== null ? (
                          <Text style={styles.rankText}>
                            {rank === 4 ? '入賞' : `${rank}位`}
                          </Text>
                        ) : (
                          <View style={styles.notClearedDot} />
                        )}
                        
                        {hasImage && (
                          <Camera size={12} color="#60A5FA" style={styles.cameraIcon} />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
      
      <AdBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // gray-900
  },
  header: {
    padding: 16,
    backgroundColor: '#1E3A8A', // blue-900
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#93C5FD', // blue-300
    marginLeft: 4,
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeControlButton: {
    backgroundColor: '#B91C1C', // red-800
  },
  buttonIcon: {
    marginRight: 4,
  },
  controlButtonText: {
    color: '#93C5FD', // blue-300
    fontSize: 12,
  },
  activeButtonText: {
    color: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  reverseText: {
    fontSize: 12,
    color: '#FCA5A5', // red-300
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#374151', // gray-700
  },
  tableHeaderCell: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderText: {
    color: '#D1D5DB', // gray-300
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#374151', // gray-700
  },
  tableMachineCell: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderColor: '#374151', // gray-700
    justifyContent: 'center',
  },
  machineNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  machineNameText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 4,
  },
  tableCell: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#374151', // gray-700
  },
  cellContent: {
    alignItems: 'center',
  },
  rankText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notClearedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4B5563', // gray-600
  },
  cameraIcon: {
    marginTop: 4,
  },
});

export default MatrixScreen;