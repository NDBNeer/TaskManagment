import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBackward, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addTaskToLocal, deleteTask } from "../Controller/TaskController";
import { updateProject } from "../Controller/ProjectController";
import { getProjects } from "../Controller/ProjectController";
import { getCurrentUser } from "../Controller/UserController";
import { StackActions } from "@react-navigation/native";
import Header from "../Components/Header";

export default function ProjectScreen({ route, navigation }) {
  const [project, setProject] = React.useState(route.params.project);
  const [tasks, setTasks] = React.useState(project.tasks);
  const [taskName, setTaskName] = React.useState("");
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [totalBudget, setTotalBudget] = React.useState(0);

  React.useEffect(() => {
    async function getProjectsFunc() {
      const localProjects = await getProjects();
      if (localProjects === undefined) {
        return;
      }
      if (localProjects === null) {
        localProjects = [];
      }

      const project = localProjects.find(
        (project) => project.id === route.params.project.id
      );

      var totalCost = 0;
      project.tasks.forEach((task) => {
        taskCost = task.totalHoursWorked * task.hourlyRate;
        totalCost += taskCost;
      });

      setTotalBudget(totalCost);

      const currentUser = await getCurrentUser();
      if (currentUser?.type != "user") {
        setIsUserAdmin(true);
      }

      setProject(project);
      setTasks(project.tasks);
    }
    getProjectsFunc();
  }, []);

  function addTask() {
    if (taskName === "") {
      alert("Please enter a name");
      return;
    }
    let new_tasks = tasks;
    var task = {
      id: tasks.length + 1,
      name: taskName,
      description: "",
      status: "todo",
      assignee: "",
      assosiateTask: 0,
      totalHoursWorked: 0,
      hourlyRate: 0,
      // setting the start date to today in dd/mm/yyyy format
      startDate: new Date().toLocaleDateString(),
      endDate: project.endDate,
    };
    new_tasks.push(task);
    addTaskToLocal(task, project.id);

    setTasks(new_tasks);
    setTaskName("");
  }

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <View>
        {isUserAdmin ? (
          <View className="bg-gray-200 rounded-md m-3">
            <View
              className="bg-indigo-900  p-2 flex flex-row"
              style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            >
               <TouchableOpacity
                            className="ml-2"
                            onPress={() =>
                  navigation.dispatch(StackActions.replace("Dashboard"))
                }
                          >
                                <FontAwesomeIcon
                              icon={faBackward}
                              size={20}
                              style={{ color: "white" }}
                            />

                          </TouchableOpacity>

            
              <Text className="text-lg font-bold mb-2 text-white">
                New Task
              </Text>
            </View>
            <View className="flex flex-row justify-center items-center p-4">
              <View className="w-4/5">
                <TextInput
                  className="w-full px-2 py-3 border-b-2 border-gray-500"
                  placeholder="Create New Task"
                  placeholderTextColor="#444"
                  value={taskName}
                  onChangeText={(taskName) => setTaskName(taskName)}
                />
              </View>
              <View className="w-1/5 bg-indigo-900 rounded-md py-3 ml-2">
                <Text
                  className="text-white text-center"
                  onPress={() => addTask(taskName)}
                >
                  Create
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-gray-200 rounded-md m-3">
            <View
              className="bg-indigo-900  p-2 flex flex-row"
              style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            >
              <Button
                title="Back"
                onPress={() =>
                  navigation.dispatch(StackActions.replace("Dashboard"))
                }
              />
              <Text className="text-lg font-bold mb-2 text-white">
                New Task
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className="flex flex-col bg-gray-200 rounded-md m-4 p-3">
        <View className="flex flex-col justify-center items-start">
          <View className="flex flex-row justify-start items-center mb-2">
            <Text className="text-lg font-bold">{project.name}</Text>
          </View>
          <View className="h-0.5 w-full bg-indigo-900"></View>
          <View className="flex flex-row justify-start items-center mb-1">
            <TextInput
              className="w-full px-2 py-3 border-b-2 border-gray-300 text-base"
              placeholder="Create New Task"
              placeholderTextColor="#444"
              value={project.description}
              editable={isUserAdmin}
              onChangeText={(description) =>
                setProject({ ...project, description: description })
              }
            ></TextInput>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2 ">Start Date:</Text>
            <TextInput
              className=" px-2 py-3 border-b-2 border-gray-300 text-base"
              value={project.startDate}
              editable={isUserAdmin}
              onChangeText={(startDate) =>
                setProject({ ...project, startDate: startDate })
              }
            ></TextInput>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2">End Date:</Text>
            <TextInput
              className=" px-2 py-3 border-b-2 border-gray-300 text-base"
              value={project.endDate}
              editable={isUserAdmin}
              onChangeText={(endDate) =>
                setProject({ ...project, endDate: endDate })
              }
            ></TextInput>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2">Total Estimated Budget:</Text>
            <Text>{totalBudget}</Text>
          </View>

          <View className="w-1/5 bg-indigo-900 rounded-md py-3 ml-2">
            <Text
              className="text-white text-center"
              onPress={() => {
                const updatedProject = {
                  ...project,
                  description: project.description,
                  startDate: project.startDate,
                  endDate: project.endDate,
                };
                updateProject(updatedProject, project.id);
                setProject(updatedProject);
                setTasks(updatedProject.tasks);
              }}
            >
              Update
            </Text>
          </View>
        </View>
      </View>

      <View className="p-2">
        <Text className="text-xl ">Task List:</Text>
        <View className="h-0.5 w-full bg-indigo-900 "></View>
      </View>
      <ScrollView className="-mt-3">
        <View className="flex flex-col justify-center items-center m-3">
          {tasks.map((task, index) => {
            return (
              <View
                key={index}
                className="flex flex-row w-full justify-center items-center bg-gray-200 rounded-md m-3 p-3"
              >
                <View className="flex flex-row w-full justify-start items-start -ml-2">
                  <View className="flex flex-col w-full justify-start items-start -ml-4">
                    <View className="flex flex-col w-full items-start justify-center ml-4">
                      <Text className="text-lg font-bold">{task.name}</Text>
                      <View className="h-0.5 w-full bg-indigo-900"></View>
                    </View>

                    <View className="flex flex-row w-full">
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row">
                          <View className="flex flex-col items-center justify-center ml-2">
                            <Text className="text-sm mr-2">Start Date</Text>
                            <View className="h-0.5 w-20 bg-gray-400"></View>
                            <Text className="text-sm">{task.startDate}</Text>
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
                            <Text className="text-sm">{task.endDate}</Text>
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
                            <Text className="text-sm">{task.status}</Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row justify-center items-center ml-2">
                          <TouchableOpacity
                            className="ml-2"
                            onPress={() => {
                              alert(task.assosiateTask);
                              // check if the task with this id has associated projects
                              if (task.assosicateTask != 0) {
                                // before navigating
                                navigation.dispatch(
                                  StackActions.replace("Task", {
                                    task,
                                    project,
                                  })
                                );
                              } else {
                                if (isUserAdmin) {
                                  navigation.dispatch(
                                    StackActions.replace("Task", {
                                      task,
                                      project,
                                    })
                                  );
                                } else {
                                  // check the status of the associated task
                                  var assosiatedNewTask = tasks.find(
                                    (t) => t.id === task.assosicateTask
                                  );
                                  if (
                                    assosiatedNewTask.status === "Completed"
                                  ) {
                                    // navigation.navigate("Task", {
                                    //   task,
                                    //   project,
                                    // });

                                    navigation.dispatch(
                                      StackActions.replace("Task", {
                                        task,
                                        project,
                                      })
                                    );
                                  } else {
                                    alert(
                                      "You are not allowed to view this task, until the associated task is completed"
                                    );
                                  }
                                }
                              }
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              size={20}
                              style={{ color: "indigo" }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="ml-2"
                            onPress={async () => {
                              await deleteTask(project.id, task.id);
                              var localProjects = await getProjects();
                              var new_project = localProjects.find(
                                (p) => p.id === project.id
                              );
                              setProject(new_project);
                              setTasks(new_project.tasks);
                            }}
                          >
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
