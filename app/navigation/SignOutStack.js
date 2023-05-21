import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import SignUp from "../screens/SignUp";
import GetStarted from "../screens/GetStarted";
const Stack = createNativeStackNavigator();

export default function SignOutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={GetStarted} />
      <Stack.Screen name="Login" component={AuthScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
