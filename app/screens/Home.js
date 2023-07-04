import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { auth, db } from "../../firebase-utils";
import {
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import PostCard from "../../components/PostCard";
import SearchBox from "../../components/SearchBox";
import BuddyCard from "../../components/BuddyCard";

export default function Home({ navigation }) {
  const currentUser = auth.currentUser;
  const [currentUserDetails, setCurrentUserDetails] = useState("");
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);

  const getEvents = () => {
    getDocs(collection(db, "events")).then((eventSnap) => {
      let tempEvents = [];
      eventSnap.forEach((event) => {
        tempEvents.push({ ...event.data(), id: event.id });
      });
      setEvents(tempEvents);
    });
  };

  const onPressHandler = async (id) => {
    await addFriendInUserDocument(id);

    forceUpdate();
  };

  const forceUpdate = () => {
    setRender(!render);
  };

  const addFriendInUserDocument = async (id) => {
    try {
      if (!currentUser) {
        return;
      }

      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(userRef, where("userId", "==", currentUser.uid))
      );

      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);

      await updateDoc(userDocRef, {
        friends: arrayUnion(id),
      });
    } catch (error) {
      console.log("Error updating user details: ", error);
    }
  };

  const getUsers = () => {
    getDocs(collection(db, "users")).then((userSnap) => {
      let tempUsers = [];
      userSnap.forEach((user) => {
        tempUsers.push({ ...user.data(), id: user.id });
      });
      setUsers(tempUsers);
    });
  };

  const getCurrentUserName = async () => {
    if (!currentUser) {
      return;
    }

    const docSnap = await getDocs(
      query(collection(db, "users"), where("userId", "==", currentUser.uid))
    );

    setCurrentUserDetails(docSnap.docs[0].data());
  };

  useEffect(() => {
    getUsers();
    getCurrentUserName();
    getEvents();
  }, []);

  useEffect(() => {
    const newFilteredEvents = events?.filter((event) => {
      return event.venue
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });
    setFilteredEvents(newFilteredEvents);
  }, [events, searchField]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(191, 90, 224,1)", "rgba(168, 17, 218,1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text
          style={{
            marginLeft: "5%",
            marginTop: "25%",
            fontSize: 35,
            color: "#fff",
          }}
        >
          Discover the
        </Text>
        <Text style={{ marginLeft: "5%", fontSize: 35, color: "#fff" }}>
          foremost around you
        </Text>

        <SearchBox
          placeholder="Search Places"
          value={searchField}
          onChange={(text) => setSearchField(text)}
          style={styles.searchBox}
          iconSize={35}
          fontSize={18}
        />

        <View style={styles.cardContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredEvents}
            renderItem={({ item }) => <PostCard item={item} />}
          />
        </View>

        <View style={styles.buddyCardContainer}>
          <Text style={styles.buddyCardTitle}>Quick Add</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={users.filter(
              (user) => !currentUserDetails.friends?.includes(user.userId)
            )}
            renderItem={({ item }) => (
              <BuddyCard
                item={item}
                onPressHandler={() => onPressHandler(item.userId)}
              />
            )}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    position: "absolute",
    marginTop: "70%",
    height: 300,
    // width: "100%",
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
    width: "80%",
  },
  imagesContainer: {
    height: 160,
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
  searchBox: {
    backgroundColor: "#554759",
    position: "absolute",
    borderRadius: 10,
    marginTop: "50%",
    width: "90%",
    height: "6%",
    marginHorizontal: "5%",
  },
  buddyCardContainer: {
    position: "absolute",
    marginTop: "130%",
    height: 300,
  },
  buddyCardTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: 600,
    marginLeft: "5%",
    marginBottom: "5%",
  },
});
