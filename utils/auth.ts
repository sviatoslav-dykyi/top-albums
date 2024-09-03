import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthData = async (value: string) => {
  try {
    await AsyncStorage.setItem('auth', value);
  } catch (e) {
    console.log('Error, e');
  }
};

export const getAuthData = async () => {
  try {
    const value = await AsyncStorage.getItem('auth');
    return value;
  } catch (e) {
    console.log('Error, e');
  }
};

export const removeAuthData = async () => {
  try {
    await AsyncStorage.removeItem('auth');
  } catch (e) {
    console.log('Error, e');
  }
};
