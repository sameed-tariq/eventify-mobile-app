import { NavigationContainer } from "@react-navigation/native";
import { auth, db } from "./app/screens/Firebase";
import {
  setDoc,
  doc,
  updateDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";

import AuthNavigator from "./app/navigation/AuthContext";

import * as Location from "expo-location";
import { useState, useEffect } from "react";

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
  const [currentUser, setCurrentUser] = useState(null);
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [auth.currentUser]);

  const updateLocation = async (location) => {
    const userRef = collection(db, "users");
    try {
      const querySnapshot = await getDocs(
        query(userRef, where("userId", "==", auth.currentUser.uid))
      );
      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);
      await updateDoc(userDocRef, {
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } catch (err) {
      console.log(err.message);
    }

    console.log(location.coords);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // setLocation(location);
    await updateLocation(location);
    console.log(location);
  };

  useEffect(() => {
    // console.log("user log");
    getLocation();
    setInterval(getLocation, 600000);
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  return (
    <NavigationContainer>
      {/* <Text style={{ marginTop: 100 }}>{text}</Text> */}
      <AuthNavigator />
      {/* <View style={{ marginTop: "20%", backgroundColor: "red", flex: 1 }}>
        <BuddyCard
          onPressHandler={() => {
            console.log("hello");
          }}
        />
      </View> */}

      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
}
