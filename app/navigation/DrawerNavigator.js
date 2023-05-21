import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import AddEvent from "../screens/AddEvent";
import SignInStack from "./SignInStack";

// import { TouchableOpacity, View } from "react-native";
// import Logout from "../components/Logout";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  //   const handleLogout = props.handleLogout;
  //   const CustomDrawerContent = (props) => {
  //     const navigation = useNavigation();

  //     return (
  //       <DrawerContentScrollView {...props}>
  //         <Text
  //           variant="displaySmall"
  //           style={{
  //             color: "rgb(65,70,174)",
  //             fontWeight: "bold",
  //             marginVertical: 20,
  //             alignSelf: "center",
  //           }}
  //         >
  //           FanFund.
  //         </Text>
  //         <DrawerItemList {...props} />
  //         <Button
  //           icon="logout"
  //           // icon="logout"
  //           textColor="black"
  //           onPress={() => {
  //             handleLogout();
  //           }}
  //           style={{
  //             alignSelf: "center",
  //             marginTop: 20,
  //           }}
  //         >
  //           Logout
  //         </Button>
  //       </DrawerContentScrollView>
  //     );
  //   };
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={SignInStack} />
      <Drawer.Screen name="AddEvent" component={AddEvent} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
