import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import global from "../global";
import { updateTask } from "../Controller/TaskController";
import { getProjects } from "../Controller/ProjectController";

export default function TaskScreen({ route, navigation }) {
  const [task, setTask] = React.useState(route.params.task);
  const [project, setProject] = React.useState(route.params.project);
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const [statusValue, setStatusValue] = React.useState(task.status);
  const [assosiateTaskValue, setAssosiateTaskValue] = React.useState(
    task.assosiateTask
  );
  const [assigneeValue, setAssigneeValue] = React.useState(task.assignee);

  const [assignees, setAssignees] = React.useState([
    { label: "None", value: null },
  ]);

  const [assosiateTasks, setAssosiateTasks] = React.useState([
    { label: "None", value: null },
  ]);

  console.log(task.status);

  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function fetchAssignee() {
    var newAssignees = [];
    global.users.map((user) => {
      newAssignees.push({ label: user.name, value: user.id });
    });
    setAssignees(newAssignees);
  }

  function fetchAssosiateTask() {
    var newAssosiateTasks = [];
    project.tasks.map((task) => {
      // checking if the task is not the current task
      if (task.id !== route.params.task.id) {
        newAssosiateTasks.push({ label: task.name, value: task.id });
      }
    });
    setAssosiateTasks(newAssosiateTasks);
  }

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
      setProject(project);
      const task = project.tasks.find(
        (task) => task.id === route.params.task.id
      );
      setTask(task);
    }

    getProjectsFunc();
    fetchAssignee();
    fetchAssosiateTask();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-col bg-gray-200 rounded-md m-3">
          <View
            className="bg-indigo-900  p-2 flex flex-row items-center justify-evenly"
            style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
          >
            <Button
              title="Back"
              onPress={() => navigation.navigate("Project", { project })}
            />
            <Text className="text-base font-bold mb-2 text-white ">
              {task.name}
            </Text>
          </View>
          <View className="flex flex-col justify-start p-2">
            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Task Description:</Text>
              <TextInput
                className="w-40 px-2 py-3 border-b-2 border-gray-500"
                placeholder="Task Description"
                placeholderTextColor="#444"
                value={task.description}
              />
            </View>

            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Start Date:</Text>
              <Text>{task.startDate}</Text>
              <View>
                {datePicker && (
                  <DateTimePicker
                    value={date}
                    mode={"date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onDateSelected}
                    className="flex flex-start items-center justify-start w-40 h-40"
                  />
                )}
              </View>
              {!datePicker && (
                <View classname="m-10 w-40">
                  <Button
                    title="Show Date Picker"
                    color="green"
                    onPress={showDatePicker}
                  />
                </View>
              )}
            </View>
            <View className="flex flex-row justify-start items-center mb-1 ">
              <Text className="text-sm mr-2">End Date:</Text>
              <Text>{task.endDate}</Text>
            </View>
            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Status:</Text>
              <View className="m-1 w-40 z-50">
                <Picker
                  selectedValue={statusValue}
                  onValueChange={setStatusValue}
                >
                  <Picker.Item label="ToDo" value="todo" />
                  <Picker.Item label="In Progress" value="inProgress" />
                  <Picker.Item label="Completed" value="completed" />
                </Picker>
              </View>
            </View>

            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Assignee:</Text>
              <View className="m-1 w-40 z-50">
                <Picker
                  selectedValue={assigneeValue}
                  onValueChange={setAssigneeValue}
                >
                  {assignees.map((assignee) => (
                    <Picker.Item
                      label={assignee.label}
                      value={assignee.value}
                      key={assignee.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Associated Tasks:</Text>
              <View className="m-1 w-40 z-50">
                <Picker
                  selectedValue={assosiateTaskValue}
                  onValueChange={setAssosiateTaskValue}
                >
                  {assosiateTasks.map((assosiateTask) => (
                    <Picker.Item
                      label={assosiateTask.label}
                      value={assosiateTask.value}
                      key={assosiateTask.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Working Hours:</Text>
              <TextInput
                className="w-40 px-2 py-3 border-b-2 border-gray-500"
                placeholder="Working Hours"
                placeholderTextColor="#444"
                value={task.totalHoursWorked.toString()}
                // keyboardType="numeric"
                onChangeText={(text) => {
                  setTask({ ...task, totalHoursWorked: text });
                }}
              />
            </View>
            <View className="flex flex-row justify-start items-center mb-1">
              <Text className="text-sm mr-2">Hourly Rate:</Text>
              <TextInput
                className="w-40 px-2 py-3 border-b-2 border-gray-500"
                placeholder="Hourly Rate"
                placeholderTextColor="#444"
                value={task.hourlyRate.toString()}
                // keyboardType="numeric"
                onChangeText={(text) => {
                  setTask({ ...task, hourlyRate: text });
                }}
              />
            </View>

            <View>
              <View className="flex flex-row justify-center items-center mt-10 mb-1">
                <Button
                  title="Save"
                  color="green"
                  onPress={async () => {
                    var new_task = {
                      id: task.id,
                      name: task.name,
                      description: task.description,
                      startDate: task.startDate,
                      endDate: task.endDate,
                      status: statusValue,
                      assignee: assigneeValue,
                      assosiateTask: assosiateTaskValue,
                      totalHoursWorked: task.totalHoursWorked,
                      hourlyRate: task.hourlyRate,
                    };
                    updateTask(new_task, project.id, task.id);
                    // get project
                    var localProjects = await getProjects();
                    var localProject = localProjects.find(
                      (p) => p.id === project.id
                    );
                    setTask(new_task);
                    setProject(localProject);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
