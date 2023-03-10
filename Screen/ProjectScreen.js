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
      description: "Please update the description",
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(
        new Date().getTime() + 14 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };
    new_tasks.push(task);
    setTasks(new_tasks);
    setTaskName("");
  }
  return (
    <SafeAreaView>
      <Header />

      <View className="flex flex-row justify-center items-center mt-6">
        <TextInput
          className="border-2 border-black"
          placeholder="Type to create task"
          value={taskName}
          onChangeText={(taskName) => setTaskName(taskName)}
        />
        <Button title="Create" onPress={() => addTask(taskName)} />
      </View>

      <View className="flex flex-col justify-center items-center mt-6">
        <Text className="text-xl">{project.name}</Text>
        <Text className="text-xl">{project.description}</Text>
        <Text className="text-xl">{project.startDate}</Text>
        <Text className="text-xl">{project.endDate}</Text>
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
