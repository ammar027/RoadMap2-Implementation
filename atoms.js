import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage } from 'jotai/utils';

// Wrapper for AsyncStorage with Jotai
const asyncStorage = {
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : undefined; // Handle null or empty value
    } catch (error) {
      console.error(`Error parsing JSON for key "${key}":`, error);
      return undefined; // Return a safe default
    }
  },
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving JSON for key "${key}":`, error);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}":`, error);
    }
  },
};



// Persistent counter atom
export const counterAtom = atomWithStorage('counter', 0, asyncStorage);

// Persistent random user atom
export const randomUserAtom = atomWithStorage('randomUser', null, asyncStorage);

