import { StackActions } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { logout, logIn } from "../Controller/UserController";
import global from "../global";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function checkLogin() {
    let user = global.users.filter((user) => {
      return user.email === email && user.password === password;
    });

    if (user.length > 0) {
      try {
        const isNotAbleToLogIn = await logIn(user[0]);
        if (!isNotAbleToLogIn) {
          navigation.dispatch(StackActions.replace("Dashboard"));
        }
      } catch (error) {
        // Error saving data
        Alert.alert("Error while logging in");
      }
    } else {
      alert("Invalid email or password");
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView className="w-4/5 align-baseline justify-center">
        <View className="bg-gray-200 rounded-md m-3">
          <View
            className="bg-indigo-900  p-2"
            style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
          >
            <Text className="text-lg font-bold m-2 text-white text-center">
              Project Management
            </Text>
          </View>
          <View className="flex flex-col justify-center items-center p-4">
            <View className="w-full">
              <TextInput
                className="w-full px-2 py-3 border-b-2 border-gray-500"
                placeholder="Enter Email"
                placeholderTextColor="#444"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                className="w-full px-2 py-3 border-b-2 border-gray-500"
                placeholder="Enter Password"
                placeholderTextColor="#444"
                textContentType="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <View className="pl-7 pr-7 bg-indigo-900 rounded-md py-3 m-3">
              <Text
                className="text-white text-center text-lg font-bold"
                onPress={checkLogin}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
    width: "80%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
