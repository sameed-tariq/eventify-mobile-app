import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";

const SearchBox = ({ placeholder, onChange, value, style, iconSize }) => {
  return (
    <View
      style={{ ...style, flex: 1, flexDirection: "row", alignItems: "center" }}
    >
      <Icon
        name="search"
        size={iconSize}
        color="white"
        style={{ marginLeft: "5%" }}
      />
      <TextInput
        style={{ marginLeft: "3%", color: "white", fontSize: 18 }}
        placeholder={placeholder}
        value={value}
        placeholderTextColor="white"
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBox;
