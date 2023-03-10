import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../Components/Header";

export default function TaskScreen({ route, navigation }) {
  const [task, setTask] = React.useState(route.params.task);
  return (
    <SafeAreaView>
      <Header></Header>
      <Text>Task Screen</Text>
      <Text>{task.name}</Text>
      <Text>{task.description}</Text>
      <Text>{task.startDate}</Text>
      <Text>{task.endDate}</Text>
    </SafeAreaView>
  );
}
