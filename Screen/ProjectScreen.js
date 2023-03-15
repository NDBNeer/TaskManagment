import React from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import Header from "../Components/Header";

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
      <Header />
<View className="bg-gray-200 rounded-md m-3">
          <View className="bg-indigo-900  p-2" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
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
                <Text className="text-white text-center" onPress={() => addTask(taskName)}>Create</Text>
              </View>
         </View>
      </View>
      <View className="flex flex-col justify-center items-center mt-6">
        <Text className="text-xl">{project.name}</Text>
        <TextInput className="text-xl">{project.description}</TextInput>
        <TextInput className="text-xl">{project.startDate}</TextInput>
        <TextInput className="text-xl">{project.endDate}</TextInput>
      </View>

      <View className="flex flex-col justify-center items-center mt-6">
        {tasks.map((task, index) => {
          return (
            <View
              key={index}
              className="flex flex-row justify-center items-center"
            >
              <Text className="text-xl">{task.name}</Text>
              <Button
                title="View"
                onPress={() => navigation.navigate("Task", { task })}
              />

              <Button title="Delete" />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
