import AsyncStorageLib from '@react-native-async-storage/async-storage';

const set = async (key: string, obj: object) => {
  try {
    const json = JSON.stringify(obj);
    await AsyncStorageLib.setItem(key, json);
  } catch (error) {
    throw new Error(`Unable to set data to local storage: ${error}`);
  }
};

const get = async (key: string) => {
  try {
    const json = await AsyncStorageLib.getItem(key);
    return json !== null ? JSON.parse(json) : null;
  } catch (error) {
    throw new Error(`Unable to get data from local storage: ${error}`);
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorageLib.removeItem(key);
  } catch (error) {
    throw new Error(`Unable to remove data from local storage: ${error}`);
  }
};

export const localStorageService = {
  set,
  get,
  remove,
};
