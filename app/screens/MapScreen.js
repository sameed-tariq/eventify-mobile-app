import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { auth, db } from "./Firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
// import { RoundedImage } from "./RoundedImage";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyCjUCUynxWv_zP0LCkFl0-sKO7t6LKNRP4");

const MapScreen = () => {
  const currentUser = auth.currentUser;
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    // const docSnap = await getDocs(
    //   query(collection(db, "users"), where("userId", "==", currentUser.uid))
    // );

    // let tempFriends = docSnap.docs[0].data().friends;
    // console.log(tempFriends);
    // let array = [];
    // tempFriends.map(async (friend) => {
    //   const docSnap = await getDocs(
    //     query(collection(db, "users"), where("userId", "==", friend))
    //   );
    //   let array = [...array, docSnap.docs[0].data()];
    //   setFriends(array);
    //   console.log(friends);
    // });
    // setFriends(docSnap.docs[0].data().friends);
    const docSnap = await getDocs(
      query(collection(db, "users"), where("userId", "==", currentUser.uid))
    );

    let tempFriends = docSnap.docs[0].data().friends;
    console.log(tempFriends);
    let array = [];
    await Promise.all(
      tempFriends.map(async (friend) => {
        const docSnap = await getDocs(
          query(collection(db, "users"), where("userId", "==", friend))
        );
        // console.log(docSnap.docs[0].data());
        array.push(docSnap.docs[0].data());
      })
    );

    setFriends(array);
  };

  useEffect(() => {
    getFriends();
  }, []);

  const image = require("../assets/userProfile.jpg");

  const data = [
    {
      image: require("../assets/image.jpeg"),
      id: "1",
      latitude: "31.5218",
      longitude: "74.3485",
      name: "Jasim",
    },
    {
      image: require("../assets/image2.jpeg"),
      id: "2",
      latitude: "31.5025",
      longitude: "74.3325",
      name: "Salman",
    },
  ];

  return (
    <View>
      <MapView
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 31.5204,
          longitude: 74.3587,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {friends?.map((emoji, i) => (
          <Marker
            key={i}
            title={emoji.displayName}
            coordinate={{
              latitude: parseFloat(emoji.location.latitude),
              longitude: parseFloat(emoji.location.longitude),
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: emoji.profilePhoto } || image}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
