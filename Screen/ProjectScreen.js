import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
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
import DatePicker from "react-native-datepicker";
import { getCurrentUser } from "../Controller/UserController";
import { StackActions } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

export default function ProjectScreen({ route, navigation }) {
  const [project, setProject] = React.useState(route.params.project);
  const [tasks, setTasks] = React.useState(project.tasks);
  const [taskName, setTaskName] = React.useState("");
  const [isUserAdmin, setIsUserAdmin] = React.useState(false);
  const [totalBudget, setTotalBudget] = React.useState(0);
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
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
  handleStartDateChange = (date) => {
    setProject({ ...project, startDate: date });
    setStartDate(date);
  };

  handleEndDateChange = (date) => {
    setProject({ ...project, endDate: date });

    setEndDate(date);
  };
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
      <View style={tw`bg-indigo-900 flex-row items-center p-4`}>
        <View>
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
        </View>
        <View className="ml-3">
          <Text style={tw`text-lg font-bold text-white`}>Project</Text>
        </View>
      </View>
      <View>
        {isUserAdmin ? (
          <View className="bg-gray-200 rounded-md m-3">
            <View
              className="bg-indigo-900  p-2 flex flex-row"
              style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            >
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
              {/* <Button
                title="Back"
                onPress={() =>
                  navigation.dispatch(StackActions.replace("Dashboard"))
                }
              /> */}
              <Text className="text-lg font-bold mb-2 text-white">
                New Task
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className="flex flex-col bg-gray-200 rounded-md m-4 p-3 -mt-4">
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
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>Start Date:</Text>
            <DatePicker
              style={styles.datePicker}
              date={startDate}
              mode="date"
              placeholder="Select Start Date"
              format="YYYY-MM-DD"
              minDate={new Date()}
              editable={isUserAdmin}
              // maxDate={endDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleStartDateChange}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.label}>End Date:</Text>
            <DatePicker
              style={styles.datePicker}
              date={endDate}
              editable={isUserAdmin}
              mode="date"
              placeholder="Select Start Date"
              format="YYYY-MM-DD"
              minDate={startDate}
              // maxDate={endDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleEndDateChange}
            />
          </View>
          {/* <View className="flex flex-row justify-start items-center mb-1">
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
          </View> */}
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2">Total Estimated Budget:</Text>
            <Text className="text-base mr-2 mt-2">{totalBudget}</Text>
          </View>

          <View className="w-1/5 bg-indigo-900 rounded-md py-3 mt-2 mb-1">
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

      <View className="p-2 -mt-4">
        <Text className="text-xl ">Task List:</Text>
        <View className="h-0.5 w-full bg-indigo-900 "></View>
      </View>
      <ScrollView style={styles.scrollView}  contentContainerStyle={styles.contentContainer}>
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
                              // check if the task with this id has associated projects

                              if (task.assosiateTask != 0) {
                                const assosiatedTaskObject =
                                  project.tasks.filter(
                                    (t) => t.id === task.assosiateTask
                                  );
                                console.log(assosiatedTaskObject);
                                if (
                                  assosiatedTaskObject.length > 0 &&
                                  assosiatedTaskObject[0].status == "completed"
                                ) {
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
                                    alert(
                                      "This task has incomplete associated tasks"
                                    );
                                    return;
                                  }
                                }
                              } else {
                                navigation.dispatch(
                                  StackActions.replace("Task", {
                                    task,
                                    project,
                                  })
                                );
                              }
                            }}
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
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginRight: 10,
  },
  datePicker: {
    width: 200,
  },
   scrollView: {
    height: '70%',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  }
});
