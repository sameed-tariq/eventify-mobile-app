import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LogBox,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "./Firebase";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthContext";

export default function DetailsScreen({ navigation, route }) {
  const currentUser = auth.currentUser;
  const [joined, setJoined] = useState(false);
  const [joinedUsersDetails, setJoinedUsersDetails] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const user = useContext(AuthContext);

  // const getUser = async () => {
  //   if (!currentUser) {
  //     return;
  //   }

  //   const docSnap = await getDocs(
  //     query(collection(db, "users"), where("userId", "==", currentUser.uid))
  //   );

  //   setCurrentUserDetails(docSnap.docs[0].data());
  // };
  //   const props = navigation.getParam("props");
  const {
    item: {
      name,
      headerImage,
      price,
      duration,
      description,
      galleryImages,
      venue,
      eventId,
      joinedUsers,
    },
  } = route.params;

  const checkJoined = async () => {
    const docSnap = await getDocs(
      query(collection(db, "users"), where("userId", "==", currentUser.uid))
    );

    if (docSnap.docs[0].data().joinedEvents.includes(eventId)) {
      setJoined(true);
    }
    setFriends(docSnap.docs[0].data().friends);
  };

  useEffect(() => {
    checkJoined();
    getJoinedUsersDetails();
  }, []);

  const getJoinedUsersDetails = async () => {
    // joinedUsers.map(async (user) => {
    //   const docSnap = await getDocs(
    //     query(collection(db, "users"), where("userId", "==", user))
    //   );
    //   setJoinedUsersDetails((prev) => [...prev, docSnap.docs[0].data()]);
    // });

    joinedUsers.forEach(async (user) => {
      const docSnap = await getDocs(
        query(collection(db, "users"), where("userId", "==", user))
      );
      setJoinedUsersDetails((prev) => [...prev, docSnap.docs[0].data()]);
    });
  };

  const handleJoin = async () => {
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(userRef, where("userId", "==", user.uid))
    );

    const docId = querySnapshot.docs[0].id;
    const userDocRef = doc(db, "users", docId);

    const eventRef = collection(db, "events");
    const eventSnapShot = await getDocs(
      query(eventRef, where("eventId", "==", eventId))
    );

    const eventDocId = eventSnapShot.docs[0].id;
    const eventDocRef = doc(db, "events", eventDocId);

    await updateDoc(userDocRef, {
      joinedEvents: arrayUnion(eventId),
    });

    await updateDoc(eventDocRef, {
      joinedUsers: arrayUnion(user.uid),
    });

    await checkJoined();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={{ uri: headerImage }}
      >
        {/* <StatusBar backgroundColor="transparent" translucent /> */}
        <View style={styles.header}>
          {/* <Icon
            name="arrow-back"
            color="white"
            size={35}
            onPress={() => navigation.goBack()}
          /> */}
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.titleText}>
            <Icon name="location-sharp" size={20} />
            {venue}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            nestedScrollEnabled
            scrollEnabled={!showFriends}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
            style={styles.detailsContainer}
          >
            <LinearGradient
              colors={["rgba(191, 90, 224,1)", "rgba(168, 17, 218,1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            ></LinearGradient>
            <View style={styles.detailsView}>
              <View style={styles.priceTag}>
                <Icon name="pricetag-outline" color="white" size={35} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.priceTagText}>{price}</Text>
                </View>
              </View>
              <View style={styles.priceTag}>
                <Icon name="time-outline" color="white" size={35} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.priceTagText}>{duration}</Text>
                </View>
              </View>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.galleryView}>
              <Text style={styles.descriptionTitle}>Gallery</Text>
              <View style={styles.imagesContainer}>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Image
                    style={{
                      height: 130,
                      width: 180,
                      borderRadius: 20,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    source={{ uri: galleryImages[0] }}
                  />
                  <Image
                    style={{
                      height: 130,
                      width: 200,
                      borderRadius: 20,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    source={{ uri: galleryImages[1] }}
                  />
                </View>
                <View>
                  <Image
                    style={{
                      height: 280,
                      width: 180,
                      borderRadius: 20,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                    source={{ uri: galleryImages[2] }}
                  />
                </View>
              </View>
            </View>

            {!joined ? (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{ alignItems: "center", marginBottom: 50 }}
                  onPress={handleJoin}
                >
                  <View style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join</Text>
                    <Icon name="add" color="white" size={35} />
                  </View>
                </TouchableOpacity>
                <Text style={{ marginTop: 25, color: "white" }}>
                  *terms and conditions apply.
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{ alignItems: "center", marginBottom: 50 }}
                >
                  <View style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Joined</Text>
                    {/* <Icon name="add" color="white" size={35} /> */}
                  </View>
                </TouchableOpacity>
                {/* <Text style={{ marginTop: 25, color: "white" }}>
                  *terms and conditions apply.
                </Text> */}
              </View>
            )}
            <View style={{ alignItems: "center", top: "5%" }}>
              <TouchableOpacity
                onPress={() => {
                  setShowFriends(true);
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>
                  See Who's Going
                </Text>
              </TouchableOpacity>
            </View>
            {showFriends ? (
              <View style={styles.seeFriendsContainer}>
                <TouchableOpacity
                  style={{ left: "90%" }}
                  onPress={() => {
                    setShowFriends(false);
                  }}
                >
                  <Text style={{ fontSize: 25, color: "white" }}>X</Text>
                </TouchableOpacity>

                <FlatList
                  vertical
                  showsHorizontalScrollIndicator={false}
                  data={joinedUsersDetails}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          height: 50,
                          alignItems: "center",
                          left: "25%",
                        }}
                      >
                        <Image
                          style={{
                            height: "90%",
                            width: "15%",
                            borderRadius: 100,
                            marginRight: "2%",
                          }}
                          source={
                            item.profilePhoto
                              ? { uri: item.profilePhoto }
                              : require("../assets/userProfile.jpg")
                          }
                        />
                        <Text style={{ color: "white", fontSize: 17 }}>
                          {item.displayName}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  seeFriendsContainer: {
    flex: 1,
    position: "absolute",
    width: "70%",
    height: "50%",
    backgroundColor: "rgba(191, 90, 224,1)",
    top: "40%",
    marginHorizontal: "15%",
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 30,
    color: "white",
  },
  joinButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8A1AAF",
    position: "absolute",
    width: 260,
    height: 74,
    borderRadius: 25,
  },
  galleryView: {
    marginTop: 20,
    paddingHorizontal: 20,
    // marginBottom: 50,
    paddingBottom: 100,
  },
  imagesContainer: {
    height: 300,
    flexDirection: "row",
    paddingRight: 10,
  },
  container: {
    flex: 1,
  },
  backgroundImage: { flex: 1, height: "100%", justifyContent: "center" },
  header: {
    backgroundColor: "rgba(240,240,240,0.8)",
    borderRadius: 30,
    position: "absolute",
    top: "12%",
    width: "95%",
    height: "7%",
    marginHorizontal: "2.5%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 40,
    flexDirection: "row",
    // justifyContent: "space-between",
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: "#BF5AE0",

    position: "absolute",
    height: "80%",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
    paddingTop: 0,
    // paddingBottom: 50,
    // marginBottom: 50,
    // overflow: "hidden",
  },
  detailsView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.38,
    shadowRadius: 3,
    elevation: 10,
  },
  titleText: {
    // alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    // marginTop: 50,
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  addToCart: {
    width: 130,
    height: 50,
    backgroundColor: "#252e2f",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  priceTag: {
    flexDirection: "row",
    backgroundColor: "#A811DA",
    width: 166,
    height: 74,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  priceTagText: {
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionView: { paddingHorizontal: 20, marginTop: 60 },
  descriptionTitle: { fontSize: 20, fontWeight: "bold", color: "white" },
  description: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
  },
  quantityText: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
  bottomButtonsView: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  setQuantityView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
