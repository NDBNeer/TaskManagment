import React from "react";
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
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../Controller/UserController";

export default function ProjectScreen({ route, navigation }) {
  const { project } = route.params;
  const [tasks, setTasks] = React.useState(project.tasks);
  const [taskName, setTaskName] = React.useState("");

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
      status: "To Do",
      assignee: "",
      totalHoursWorked: 0,
      hourlyRate: 0,
      // setting the start date to today in dd/mm/yyyy format
      startDate: new Date().toLocaleDateString(),
      endDate: project.endDate,
    };
    new_tasks.push(task);
    setTasks(new_tasks);
    setTaskName("");
  }
  return (
    <SafeAreaView>
      <View className="bg-gray-200 rounded-md m-3">
        <View
          className="bg-indigo-900  p-2"
          style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
        >
          <Text className="text-lg font-bold mb-2 text-white">New Task</Text>
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
            >
              {project.description}
            </TextInput>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2 ">Start Date:</Text>
            <TextInput className=" px-2 py-3 border-b-2 border-gray-300 text-base">
              {project.startDate}
            </TextInput>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-base mr-2 mt-2">End Date:</Text>
            <TextInput className=" px-2 py-3 border-b-2 border-gray-300 text-base">
              {project.endDate}
            </TextInput>
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
                            <Text className="text-sm">Todo</Text>
                          </View>
                        </View>
                      </View>
                      <View className="flex flex-col justify-center items-center ml-2">
                        <View className="flex flex-row justify-center items-center ml-2">
                          <TouchableOpacity
                            className="ml-2"
                            onPress={() =>
                              navigation.navigate("Task", { task })
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
