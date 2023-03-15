import * as React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { logout } from "../Controller/UserController";
import { addProjects, getProjects } from "../Controller/ProjectController";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

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
    <SafeAreaView className="">
      <Header navigation={navigation} />
      <View className="bg-gray-200 rounded-md m-3">
        <View
          className="bg-indigo-900  p-2"
          style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
        >
          <Text className="text-lg font-bold mb-2 text-white">New Project</Text>
        </View>
        <View className="flex flex-row justify-center items-center p-4">
          <View className="w-4/5">
            <TextInput
              className="w-full px-2 py-3 border-b-2 border-gray-500"
              placeholder="Create New Project"
              placeholderTextColor="#444"
              value={projectName}
              onChangeText={(projectName) => setProjectName(projectName)}
            />
          </View>
          <View className="w-1/5 bg-indigo-900 rounded-md py-3 ml-2">
            <Text
              className="text-white text-center"
              onPress={() => addProject(projectName)}
            >
              Create
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text className="text-lg font-bold mb-2 text-indigo-900 m-3">
          Projects
        </Text>
      </View>
      <ScrollView className="-mt-3">
        <View className="flex flex-col justify-center items-center m-3">
          {projects.map((project, index) => {
            return (
              <View
                key={index}
                className="flex flex-row w-full justify-evenly items-center bg-gray-200 rounded-md m-3 p-3"
              >
                <View className="flex flex-col justify-center items-start ">
                  <View className="flex flex-row justify-start items-center mb-2">
                    <Text className="text-lg font-bold">{project.name}</Text>
                  </View>
                  <View className="h-0.5 w-full bg-indigo-900"></View>
                  <View className="flex flex-row justify-start items-center mb-1 mt-2">
                    <Text className="text-sm mr-2">Start Date:</Text>
                    <Text className="text-sm">{project.startDate}</Text>
                  </View>
                  <View className="flex flex-row justify-start items-center">
                    <Text className="text-sm mr-2">End Date:</Text>
                    <Text className="text-sm">{project.endDate}</Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center items-end text-sm ml-36">
                  <View className="flex flex-row justify-end items-center">
                    <TouchableOpacity
                      className="ml-2"
                      onPress={() =>
                        navigation.navigate("Project", { project })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        size={20}
                        style={{ color: "indigo" }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-6">
                      <FontAwesomeIcon
                        icon={faTrash}
                        size={20}
                        style={{ color: "red" }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
