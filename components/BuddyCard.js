import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { auth, db } from "../app/screens/Firebase";
import { updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";
const user = {
  displayName: "Salman Shahid",
  profilePhoto: require("../app/assets/userProfile.jpg"),
  userId: "fjkdfoejrfojslkjdfs",
};

const BuddyCard = ({ onPressHandler, item }) => {
  return (
    <View style={styles.container}>
      <Icon
        onPress={onPressHandler}
        name="pluscircle"
        size={25}
        color="white"
        style={{ top: "10%", left: "40%" }}
      />
      <Image
        source={
          item.profilePhoto
            ? { uri: item.profilePhoto }
            : require("../app/assets/userProfile.jpg")
        }
        style={{ height: 100, width: 100, borderRadius: 100 }}
      />
      <Text style={{ color: "white" }}>{item.displayName}</Text>
    </View>
  );
};

export default BuddyCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: 115,
    // backgroundColor: "black",
  },
});
