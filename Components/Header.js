import React from "react";
import { View, Text, Button } from "react-native";
import { logout } from "../Controller/UserController";

export default function Header() {
  async function logoutFunc() {
    try {
      const isNotAbleToLogout = await logout();
      if (!isNotAbleToLogout) {
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      alert("Error while logging out");
    }
  }
  return (
    <View className="flex flex-row justify-center items-center">
      <Text className="text-xl">Online Project Management</Text>
      <Button title="Logout" onPress={() => logoutFunc()} />
    </View>
  );
}
