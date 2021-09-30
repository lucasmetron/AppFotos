import AsyncStorage from '@react-native-community/async-storage';
import { clear } from 'react-native/Libraries/LogBox/Data/LogBoxData';


export const StorageService = {
    async get(key) {
        return JSON.parse(await AsyncStorage.getItem(key));
    },

    async set(key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    async clear() {
        return await AsyncStorage.clear();
    }
}

