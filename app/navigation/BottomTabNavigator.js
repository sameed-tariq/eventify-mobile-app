import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";

import SignInStack from "./SignInStack";
import UserProfile from "../screens/UserProfile";
import AddEvent from "../screens/AddEvent";
import Home from "../screens/Home";
import DetailsScreen from "../screens/DetailScreen";
import AddEventStack from "./AddEventStack";
import MapScreen from "../screens/MapScreen";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#BF5AE0",
          height: "13.5%",
          borderRadius: 30,
          // borderTopLeftRadius: 50,
          // borderTopRightRadius: 24,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          position: "absolute",

          overflow: "hidden",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgb(180,180,180)",
        // tabBarActiveBackgroundColor: "rgb(220,220,220)",

        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={SignInStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: "map",
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={30} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: "search",

          tabBarIcon: ({ color }) => (
            <Feather name="search" size={30} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="AddEvent"
        component={AddEvent}
        options={{
          // tabBarStyle: {
          //   display: "none",
          // },
          tabBarLabel: "AddEvent",
          tabBarIcon: ({ color }) => (
            <Feather name="plus-circle" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarStyle: {
            display: "none",
          },
          tabBarLabel: "profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
