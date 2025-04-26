// src/hooks/useScreenshot.ts の改善版
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export interface ScreenshotError extends Error {
  type: 'permission' | 'camera' | 'picker' | 'directory' | 'file';
  originalError?: any;
}

export const useScreenshot = () => {
  /**
   * スクリーンショットディレクトリの初期化を確認して作成
   * @returns Promise<void>
   * @throws ScreenshotError ディレクトリの作成に失敗した場合
   */
  const ensureScreenshotDirectory = async (): Promise<void> => {
    try {
      const dirPath = `${FileSystem.documentDirectory}screenshots`;
      const dirInfo = await FileSystem.getInfoAsync(dirPath);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dirPath);
      }
    } catch (error) {
      console.error('Failed to create screenshots directory', error);
      
      const customError = new Error('スクリーンショットディレクトリの作成に失敗しました') as ScreenshotError;
      customError.type = 'directory';
      customError.originalError = error;
      throw customError;
    }
  };

  /**
   * カメラを使用してスクリーンショットを撮影
   * @returns Promise<string | null> 撮影した画像のURI、またはキャンセル時にnull
   * @throws ScreenshotError カメラ関連のエラーが発生した場合
   */
  const takeScreenshot = async (): Promise<string | null> => {
    try {
      // カメラのパーミッション確認
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        const error = new Error('カメラへのアクセス許可が必要です') as ScreenshotError;
        error.type = 'permission';
        throw error;
      }
      
      // カメラの起動
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      // キャンセルされた場合
      if (result.canceled) return null;
      
      // スクリーンショットディレクトリの確認
      await ensureScreenshotDirectory();
      
      // ファイル名の生成とパスの設定
      const fileName = `screenshot_${new Date().getTime()}.jpg`;
      const newUri = `${FileSystem.documentDirectory}screenshots/${fileName}`;
      
      // ファイルのコピー
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newUri
      });
      
      return newUri;
    } catch (error) {
      // すでにScreenshotErrorタイプの場合はそのまま再スロー
      if ((error as ScreenshotError).type) {
        throw error;
      }
      
      // それ以外の一般的なエラーはカメラエラーとして包む
      console.error('Camera error:', error);
      
      const customError = new Error('スクリーンショット撮影中にエラーが発生しました') as ScreenshotError;
      customError.type = 'camera';
      customError.originalError = error;
      throw customError;
    }
  };
  
  /**
   * ライブラリから画像を選択
   * @returns Promise<string | null> 選択した画像のURI、またはキャンセル時にnull
   * @throws ScreenshotError 画像選択関連のエラーが発生した場合
   */
  const pickScreenshot = async (): Promise<string | null> => {
    try {
      // メディアライブラリのパーミッション確認
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        const error = new Error('写真へのアクセス許可が必要です') as ScreenshotError;
        error.type = 'permission';
        throw error;
      }
      
      // イメージピッカーの起動
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      // キャンセルされた場合
      if (result.canceled) return null;
      
      // スクリーンショットディレクトリの確認
      await ensureScreenshotDirectory();
      
      // ファイル名の生成とパスの設定
      const fileName = `screenshot_${new Date().getTime()}.jpg`;
      const newUri = `${FileSystem.documentDirectory}screenshots/${fileName}`;
      
      // ファイルのコピー
      await FileSystem.copyAsync({
        from: result.assets[0].uri,
        to: newUri
      });
      
      return newUri;
    } catch (error) {
      // すでにScreenshotErrorタイプの場合はそのまま再スロー
      if ((error as ScreenshotError).type) {
        throw error;
      }
      
      // それ以外の一般的なエラーはピッカーエラーとして包む
      console.error('Photo picker error:', error);
      
      const customError = new Error('画像選択中にエラーが発生しました') as ScreenshotError;
      customError.type = 'picker';
      customError.originalError = error;
      throw customError;
    }
  };

  /**
   * 指定されたURIのスクリーンショットを削除
   * @param uri 削除するスクリーンショットのURI
   * @returns Promise<boolean> 削除成功時はtrue
   */
  const deleteScreenshot = async (uri: string): Promise<boolean> => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(uri);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('File deletion error:', error);
      
      const customError = new Error('スクリーンショットの削除中にエラーが発生しました') as ScreenshotError;
      customError.type = 'file';
      customError.originalError = error;
      throw customError;
    }
  };
  
  return { 
    takeScreenshot, 
    pickScreenshot,
    deleteScreenshot
  };
};