import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, FlatList, Switch, ActivityIndicator } from 'react-native';
import { Download, Upload, ArrowLeft, Globe, Check, Moon, Sun, ShieldCheck, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdBanner } from '../src/components/AdBanner';
import { useClearDataStorage } from '../src/hooks/useStorage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ClearData } from '../src/types';
import { gameData } from '../src/data/gameData';
import { calculateGameAchievement } from '../src/utils/achievements';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { useSubscription } from '../src/contexts/SubscriptionContext';
import { LANGUAGES, LanguageCode } from '../src/i18n/translations';
import { i18n } from '../src/i18n/translations';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { loadClearData, saveClearData } = useClearDataStorage();
  const [clearData, setClearData] = useState<ClearData>({});
  const { language, setLanguage } = useLanguage();
  const { theme, themeMode, toggleTheme } = useTheme();
  const { isSubscribed, loading, purchaseSubscription, restorePurchases } = useSubscription();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadClearData();
        setClearData(data);
      } catch (error) {
        console.error("Failed to load data:", error);
        setClearData({});
      }
    };
    
    loadData();
  }, []);

  const handleBackupData = async () => {
    try {
      const success = await createAndShareBackup();
      if (success) {
        Alert.alert(i18n.t('common.success'), i18n.t('settings.backupSuccess'));
      } else {
        Alert.alert(i18n.t('common.error'), i18n.t('settings.backupError'));
      }
    } catch (error) {
      console.error('Backup error:', error);
      Alert.alert(i18n.t('common.error'), i18n.t('settings.backupProcessError'));
    }
  };

  const handleRestoreData = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;
      
      const fileUri = result.assets[0].uri;
      const content = await FileSystem.readAsStringAsync(fileUri);
      const parsedData = JSON.parse(content);
      
      await saveClearData(parsedData);
      setClearData(parsedData);
      
      Alert.alert(i18n.t('common.success'), i18n.t('settings.restoreSuccess'));
    } catch (error) {
      console.error('Restore error:', error);
      Alert.alert(i18n.t('common.error'), i18n.t('settings.restoreError'));
    }
  };

  const createAndShareBackup = async () => {
    try {
      const data = JSON.stringify(clearData);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileUri = `${FileSystem.documentDirectory}fzero_backup_${timestamp}.json`;
      
      await FileSystem.writeAsStringAsync(fileUri, data);
      await Sharing.shareAsync(fileUri);
      return true;
    } catch (error) {
      console.error("Backup error:", error);
      return false;
    }
  };

  const handleLanguageSelect = async (langCode: LanguageCode) => {
    await setLanguage(langCode);
    setIsLanguageModalVisible(false);
  };

  const handleSubscribe = async () => {
    try {
      await purchaseSubscription();
      Alert.alert(
        'サブスクリプション完了',
        'サブスクリプションの購入が完了しました。これからは広告が表示されなくなります。'
      );
    } catch (error) {
      console.error('Subscription error:', error);
      Alert.alert(
        'エラー',
        '購入処理中にエラーが発生しました。しばらくしてからもう一度お試しください。'
      );
    }
  };

  const handleRestorePurchases = async () => {
    try {
      await restorePurchases();
      Alert.alert(
        '購入の復元',
        '購入の復元処理が完了しました。'
      );
    } catch (error) {
      console.error('Restore purchase error:', error);
      Alert.alert(
        'エラー',
        '購入の復元中にエラーが発生しました。'
      );
    }
  };

  const renderLanguageItem = ({ item }: { item: [LanguageCode, string] }) => {
    const [code, name] = item;
    return (
      <TouchableOpacity
        style={styles.languageItem}
        onPress={() => handleLanguageSelect(code)}
        activeOpacity={0.7}
      >
        <Text style={styles.languageName}>{name}</Text>
        {language === code && <Check size={20} color="#60A5FA" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.header,
        { paddingTop: insets.top > 0 ? insets.top : 16 }
      ]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t('settings.title')}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        {/* サブスクリプションセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>サブスクリプション</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>プレミアム機能</Text>
            <Text style={styles.cardDescription}>
              月額100円でアプリ内の広告が非表示になります。
            </Text>
            
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#60A5FA" />
                <Text style={styles.loadingText}>読み込み中...</Text>
              </View>
            ) : isSubscribed ? (
              <View style={styles.subscriptionActive}>
                <ShieldCheck size={20} color="#10B981" style={{ marginRight: 8 }} />
                <Text style={styles.subscriptionActiveText}>サブスクリプション有効</Text>
              </View>
            ) : (
              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleSubscribe}
                  activeOpacity={0.7}
                >
                  <CreditCard size={16} color="white" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>サブスクリプション登録 (月額100円)</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: '#374151' }]}
                  onPress={handleRestorePurchases}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>購入を復元</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        
        {/* テーマ設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('common.switchTheme')}</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('settings.appearance')}</Text>
            <Text style={styles.cardDescription}>
              {i18n.t('settings.themeDescription')}
            </Text>
            <View style={styles.themeSelector}>
              {themeMode === 'dark' ? (
                <Moon size={20} color="white" style={{ marginRight: 8 }} />
              ) : (
                <Sun size={20} color="white" style={{ marginRight: 8 }} />
              )}
              <Text style={styles.themeSelectorText}>
                {themeMode === 'dark' ? i18n.t('common.darkTheme') : i18n.t('common.lightTheme')}
              </Text>
              <Switch
                value={themeMode === 'light'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#374151', true: '#1E3A8A' }}
                thumbColor={themeMode === 'light' ? '#60A5FA' : '#D1D5DB'}
                style={{ marginLeft: 'auto' }}
              />
            </View>
          </View>
        </View>
        
        {/* 言語設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.language')}</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('settings.selectLanguage')}</Text>
            <Text style={styles.cardDescription}>
              {i18n.t('settings.languageDescription')}
            </Text>
            <TouchableOpacity
              style={styles.languageSelector}
              onPress={() => setIsLanguageModalVisible(true)}
              activeOpacity={0.7}
            >
              <Globe size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={styles.languageSelectorText}>
                {LANGUAGES[language]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* データ管理セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('settings.dataManagement')}</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t('settings.backupRestore')}</Text>
            <Text style={styles.cardDescription}>
              {i18n.t('settings.backupDescription')}
            </Text>
            
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={styles.button}
                onPress={handleBackupData}
                activeOpacity={0.7}
              >
                <Download size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>{i18n.t('settings.backupData')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={handleRestoreData}
                activeOpacity={0.7}
              >
                <Upload size={16} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>{i18n.t('settings.restoreData')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* 言語選択モーダル */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('settings.selectLanguage')}</Text>
            <FlatList
              data={Object.entries(LANGUAGES) as [LanguageCode, string][]}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item[0]}
              style={styles.languageList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsLanguageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{i18n.t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // gray-900
  },
  header: {
    padding: 16,
    backgroundColor: '#1E3A8A', // blue-900
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA', // blue-400
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#D1D5DB', // gray-300
    marginBottom: 16,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: '#4338CA', // indigo-700
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    color: 'white',
  },
  subscriptionActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#065F46', // green-800
    padding: 14,
    borderRadius: 8,
  },
  subscriptionActiveText: {
    color: 'white',
    fontWeight: '500',
  },
  languageSelector: {
    backgroundColor: '#374151', // gray-700
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelectorText: {
    color: 'white',
    fontWeight: '500',
  },
  themeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151', // gray-700
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  themeSelectorText: {
    color: 'white',
    fontWeight: '500',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1F2937', // gray-800
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageList: {
    maxHeight: 200,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151', // gray-700
  },
  languageName: {
    fontSize: 16,
    color: 'white',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#374151', // gray-700
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '500',
  },
}); 