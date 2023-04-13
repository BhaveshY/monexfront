import AsyncStorage from '@react-native-async-storage/async-storage';

const getStore = async (key) => {
    const value = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(value) : null;
}

const removeStore = async (key) => {
    const value = await AsyncStorage.removeItem(key)
    return value
}

const setStore = async (key, value) => {
    if (typeof value == 'object') value = JSON.stringify(value)
    console.log(value)
    await AsyncStorage.setItem(key, value)
}

export { getStore, setStore,removeStore }