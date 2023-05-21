import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FullScreenView = ({ uri }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Icon
        name="left"
        color="white"
        size={35}
        style={{ position: "absolute", left: "4%%", top: "6%" }}
        onPress={() => navigation.goBack()}
      />

      <Image source={uri} />
    </SafeAreaView>
  );
};

export default FullScreenView;
