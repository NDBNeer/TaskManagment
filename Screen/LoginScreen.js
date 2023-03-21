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
import { StackActions } from "@react-navigation/native";

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
    <SafeAreaView style={styles.container}>
      <View className="flex flex-col items-center justify-center">
        <View className="flex flex-row justify-center items-center ">
          <Text className="text-4xl" style={styles.title}>
            Project Management
          </Text>
        </View>

        <View>
          <View
            style={styles.inputContainer}
            className="flex flex-row justify-center"
          >
            <Text style={styles.label} className="text-xl">
              Email:{" "}
            </Text>
            <TextInput
              className="border-2 border-black"
              placeholder="Enter your email"
              value={email}
              style={styles.input}
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View
            style={styles.inputContainer}
            className="flex flex-row justify-center"
          >
            <Text style={styles.label} className="text-xl">
              Password:{" "}
            </Text>
            <TextInput
              className="border-2 border-black"
              placeholder="Enter your password"
              textContentType="password"
              value={password}
              style={styles.input}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>

        <Button style={styles.button} title="Login" onPress={checkLogin} />
      </View>
    </SafeAreaView>
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
