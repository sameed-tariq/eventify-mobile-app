import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GetStarted({ navigation }) {
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

      <Text style={{ top: 480, fontSize: 20, color: "#fff" }}>
        DISCOVER WHATS
      </Text>
      <Text style={{ top: 480, fontSize: 36, color: "#fff" }}>HAPPENING</Text>

      <Text
        onPress={() => navigation.push("Login")}
        style={styles.signinbutton}
      >
        Already have an account? Sign In
      </Text>

      <LinearGradient
        colors={["rgba(161, 255, 206, 0.6)", "rgba(250, 255, 209, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    width: 336,
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
