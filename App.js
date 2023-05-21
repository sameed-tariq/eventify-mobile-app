import { StatusBar } from "expo-status-bar";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import AuthNavigator from "./app/navigation/AuthContext";
import SignOutStack from "./app/navigation/SignOutStack";
import Home from "./app/screens/Home";
import GetStarted from "./app/screens/GetStarted";
import AuthScreen from "./app/screens/AuthScreen";
import SignUp from "./app/screens/SignUp";
import AddEvent from "./app/screens/AddEvent";
import DetailsScreen from "./app/screens/DetailScreen";
import BottomTabNavigator from "./app/navigation/BottomTabNavigator";

// const navigator = createStackNavigator(
//   {
//     Home: Home,
//     GetS: GetStarted,
//     Auth: AuthScreen,
//     SignUp: SignUp,
//   },

//   {
//     initialRouteName: "GetS",
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false,
//     },
//   }
// );
// export default createAppContainer(navigator);

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />

      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
}
