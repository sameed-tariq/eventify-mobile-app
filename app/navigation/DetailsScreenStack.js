import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import DetailsScreen from "../screens/DetailScreen";
import EventDetails from "../screens/EventDetails";
import FriendsDetail from "../screens/FriendsDetail";
const Stack = createNativeStackNavigator();

export default function SignInStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
