import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEvent from "../screens/AddEvent";
import FullScreenView from "../screens/FullScreenView";
const Stack = createNativeStackNavigator();

export default function AddEventStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddEvent" component={AddEvent} />
      <Stack.Screen name="FullScreenView" component={FullScreenView} />
    </Stack.Navigator>
  );
}
