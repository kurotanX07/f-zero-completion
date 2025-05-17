import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES, LanguageCode } from '../i18n/translations';
import { Globe } from 'lucide-react-native';

interface LanguageSelectionModalProps {
  visible: boolean;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({ visible }) => {
  const { setLanguage, setFirstLaunchCompleted } = useLanguage();

  const handleLanguageSelect = async (language: LanguageCode) => {
    await setLanguage(language);
    await setFirstLaunchCompleted();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Globe size={60} color="#60A5FA" />
          </View>
          
          <Text style={styles.title}>F-ZERO Completion Tracker</Text>
          
          <Text style={styles.subtitle}>
            言語を選択してください{'\n'}
            Please select your language
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('ja')}
            >
              <Text style={styles.languageButtonText}>日本語</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageSelect('en')}
            >
              <Text style={styles.languageButtonText}>English</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // dark background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF', // gray-400
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  languageButton: {
    backgroundColor: '#1E3A8A', // blue-900
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  languageButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 