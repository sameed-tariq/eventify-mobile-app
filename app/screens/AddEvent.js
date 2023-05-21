import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "./Firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { add } from "react-native-reanimated";
import { storage } from "./Firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const event = {
  name: "",
  price: "",
  duration: "",
  venue: "",
  date: "",
  headerImage: "",
  galleryImage: [],
  userId: "",
};

function AddEvent() {
  const currentUser = auth.currentUser;
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isGalleryUploaded, setIsGalleryUploaded] = useState(false);
  const [isHeaderUploaded, setIsHeaderUploaded] = useState(false);
  const navigation = useNavigation();

  const addEvent = async () => {
    await setDoc(doc(collection(db, "events")), {
      name,
      venue,
      date,
      price,
      duration,
      headerImage,
      galleryImages,
      userId: currentUser.uid,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 3,
      // allowsMultipleSelection,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let imageArray = [];
      setImages(() => {
        result.assets.map((image) => {
          imageArray = [...imageArray, image.uri];
        });
        return imageArray;
      });
      await uploadImage();
    }
  };
  const pickHeaderImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // allowsMultipleSelection,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setHeaderImage(result.assets[0].uri);
      await uploadHeaderImage();
    }
  };

  const uploadImageToStorage = async (image) => {
    let dUrl = "";
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = await uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDownloadUrl(downloadURL);
        });
      }
    );
  };

  const uploadImage = async () => {
    let tempimg = [];
    images?.map((image) => {
      const dUrl = uploadImageToStorage(image);
      tempimg = [...tempimg, downloadUrl];
      setGalleryImages(tempimg);
    });
    setIsGalleryUploaded(true);
  };

  const uploadHeaderImage = async () => {
    const dUrl = await uploadImageToStorage(headerImage);
    setHeaderImage(downloadUrl);
    setIsHeaderUploaded(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(191, 90, 224,1)", "rgba(168, 17, 218,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.textContainer}>
          <Text style={styles.text}>Add Event</Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "60%",
            }}
          >
            <Button
              title="Select Gallery Images (upto 3)"
              onPress={pickImage}
              color={"white"}
            />

            <View style={styles.imagesContainer}>
              {images && (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={images}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: 50,
                        height: 50,
                        margin: 3,
                        borderRadius: 10,
                      }}
                    />
                  )}
                />
              )}
            </View>
            <Button
              title="Pick header image"
              color={"white"}
              onPress={pickHeaderImage}
            />
            <View style={styles.imagesContainer}>
              {headerImage && (
                <Image
                  source={{ uri: headerImage }}
                  style={{
                    width: 50,
                    height: 50,
                    margin: 2,
                    borderRadius: 10,
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.eventForm}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={price}
              onChangeText={(text) => setPrice(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Duration"
              value={duration}
              onChangeText={(text) => setDuration(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Venue"
              value={venue}
              onChangeText={(text) => setVenue(text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Date"
              value={date}
              onChangeText={(text) => setDate(text)}
              style={styles.input}
            />
            {/* <TextInput
              placeholder="Header Image"
              value={headerImage}
              onChangeText={(text) => setHeaderImage(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Gallery Image"
              value={galleryImage1}
              onChangeText={(text) => setGalleryImage1(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Gallery Image"
              value={galleryImage2}
              onChangeText={(text) => setGalleryImage2(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Gallery Image"
              value={galleryImage3}
              onChangeText={(text) => setGalleryImage3(text)}
              style={styles.input}
            /> */}
          </View>
          <LinearGradient
            colors={["rgba(103, 58, 183, 0.9)", "rgba(81, 45, 168, 0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <TouchableOpacity onPress={addEvent}>
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </LinearGradient>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
    marginTop: "7%",
    fontSize: 36,
  },
  eventForm: {
    top: "20%",
    position: "absolute",
    width: "80%",
  },
  imagesContainer: {
    width: "100%",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#D9D9D9",
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
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
});
