import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { logout } from "../Controller/UserController";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

export default function Header({ navigation }) {
  async function logoutFunc() {
    await logout().then(() => {
      navigation.navigate("LoginScreen");
    });
  }
  return (
    <View style={tw`bg-indigo-900 flex-row justify-between items-center p-4`}>
      <View style={tw`flex-row items-center justify-start flex-1`}>
        <Text style={tw`text-lg font-bold text-white`}>Project Management</Text>
      </View>
      <View style={tw`flex-row items-center justify-end flex-1`}>
        <TouchableOpacity onPress={() => logoutFunc()}>
          <AntDesign name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}