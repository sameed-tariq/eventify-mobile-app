import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const RoundedImage = ( image ) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make the borderRadius half of the width/height to achieve a circular shape
    overflow: "hidden", // Clip the image within the rounded boundaries
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Adjust the image size to cover the container
  },
});
