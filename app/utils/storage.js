// src/utils/storage.js - FRONTEND
import AsyncStorage from "@react-native-async-storage/async-storage";

// User data storage keys
const USER_KEY = "user_data";
const TOKEN_KEY = "auth_token";
const EXPIRY_KEY = "auth_expiry";

// Save user data to AsyncStorage
export const saveUserData = async (userData) => {
  try {
    const dataToStore = {
      user: userData.user,
      token: userData.token,
      expiry: new Date().getTime() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
    };

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(dataToStore.user));
    await AsyncStorage.setItem(TOKEN_KEY, dataToStore.token);
    await AsyncStorage.setItem(EXPIRY_KEY, dataToStore.expiry.toString());

    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    return false;
  }
};

// Get user data from AsyncStorage
export const getUserData = async () => {
  try {
    const expiry = await AsyncStorage.getItem(EXPIRY_KEY);
    const currentTime = new Date().getTime();

    // Check if session is expired
    if (!expiry || parseInt(expiry) < currentTime) {
      await clearUserData();
      return null;
    }

    const userJson = await AsyncStorage.getItem(USER_KEY);
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (userJson && token) {
      return {
        user: JSON.parse(userJson),
        token: token,
      };
    }

    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Clear user data from AsyncStorage
export const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY, EXPIRY_KEY]);
    return true;
  } catch (error) {
    console.error("Error clearing user data:", error);
    return false;
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const userData = await getUserData();
  return userData !== null;
};

// Get auth token for API requests
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
