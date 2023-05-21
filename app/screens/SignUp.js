import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "../screens/Firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../firebase-utils";

import COLORS from "../constants/colors";

export default SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // navigation.push("Auth");
        const user = userCredentials.user;

        setDoc(doc(collection(db, "users")), {
          userId: auth.currentUser.uid,
          name: displayName,
          email: email,
        })
          .then(() => {
            navigation.push("Login");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/getstarted.jpg")}
    >
      <LinearGradient
        colors={["rgba(191, 90, 224,0.8)", "rgba(168, 17, 218,0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      />
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <LinearGradient
        colors={["rgba(103, 58, 183, 0.9)", "rgba(81, 45, 168, 0.9)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Text
        onPress={() => navigation.navigate("Login")}
        style={styles.signinbutton}
      >
        Already have an account? Sign In
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },

  inputContainer: {
    marginTop: "80%",
    width: "78%",
  },
  input: {
    backgroundColor: "#D9D9D9",
    height: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },

  background: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logo: {
    width: 262,
    height: 161,
    top: 146,
    position: "absolute",
  },
  button: {
    width: "78%",
    height: 67,
    borderRadius: 15,
    position: "absolute",
    bottom: 156,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
  },
  signinbutton: {
    fontSize: 20,
    fontWeight: 300,
    bottom: 32,
    position: "absolute",
    color: "#fff",
  },
});
