// __tests__/storage.test.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useClearDataStorage } from '../src/hooks/useStorage';

// AsyncStorageのモック
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useClearDataStorage', () => {
  const { loadClearData, saveClearData, clearAllData } = useClearDataStorage();
  
  beforeEach(() => {
    // 各テスト前にモックをクリア
    jest.clearAllMocks();
  });
  
  describe('loadClearData', () => {
    test('データが存在する場合、正しくパースして返す', async () => {
      // モックの戻り値を設定
      const mockData = { '1-BLUE FALCON-ナイト': { rank: 1, hasScreenshot: false } };
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockData));
      
      // 関数を実行
      const result = await loadClearData();
      
      // 検証
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('clearData');
      expect(result).toEqual(mockData);
    });
    
    test('データが存在しない場合、空のオブジェクトを返す', async () => {
      // nullを返すように設定
      AsyncStorage.getItem.mockResolvedValue(null);
      
      // 関数を実行
      const result = await loadClearData();
      
      // 検証
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('clearData');
      expect(result).toEqual({});
    });
    
    test('JSONパースに失敗した場合でも、空のオブジェクトを返す', async () => {
      // 無効なJSONを返すように設定
      AsyncStorage.getItem.mockResolvedValue('無効なJSON');
      
      // 関数を実行
      const result = await loadClearData();
      
      // 検証
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('clearData');
      expect(result).toEqual({});
    });
    
    test('AsyncStorageがエラーを投げた場合、エラーを処理する', async () => {
      // エラーを投げるように設定
      AsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));
      
      // 関数を実行して例外をキャッチ
      try {
        await loadClearData();
        fail('エラーがスローされるべき');
      } catch (error) {
        // 検証
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('clearData');
        expect(error.type).toBe('load');
        expect(error.message).toContain('クリアデータの読み込みに失敗');
      }
    });
  });
  
  describe('saveClearData', () => {
    test('有効なデータが正しく保存される', async () => {
      // テストデータ
      const testData = { '1-BLUE FALCON-ナイト': { rank: 1, hasScreenshot: false } };
      
      // 関数を実行
      await saveClearData(testData);
      
      // 検証
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('clearData', JSON.stringify(testData));
    });
    
    test('無効なデータ形式はエラーになる', async () => {
      // 無効なデータ
      const invalidData = 'string' as any;
      
      // 関数を実行して例外をキャッチ
      try {
        await saveClearData(invalidData);
        fail('エラーがスローされるべき');
      } catch (error) {
        // 検証
        expect(error.message).toContain('無効なクリアデータ形式');
        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      }
    });
    
    test('AsyncStorageがエラーを投げた場合、エラーを処理する', async () => {
      // エラーを投げるように設定
      AsyncStorage.setItem.mockRejectedValue(new Error('Storage error'));
      
      // テストデータ
      const testData = { '1-BLUE FALCON-ナイト': { rank: 1, hasScreenshot: false } };
      
      // 関数を実行して例外をキャッチ
      try {
        await saveClearData(testData);
        fail('エラーがスローされるべき');
      } catch (error) {
        // 検証
        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(error.type).toBe('save');
        expect(error.message).toContain('クリアデータの保存に失敗');
      }
    });
  });
  
  describe('clearAllData', () => {
    test('データが正しく削除される', async () => {
      // 関数を実行
      await clearAllData();
      
      // 検証
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('clearData');
    });
    
    test('AsyncStorageがエラーを投げた場合、エラーを処理する', async () => {
      // エラーを投げるように設定
      AsyncStorage.removeItem.mockRejectedValue(new Error('Storage error'));
      
      // 関数を実行して例外をキャッチ
      try {
        await clearAllData();
        fail('エラーがスローされるべき');
      } catch (error) {
        // 検証
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('clearData');
        expect(error.type).toBe('delete');
        expect(error.message).toContain('クリアデータの削除に失敗');
      }
    });
  });
});