import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screen/LoginScreen";
import Dashboard from "./Screen/DashboardScreen";
import { isUserLoggedIn } from "./Controller/UserController";
import ProjectScreen from "./Screen/ProjectScreen";
import TaskScreen from "./Screen/TaskScreen";

const Stack = createNativeStackNavigator();

function App() {
  var initialRoute = "LoginScreen";
  if (isUserLoggedIn()) {
    initialRoute = "Dashboard";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          // options={{
          //   headerBackVisible: false,
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          // options={{
          //   headerBackVisible: false,
          //   headerShown: false,
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
