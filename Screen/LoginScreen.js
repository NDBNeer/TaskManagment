import * as React from "react";
import {
 View,
 Text,
 Button,
 SafeAreaView,
 TextInput,
 Alert,
} from "react-native";
import { logout, logIn } from "../Controller/UserController";
import global from "../global";


export default function LoginScreen({ navigation }) {
 const [email, setEmail] = React.useState("");
 const [password, setPassword] = React.useState("");


 async function checkLogin() {
   let user = global.users.filter((user) => {
     return user.email === email && user.password === password;
   });


   if (user.length > 0) {
     try {
       const isNotAbleToLogIn = await logIn(user[0]);
       if (!isNotAbleToLogIn) {
         navigation.navigate("Dashboard");
       }
     } catch (error) {
       // Error saving data
       Alert.alert("Error while logging in");
     }
   } else {
     alert("Invalid email or password");
   }
 }
 return (
   <SafeAreaView>
     <View className="flex flex-col items-center justify-center">
       <View className="flex flex-row justify-center items-center ">
         <Text className="text-4xl">Project Management</Text>
       </View>


       <View>
         <View className="flex flex-row justify-center">
           <Text className="text-xl">Email: </Text>
           <TextInput
             className="border-2 border-black"
             placeholder="Enter your email"
             value={email}
             onChangeText={(email) => setEmail(email)}
           />
         </View>


         <View className="flex flex-row justify-center">
           <Text className="text-xl">Password: </Text>
           <TextInput
             className="border-2 border-black"
             placeholder="Enter your password"
             textContentType="password"
             value={password}
             onChangeText={(password) => setPassword(password)}
           />
         </View>
       </View>


       <Button title="Login" onPress={checkLogin} />
     </View>
   </SafeAreaView>
 );
}



