import React, { useState, useEffect, createContext } from "react";
import { auth } from "../screens/Firebase";
import SignInStack from "./SignInStack";
import SignOutStack from "./SignOutStack";
import DrawerNavigator from "./DrawerNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

export const AuthContext = createContext(null);
export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(result) {
    // console.log("USER: ");
    // console.log(result);
    setUser(result);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const authSubscriber = auth.onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <BottomTabNavigator />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
