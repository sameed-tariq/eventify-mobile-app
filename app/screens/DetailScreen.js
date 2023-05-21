import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import Icon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "./Firebase";
import {
  doc,
  deleteDoc,
  collection,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// import COLORS from "../constants/colors";

export default function DetailsScreen({ navigation, route }) {
  const currentUser = auth.currentUser;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  //   const props = navigation.getParam("props");
  const {
    item: { name, headerImage, price, duration, description, galleryImages },
  } = route.params;

  //   const addToCart = () => {

  //     setDoc(doc(collection(db, "cart")), {
  //       userId: auth.currentUser.uid,
  //       medicineId: medicine.id,
  //       quantity: quantity,
  //     })
  //       .then(() => {
  //         alert("Added to cart");
  //       })
  //       .catch((error) => {
  //         alert(error.message);
  //       });
  //   };

  //   const toggleFavorites = () => {
  //     if (!auth.currentUser) {
  //       navigation.navigate("Auth");
  //       return;
  //     }
  //     if (isFavorite) {
  //       getDocs(
  //         query(
  //           collection(db, "userFavorites"),
  //           where(
  //             "userId",
  //             "==",
  //             currentUser.uid,
  //             "and",
  //             "medicineId",
  //             "==",
  //             medicine.id
  //           )
  //         )
  //       ).then((docSnap) => {
  //         deleteDoc(doc(db, "userFavorites", docSnap.doc.data().id));
  //       });
  //     } else {
  //       setDoc(doc(collection(db, "userFavorites")), {
  //         userId: currentUser.uid,
  //         medicineId: medicine.id,
  //       })
  //         .then(() => {
  //           console.log("data saved");
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });
  //     }
  //     setIsFavorite(isFavorite ? false : true);
  //   };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        resizeMode="cover"
        source={{ uri: headerImage }}
      >
        {/* <StatusBar backgroundColor="transparent" translucent /> */}
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            color="white"
            size={35}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.titleText}>{name}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
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
                  <Text
                    style={{ fontSize: 15, color: "white", marginLeft: 10 }}
                  >
                    Price
                  </Text>
                </View>
              </View>
              <View style={styles.priceTag}>
                <Icon name="time-outline" color="white" size={35} />
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.priceTagText}>{duration} hours</Text>
                  <Text
                    style={{ fontSize: 15, color: "white", marginLeft: 10 }}
                  >
                    Duration
                  </Text>
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

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ alignItems: "center", marginBottom: 50 }}
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
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
    position: "absolute",
    top: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 40,
    flexDirection: "column",
    justifyContent: "space-between",
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
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
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
