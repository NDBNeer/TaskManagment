import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../Components/Header";

export default function TaskScreen({ route, navigation }) {
  const [task, setTask] = React.useState(route.params.task);
  return (
 <SafeAreaView>
     <Header></Header>
      <View className="flex flex-col bg-gray-200 rounded-md m-3">
          <View className="bg-indigo-900  p-2" style={{borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
             <Text className="text-base font-bold mb-2 text-white " >{task.name}</Text>
           </View>
           <View className="flex flex-col justify-start p-2">
            
          
         <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Task Description:</Text>
               <Text>{task.description}</Text>
         </View>  
          <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Start Date:</Text>
               <Text>{task.startDate}</Text>
         </View>    
         <View className="flex flex-row justify-start items-center mb-1 ">
               <Text className="text-sm mr-2">End Date:</Text>
               <Text>{task.endDate}</Text>
         </View>   
         <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Status:</Text>
               <Text>{task.status}</Text>
         </View>   
         <View className="flex flex-row justify-start items-center mb-1 ">
               <Text className="text-sm mr-2">Assignee:</Text>
               <Text>{task.assignee}</Text>
         </View>    
          <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Working Hours:</Text>
               <Text>{task.totalHoursWorked}</Text>
         </View>   
         <View className="flex flex-row justify-start items-center mb-1">
               <Text className="text-sm mr-2">Hourly Rate:</Text>
               <Text>{task.hourlyRate}</Text>
         </View>    
     </View></View>
   </SafeAreaView>
  );
}
