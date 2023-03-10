import { AsyncStorage, Alert } from "react-native";

export async function addProjects(projects) {
  try {
    await AsyncStorage.setItem("projects", JSON.stringify(projects));
  } catch (error) {
    return false;
  }
}

export async function getProjects() {
  try {
    const value = await AsyncStorage.getItem("projects");
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  } catch (error) {
    // Error retrieving data
  }
}
