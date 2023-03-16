import React from "react";
import { SafeAreaView, Text, View ,TextInput,TouchableOpacity,Button} from "react-native";
import Header from "../Components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import {useForm, Controller} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskScreen({ route, navigation }) {
  const [task, setTask] = React.useState(route.params.task);
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [assignOpen, setassignOpen] = React.useState(false);
  const [assignValue, setassignValue] = React.useState(null);
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

   function showDatePicker() {
    setDatePicker(true);
  };
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
  const [assignee, setAssignee] = React.useState([
    { label: "John", value: "nm1" },
    { label: "Sam", value: "nm2" },
    { label: "Kiya", value: "nm3" },
  ]);

  const [statusOpen, setStatusOpen] = React.useState(false);
  const [statusValue, setStatusValue] = React.useState(null);
  const [status, setStatus] = React.useState([
    { label: "ToDo", value: "todo" },
    { label: "In Progress", value: "inProgress" },
    { label: "Completed", value: "completed" },
  ]);
   const onStatusOpen = React.useCallback(() => {
    setassignOpen(false);
  }, []);
  const { control } = useForm();
   const onAssigneeOpen = React.useCallback(() => {
    setStatusOpen(false);
  }, []);
  return (
 <SafeAreaView>
      <View className="flex flex-col bg-gray-200 rounded-md m-3">
          <View className="bg-indigo-900  p-2" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
             <Text className="text-base font-bold mb-2 text-white " >{task.name}</Text>
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
                      mode={'date'}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      is24Hour={true}
                      onChange={onDateSelected}
                      className="flex flex-start items-center justify-start w-40 h-40"
                    />
                  )}
                </View>
                 {!datePicker && (
                <View classname="m-10 w-40">
                  <Button title="Show Date Picker" color="green" onPress={showDatePicker} />
                </View>
              )}
      
         </View>    
         <View className="flex flex-row justify-start items-center mb-1 ">
               <Text className="text-sm mr-2">End Date:</Text>
               <Text>{task.endDate}</Text>
         </View>   
         <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Status:</Text>
               <Text>{task.status}</Text>
                <Controller
        name="status"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View className="m-1 w-40">
            <DropDownPicker
              className="bg-white border-2 border-gray-300"
              open={statusOpen}
              value={statusValue} 
              items={status}
              setOpen={setStatusOpen}
              setValue={setStatusValue}
              setItems={setStatus}
              placeholder="Select Status"
              activityIndicatorColor="#5188E3"
              onOpen={onStatusOpen}
              onChangeValue={onChange}
               zIndex={1000}
              zIndexInverse={3000}
            />
          </View>
        )}
      />
         </View>   
       
         <View className="flex flex-row justify-start items-center mb-1 ">
               <Text className="text-sm mr-2">Assignee:</Text>
               {/* <Text>{task.assignee}</Text> */}
                <Controller
                  name="assignee"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View className="m-1 w-40" >
                      <DropDownPicker
                        className="bg-white border-2 border-gray-300"
                        open={assignOpen}
                        value={assignValue} 
                        items={assignee}
                        setOpen={setassignOpen}
                        setValue={setassignValue}
                        setItems={setAssignee}
                        placeholder="Select Assignee"
                        onOpen={onAssigneeOpen}
                        onChangeValue={onChange}
                        zIndex={3000}
                        zIndexInverse={1000}
                      />
                    </View>
                  )}
                />
         </View>    
          <View className="flex flex-row justify-start items-center mb-1 ">
               <Text className="text-sm mr-2">Associate Task:</Text>
               {/* <Text>{task.assignee}</Text> */}
                <Controller
                  name="assignee"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View className="m-1 w-40" >
                      <DropDownPicker
                        className="bg-white border-2 border-gray-300"
                        open={assignOpen}
                        value={assignValue} 
                        items={assignee}
                        setOpen={setassignOpen}
                        setValue={setassignValue}
                        setItems={setAssignee}
                        placeholder="Select Assignee"
                        onOpen={onAssigneeOpen}
                        onChangeValue={onChange}
                        zIndex={3000}
                        zIndexInverse={1000}
                      />
                    </View>
                  )}
                />
         </View>  
          <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Working Hours:</Text>
                <TextInput
                className="w-40 px-2 py-3 border-b-2 border-gray-500"
                placeholder="Working Hours"
                placeholderTextColor="#444"
                value={task.totalHoursWorked}
                />
         </View>   
         <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Hourly Rate:</Text>
                <TextInput
                className="w-40 px-2 py-3 border-b-2 border-gray-500"
                placeholder="Hourly Rate"
                placeholderTextColor="#444"
                value={task.hourlyRate}
                />
         </View>    
     </View></View>
   </SafeAreaView>
  );
}
