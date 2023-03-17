import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import Header from "../Components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import global from "../global";
import { updateTask } from "../Controller/TaskController";
import { getProjects } from "../Controller/ProjectController";

export default function TaskScreen({ route, navigation }) {
  const [task, setTask] = React.useState(route.params.task);
  const [project, setProject] = React.useState(route.params.project);
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  // dropdowns
  const [assignOpen, setassignOpen] = React.useState(false);
  const [assignValue, setassignValue] = React.useState(null);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [statusValue, setStatusValue] = React.useState(task.status);
  const [assosiateTaskOpen, setAssosiateTaskOpen] = React.useState(false);
  const [assosiateTaskValue, setAssosiateTaskValue] = React.useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const { control } = useForm();

  const [assignees, setAssignees] = React.useState([]);

  const [status, setStatus] = React.useState([
    { label: "ToDo", value: "todo" },
    { label: "In Progress", value: "inProgress" },
    { label: "Completed", value: "completed" },
  ]);

  const [assosiateTasks, setAssosiateTasks] = React.useState([]);

  const onStatusOpen = React.useCallback(() => {
    setassignOpen(false);
    setAssosiateTaskOpen(false);
  }, []);

  const onAssigneeOpen = React.useCallback(() => {
    setStatusOpen(false);
    setAssosiateTaskOpen(false);
  }, []);

  const onAssosiateTaskOpen = React.useCallback(() => {
    setStatusOpen(false);
    setassignOpen(false);
  }, []);

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
              <DropDownPicker
                key="status"
                className="bg-white border-2 border-gray-300 z-50"
                open={statusOpen}
                value={statusValue}
                items={status}
                setOpen={setStatusOpen}
                setValue={setStatusValue}
                setItems={setStatus}
                placeholder="Select Status"
                activityIndicatorColor="#5188E3"
                onOpen={onStatusOpen}
                // onChangeValue={onChange}
                // zIndex={6000}
                // zIndexInverse={1000}
              />
            </View>
          </View>

          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-sm mr-2">Status:</Text>

            <View className="m-1 w-40 z-50">
              <DropDownPicker
                key="assignee"
                className="bg-white border-2 border-gray-300 z-50"
                open={assignOpen}
                value={assignValue}
                items={assignees}
                setOpen={setassignOpen}
                setValue={setassignValue}
                setItems={setAssignees}
                placeholder="Select assignee"
                activityIndicatorColor="#5188E3"
                onOpen={onAssigneeOpen}
                // onChangeValue={onChange}
                // zIndex={6000}
                // zIndexInverse={1000}
              />
            </View>
          </View>
          <View className="flex flex-row justify-start items-center mb-1">
            <Text className="text-sm mr-2">Assosiate Task:</Text>

            <View className="m-1 w-40 z-50">
              <DropDownPicker
                key="assignee"
                className="bg-white border-2 border-gray-300 z-50"
                open={assosiateTaskOpen}
                value={assosiateTaskValue}
                items={assosiateTasks}
                setOpen={setAssosiateTaskOpen}
                setValue={setAssosiateTaskValue}
                setItems={setAssosiateTasks}
                placeholder="Select Assosiate Task"
                activityIndicatorColor="#5188E3"
                onOpen={onAssosiateTaskOpen}
                // onChangeValue={onChange}
                // zIndex={6000}
                // zIndexInverse={1000}
              />
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
                    assignee: assignValue,
                    assosiateTask: assosiateTaskValue,
                    totalHoursWorked: task.totalHoursWorked,
                    hourlyRate: task.hourlyRate,
                  };
                  console.log(new_task);
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
    </SafeAreaView>
  );
}
