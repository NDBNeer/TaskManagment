import { AsyncStorage, Alert } from "react-native";

export async function logout() {
  try {
    await AsyncStorage.removeItem("currentUser");
  } catch (error) {
    return false;
  }
}

export async function logIn(user) {
  try {
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    await AsyncStorage.setItem("projects", "[]");
  } catch (error) {
    return false;
  }
}

export async function isUserLoggedIn() {
  try {
    const value = await AsyncStorage.getItem("currentUser");
    if (value !== null) {
      return true;
    }
    return false;
  } catch (error) {
    // Error retrieving data
  }
}
