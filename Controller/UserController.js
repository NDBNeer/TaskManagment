import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "expo-storage";

export async function logout() {
  try {
    await Storage.removeItem({ key: "currentUser" }).then((res) => {
      return true;
    });
  } catch (error) {
    return false;
  }
}

export async function logIn(user) {
  try {
    await Storage.setItem({
      key: "currentUser",
      value: JSON.stringify(user),
    });
    // await AsyncStorage.setItem("projects", "[]");
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function isUserLoggedIn() {
  try {
    const value = JSON.parse(await Storage.getItem({ key: "currentUser" }));
    if (value != null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
    // Error retrieving data
  }
}
