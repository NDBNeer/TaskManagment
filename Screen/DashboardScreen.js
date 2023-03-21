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
import { addProjects, getProjects } from "../Controller/ProjectController";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { isUserLoggedIn, getCurrentUser } from "../Controller/UserController";
import { StackActions } from "@react-navigation/native";

export default function Dashboard({ navigation }) {
  const [projects, setProjects] = React.useState([]);

  const [projectName, setProjectName] = React.useState("");
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);

  React.useEffect(() => {
    async function getProjectsFunc() {
      var localProjects = await getProjects();
      if (localProjects === undefined) {
        return;
      }
      if (localProjects === null) {
        localProjects = [];
      }
      const currentUser = await getCurrentUser();
      if (currentUser === undefined) {
        return;
      } else {
        associatedProjects = [];
        localProjects.forEach((project) => {
          project.tasks.forEach((task) => {
            if (task.assignee == currentUser?.id) {
              associatedProjects.push(project);
            }
          });
        });

        if (currentUser?.type == "user") {
          localProjects = associatedProjects;
        } else {
          setIsUserAdmin(true);
        }
      }
      // console.log(currentUser);
      setProjects(localProjects);
    }
    return () => {
      getProjectsFunc();
    };
  }, [projects]);
  function isItComplete(project) {
    const length = project.tasks.length;
    const tasks = project.tasks;
    var count = 0;
    for (i = 0; i < tasks.length; i++) {
      if (tasks[i].status == "completed") {
        count++;
      } else {
      }
    }
    //  console.log(count)
    if (count == length && length > 0) {
      return "Completed";
    } else {
      return "In Progress";
    }
  }
  React.useEffect(() => {
    async function checkLogin() {
      const isLoggedIn = await isUserLoggedIn();
      if (isLoggedIn) {
        console.log("Logged in");
      } else {
        navigation.navigate("LoginScreen");
      }
    }
    async function getProjectsFunc() {
      var localProjects = await getProjects();
      if (localProjects === undefined) {
        return;
      }
      if (localProjects === null) {
        localProjects = [];
      }
      const currentUser = await getCurrentUser();
      if (currentUser === undefined) {
        return;
      } else {
        associatedProjects = [];
        localProjects.forEach((project) => {
          project.tasks.forEach((task) => {
            if (task.assignee == currentUser?.id) {
              associatedProjects.push(project);
            }
          });
        });

        if (currentUser?.type == "user") {
          localProjects = associatedProjects;
        } else {
          setIsUserAdmin(true);
        }
      }
      setProjects(localProjects);
    }

    getProjectsFunc();
    checkLogin();
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
    await addProjects(new_projects);
    setProjectName("");
  }

  async function deleteProject(id) {
    let new_projects = projects;
    new_projects = new_projects.filter((project) => project.id !== id);
    const isAbleToDeleteProject = await addProjects(new_projects);
    setProjects(new_projects);
  }

  return (
    <SafeAreaView className="">
      <Header navigation={navigation} />
      <View>
        {isUserAdmin ? (
          <View className="bg-gray-200 rounded-md m-3">
            <View
              className="bg-indigo-900  p-2"
              style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            >
              <Text className="text-lg font-bold mb-2 text-white">
                New Project
              </Text>
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
        ) : (
          <View className="bg-gray-200 rounded-md m-3"></View>
        )}
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
                            <Text className="text-sm">
                              {isItComplete(project)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row justify-center items-center ml-2">
                          <TouchableOpacity
                            className="ml-2"
                            onPress={() =>
                              navigation.dispatch(
                                StackActions.replace("Project", { project })
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              size={20}
                              style={{ color: "indigo" }}
                            />
                          </TouchableOpacity>
                          {isUserAdmin ? (
                            <TouchableOpacity
                              className="ml-2"
                              onPress={() => deleteProject(project.id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                size={20}
                                style={{ color: "red" }}
                              />
                            </TouchableOpacity>
                          ) : (
                            <View className="bg-gray-200 rounded-md m-3"></View>
                          )}
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
