import * as React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { logout } from "../Controller/UserController";
import { addProjects, getProjects } from "../Controller/ProjectController";
import Header from "../Components/Header";

export default function Dashboard({ navigation }) {
  const [projects, setProjects] = React.useState([]);

  const [projectName, setProjectName] = React.useState("");

  React.useEffect(() => {
    async function getProjectsFunc() {
      const localProjects = await getProjects();
      if (localProjects === undefined) {
        return;
      }
      if (localProjects === null) {
        localProjects = [];
      }
      setProjects(localProjects);
    }
    getProjectsFunc();
  }, []);

  async function addProject(projectName) {
    if (projectName === "") {
      alert("Please enter a name");
      return;
    }

    let new_projects = projects;
    var project = {
      id: projects.length + 1,
      name: projectName,
      description: "Please update the description",
      tasks: [],
      // setting the start date to today in dd/mm/yyyy format
      startDate: new Date().toLocaleDateString(),
      // setting the end date to 14 day after the start date
      endDate: new Date(
        new Date().getTime() + 14 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };
    new_projects.push(project);
    const isAbleToAddProject = await addProjects(new_projects);
    setProjectName("");
  }

  return (
    <SafeAreaView>
      <Header />
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
        {projects.map((project, index) => {
          return (
            <View
              key={index}
              className="flex flex-row justify-center items-center"
            >
              <Text className="text-xl">{project.name}</Text>
              <Button
                title="View"
                onPress={() => navigation.navigate("Project", { project })}
              />
              <Button title="Delete" />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
