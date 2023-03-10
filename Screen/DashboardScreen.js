import * as React from "react";
import { View, Text, Button, SafeAreaView, TextInput } from "react-native";
import { logout } from "../Controller/UserController";
import { addProjects, getProjects } from "../Controller/ProjectController";

export default function Dashboard({ navigation }) {
  const [projects, setProjects] = React.useState(
    getProjects() ? getProjects() : []
  );

  const [projectName, setProjectName] = React.useState("");

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

  async function addProject(projectName) {
    if (projectName === "") {
      alert("Please enter a name");
      return;
    }

    let new_projects = projects;
    new_projects.push({ name: projectName });
    const isAbleToAddProject = await addProjects(new_projects);
    if (isAbleToAddProject) {
      setProjects(getProjects());
    }
  }

  return (
    <SafeAreaView>
      <View className="flex flex-row justify-center items-center">
        <Text className="text-xl">Welcome to the dashboard</Text>
        <Button title="Logout" onPress={() => logoutFunc()} />
      </View>

      <View className="flex flex-row justify-center items-center mt-6">
        <TextInput
          className="border-2 border-black"
          placeholder="Type to create project"
          value={projectName}
          onChangeText={(projectName) => setProjectName(projectName)}
        />

        <Button title="Create" onPress={() => addProject(projectName)} />
      </View>

      <View className="flex flex-col justify-center items-center mt-6">
        {/* {(projects.length > 0 || projects != null) ??
          projects.map((project) => {
            return (
              <View className="flex flex-row justify-center items-center">
                <Text className="text-xl">{project.name}</Text>
              </View>
            );
          })} */}
      </View>
    </SafeAreaView>
  );
}
