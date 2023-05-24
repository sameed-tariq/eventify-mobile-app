import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function PostCard(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [raised, setRaised] = useState(0);
  const [donors, setDonors] = useState(0);
  const {
    item: { name, headerImage, venue },
  } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          item: props.item,
        })
      }
      style={{ flex: 1 }}
    >
      <View style={styles.userCard}>
        <Image
          source={{ uri: headerImage }}
          style={{ width: "100%", height: "100%", borderRadius: 25 }}
        ></Image>

        <View
          style={{
            position: "absolute",
            zIndex: 10000,
            height: 60,
            width: 340,
            alignSelf: "center",
            marginTop: 173,
            backgroundColor: "rgba(240,240,240,0.6)",
            borderRadius: 30,

            paddingVertical: 18,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.57,
            shadowRadius: 15.19,

            elevation: 23,
            top: -40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: "5%",
            }}
          >
            <TouchableOpacity style={{}}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  textTransform: "uppercase",
                  color: "black",
                  marginTop: 0,
                  // width: "50%",
                  // flexWrap: "wrap",
                }}
              >
                {name}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
                // width: "5%",
              }}
            >
              <Icon name="map-marker" size={18} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "500",
                  color: "black",
                  marginHorizontal: "5%",
                }}
              >
                {venue}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgb(69,95,210)",
    alignSelf: "center",
  },
  userCard: {
    width: 360,
    height: 200,
    backgroundColor: "black",
    marginHorizontal: 10,
    borderRadius: 35,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.38,
    shadowRadius: 6.95,
    elevation: 18,
  },
});
