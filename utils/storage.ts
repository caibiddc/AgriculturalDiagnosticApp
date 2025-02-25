import AsyncStorage from '@react-native-async-storage/async-storage';

// 获取数据
export const localGet = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Failed to fetch data from storage', e);
    return null;
  }
};

// 设置数据
export const localSet = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save data to storage', e);
  }
};

// 删除数据
export const localRemove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove data from storage', e);
  }
};
