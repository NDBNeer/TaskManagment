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
      <View className="p-3">
        <Text className="text-xl ">Project List:</Text>
        <View className="h-0.5 w-full bg-indigo-900 "></View>
      </View>
      <ScrollView className="-mt-3">
        <View className="flex flex-col justify-center items-center m-3">
          {projects.map((project, index) => {
            return (
              <View
                key={index}
                className="flex flex-row w-full justify-center items-center bg-gray-200 rounded-md m-3 p-3"
              >
                <View className="flex flex-row w-full justify-start items-start -ml-2">
                  <View className="flex flex-col w-full justify-start items-start -ml-4">
                    <View className="flex flex-col w-full items-start justify-center ml-4">
                      <Text className="text-lg font-bold">{project.name}</Text>
                      <View className="h-0.5 w-full bg-indigo-900"></View>
                    </View>

                    <View className="flex flex-row w-full">
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row">
                          <View className="flex flex-col items-center justify-center ml-2">
                            <Text className="text-sm mr-2">Start Date</Text>
                            <View className="h-0.5 w-20 bg-gray-400"></View>
                            <Text className="text-sm">{project.startDate}</Text>
                          </View>
                          <View className="flex flex-col items-center justify-center">
                            <View className="h-6 w-0.5 bg-indigo-900 ml-2"></View>
                          </View>
                        </View>
                      </View>

                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row">
                          <View className="flex flex-col items-center justify-center">
                            <Text className="text-sm mr-2">End Date</Text>
                            <View className="h-0.5 w-20 bg-gray-400"></View>
                            <Text className="text-sm">{project.endDate}</Text>
                          </View>
                          <View className="flex flex-col items-center justify-center">
                            <View className="h-6 w-0.5 bg-indigo-900 ml-2"></View>
                          </View>
                        </View>
                      </View>

                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row">
                          <View className="flex flex-col justify-center items-center">
                            <Text className="text-sm mr-2">Status</Text>
                            <View className="h-0.5 w-20 bg-gray-400"></View>
                            <Text className="text-sm">Todo</Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row justify-center items-center ml-2">
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
                          <TouchableOpacity className="ml-2">
                            <FontAwesomeIcon
                              icon={faTrash}
                              size={20}
                              style={{ color: "red" }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
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
