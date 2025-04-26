// src/hooks/useScreenshot.ts の内容
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export const useScreenshot = () => {
  const takeScreenshot = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('カメラへのアクセス許可が必要です');
      return null;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    
    if (result.canceled) return null;
    
    const fileName = `screenshot_${new Date().getTime()}.jpg`;
    const newUri = `${FileSystem.documentDirectory}screenshots/${fileName}`;
    
    const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}screenshots`);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}screenshots`);
    }
    
    await FileSystem.copyAsync({
      from: result.assets[0].uri,
      to: newUri
    });
    
    return newUri;
  };
  
  const pickScreenshot = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('写真へのアクセス許可が必要です');
      return null;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    
    if (result.canceled) return null;
    
    const fileName = `screenshot_${new Date().getTime()}.jpg`;
    const newUri = `${FileSystem.documentDirectory}screenshots/${fileName}`;
    
    const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}screenshots`);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}screenshots`);
    }
    
    await FileSystem.copyAsync({
      from: result.assets[0].uri,
      to: newUri
    });
    
    return newUri;
  };
  
  return { takeScreenshot, pickScreenshot };
};