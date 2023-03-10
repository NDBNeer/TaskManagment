import { AsyncStorage, Alert } from "react-native";

export async function addProjects(projects) {
  try {
    Alert.alert(JSON.stringify(projects));
    await AsyncStorage.setItem("projects", JSON.stringify(projects));
    return true;
  } catch (error) {
    Alert.alert("Error while adding projects");
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
