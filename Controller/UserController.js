import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logout() {
  try {
    await AsyncStorage.removeItem("currentUser").then((res) => {
      return true;
    });
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
